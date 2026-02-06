// src/ssh-server.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ssh2 from "ssh2";
import pty from "node-pty";

const { Server } = ssh2;
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(projectRoot, ".env") });

const HOST_KEY_PATH =
  process.env.SSH_HOST_KEY || path.join(projectRoot, "ssh", "host_key");
const PORT = Number(process.env.SSH_PORT || 2222);

// Basic abuse controls (good defaults for a public portfolio)
const MAX_SESSIONS = Number(process.env.MAX_SESSIONS || 30);
const MAX_SESSIONS_PER_IP = Number(process.env.MAX_SESSIONS_PER_IP || 3);
const IDLE_TIMEOUT_MS = Number(process.env.IDLE_TIMEOUT_MS || 120_000); // 2 min idle
const MAX_SESSION_MS = Number(process.env.MAX_SESSION_MS || 5 * 60_000); // 5 min max

let activeSessions = 0;
const activeByIp = new Map(); // ip -> count

function incIp(ip) {
  activeByIp.set(ip, (activeByIp.get(ip) || 0) + 1);
}
function decIp(ip) {
  const n = (activeByIp.get(ip) || 0) - 1;
  if (n <= 0) activeByIp.delete(ip);
  else activeByIp.set(ip, n);
}

function getClientIp(client) {
  const sock = client?._sock;
  return sock?.remoteAddress || "unknown";
}

const hostKey = fs.readFileSync(HOST_KEY_PATH);

const server = new Server({ hostKeys: [hostKey] }, (client) => {
  const ip = getClientIp(client);

  if (
    activeSessions >= MAX_SESSIONS ||
    (activeByIp.get(ip) || 0) >= MAX_SESSIONS_PER_IP
  ) {
    client.end();
    return;
  }

  client.on("error", () => {});

  client.on("authentication", (ctx) => {
    if (ctx.method === "publickey") return ctx.accept();
    return ctx.reject();
  });

  client.on("ready", () => {
    incIp(ip);
    activeSessions += 1;

    client.on("session", (accept, reject) => {
      const session = accept();

      let ptyInfo = null;

      session.on("pty", (acceptPty, _rejectPty, info) => {
        ptyInfo = info;
        acceptPty && acceptPty();
      });

      session.on("window-change", (_accept, _reject, info) => {
        if (childPty) {
          childPty.resize(info.cols, info.rows);
        }
      });

      let childPty = null;
      let idleTimer = null;
      let hardTimer = null;
      let stream = null;

      function bumpActivity() {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          try {
            stream?.write("\r\n[Disconnected: idle timeout]\r\n");
          } catch {}
          cleanup();
        }, IDLE_TIMEOUT_MS);
      }

      function cleanup() {
        try {
          if (idleTimer) clearTimeout(idleTimer);
        } catch {}
        try {
          if (hardTimer) clearTimeout(hardTimer);
        } catch {}
        try {
          childPty?.kill();
        } catch {}
        try {
          stream?.end();
        } catch {}
        try {
          client?.end();
        } catch {}
      }

      session.on("exec", (_accept, rejectExec) => {
        rejectExec && rejectExec();
      });

      session.on("shell", (acceptShell, rejectShell) => {
        if (!ptyInfo) {
          rejectShell && rejectShell();
          return;
        }

        stream = acceptShell();

        const cols = ptyInfo.cols || 80;
        const rows = ptyInfo.rows || 24;

        const tuiPath = path.join(projectRoot, "src", "tui.mjs");
        const nodeBin = process.execPath;
        const shellCmd = `exec ${JSON.stringify(nodeBin)} ${JSON.stringify(
          tuiPath
        )}`;
        const spawnEnv = {
          PATH: process.env.PATH || "/usr/local/bin:/usr/bin:/bin",
          HOME: process.env.HOME || "",
          USER: process.env.USER || "nobody",
          TERM: "xterm-256color",
          COLORTERM: "truecolor",
          FORCE_COLOR: "1",
          PWD: projectRoot,
        };

        try {
          childPty = pty.spawn("/bin/sh", ["-c", shellCmd], {
            name: "xterm-256color",
            cols,
            rows,
            cwd: projectRoot,
            env: spawnEnv,
          });
        } catch (err) {
          console.error("[ssh-server] node-pty spawn failed:", err.message);
          console.error(
            "[ssh-server] On macOS, node-pty needs spawn-helper to be executable. Run: npm install"
          );
          try {
            stream.write("\r\n[Server error: failed to start TUI]\r\n");
          } catch {}
          cleanup();
          return;
        }

        childPty.onExit(({ exitCode }) => {
          if (exitCode !== 0 && exitCode != null) {
            console.error(
              "[ssh-server] TUI process exited with code",
              exitCode
            );
          }
          try {
            stream.end();
          } catch {}
          cleanup();
        });

        hardTimer = setTimeout(() => {
          try {
            stream.write("\r\n[Disconnected: session time limit]\r\n");
          } catch {}
          cleanup();
        }, MAX_SESSION_MS);

        bumpActivity();

        childPty.onData((data) => {
          bumpActivity();
          try {
            stream.write(data);
          } catch {}
        });

        stream.on("data", (data) => {
          bumpActivity();
          try {
            childPty.write(data);
          } catch {}
        });

        stream.on("close", () => cleanup());
        stream.on("error", () => cleanup());
      });
    });

    client.on("end", () => {});
    client.on("close", () => {
      decIp(ip);
      activeSessions = Math.max(0, activeSessions - 1);
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SSH TUI server listening on port ${PORT}`);
  console.log(`Test: ssh -p ${PORT} localhost`);
});
