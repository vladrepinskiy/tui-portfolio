import { useContext } from "react";
import { RouteContext } from "../context/Router";

export const useRoute = () => {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used within a Router");
  return ctx;
};
