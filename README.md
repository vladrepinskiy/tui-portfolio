# A TUI Portfolio

TUI portfolio built with [Ink](https://github.com/vadimdemedes/ink) (React for the terminal) + TypeScript.

## Run

```bash
npm install
npm run dev
```

Or `npm run build` then `npm start`. Needs a real terminal (TTY). **q** or **Esc** to quit.

## SSH server

You can serve the TUI over SSH so people connect and land in the app (no shell).

1. **Build** (so the TUI bundle exists): `npm run build`
2. **Start the server:** `npm run ssh:tui` — listens on port 2222 by default.
3. **Connect:** `ssh -p 2222 your-server` (use your SSH key; password auth is disabled).

Auth is **publickey only**. Each client needs an SSH key; the server accepts any valid publickey. Optional env vars (and defaults): `SSH_PORT=2222`, `SSH_HOST_KEY` (default `ssh/host_key`), `MAX_SESSIONS`, `MAX_SESSIONS_PER_IP`, `IDLE_TIMEOUT_MS`, `MAX_SESSION_MS`. The `postinstall` script fixes node-pty’s spawn-helper permissions on macOS so the PTY works after `npm install`.

## Structure

- **Entry:** `cli.tsx` → `App.tsx`
- **Layout:** Header bar (links + active route, WIP label) | main content | control bar (version, shortcuts)
- **Routing:** `context/route.provider.ts` — route state + keyboard nav (0 home, 1 about). `useRoute()` for current route/links/getPage.
- **Shortcuts:** `context/shortcuts.provider.ts` — global shortcuts (quit). `useShortcuts()` for shortcut list.
- **Components:** Hero (typed text + ASCII logo), Typed, RunningLine, HeaderBar, ControlsBox.
- **Pages:** `pages/AboutPage.tsx`; home uses Hero.
- **Constants:** `copy.constants.ts`, `ascii.constants.ts`.

## Stack

Ink, React, TypeScript, goober (CSS-in-JS). Build: esbuild.
