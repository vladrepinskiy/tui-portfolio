import { useInput } from "ink";
import React, { createContext, type ReactNode } from "react";

export type Shortcut = {
  key: string;
  label: string;
  handler: () => void;
};

export type ShortcutDisplay = {
  key: string;
  label: string;
};

const quit = () => process.exit(0);

const DEFAULT_SHORTCUTS: Shortcut[] = [
  { key: "q", label: "Quit", handler: quit },
];

export type ShortcutsContextValue = {
  shortcuts: ShortcutDisplay[];
};

export const ShortcutsContext = createContext<ShortcutsContextValue | null>(null);

type ShortcutsProviderProps = {
  children: ReactNode;
  shortcuts?: Shortcut[];
};


export const ShortcutsProvider = ({
  children,
  shortcuts = DEFAULT_SHORTCUTS,
}: ShortcutsProviderProps) => {
  useInput((input, key) => {
    const shortcut = shortcuts.find((s) => {
      if (key.escape) return s.key === "escape";
      return s.key === input;
    });
    if (shortcut) shortcut.handler();
  });

  const value: ShortcutsContextValue = {
    shortcuts: shortcuts.map(({ key, label }) => ({ key, label })),
  };

  return React.createElement(
    ShortcutsContext.Provider,
    { value },
    children
  );
};
