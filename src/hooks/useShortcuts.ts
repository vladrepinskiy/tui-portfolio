import { useContext } from "react";
import { ShortcutsContext } from "../context/shortcuts.provider";

export const useShortcuts = () => {
  const ctx = useContext(ShortcutsContext);

  if (!ctx) throw new Error("useShortcuts must be used within a ShortcutsProvider");

  return ctx;
};
