#!/usr/bin/env node
/**
 * node-pty on macOS uses a spawn-helper binary; npm can install it without
 * execute permission, which causes "posix_spawnp failed". This script makes
 * spawn-helper executable so the SSH TUI server works.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const nodePtyRoot = path.join(projectRoot, "node_modules", "node-pty");

if (!fs.existsSync(nodePtyRoot)) {
  process.exit(0);
}

const prebuildsDir = path.join(nodePtyRoot, "prebuilds");
if (!fs.existsSync(prebuildsDir)) {
  process.exit(0);
}

let fixed = 0;
for (const name of fs.readdirSync(prebuildsDir)) {
  const helperPath = path.join(prebuildsDir, name, "spawn-helper");
  if (!fs.existsSync(helperPath)) continue;
  try {
    const stat = fs.statSync(helperPath);
    if ((stat.mode & 0o111) === 0) {
      fs.chmodSync(helperPath, stat.mode | 0o111);
      console.log("fix-pty: made executable:", helperPath);
      fixed++;
    }
  } catch (err) {
    console.warn("fix-pty: could not chmod", helperPath, err.message);
  }
}

if (fixed > 0) {
  console.log("fix-pty: fixed", fixed, "spawn-helper(s).");
}
