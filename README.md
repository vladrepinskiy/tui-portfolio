# A TUI Portfolio

TUI portfolio built with [Ink](https://github.com/vadimdemedes/ink) (React for the terminal) + TypeScript.

## Run

```bash
npm install
npm run dev
```

Or `npm run build` then `npm start`. Needs a real terminal (TTY). **q** or **Esc** to quit.

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
