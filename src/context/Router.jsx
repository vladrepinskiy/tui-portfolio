import { useInput } from "ink";
import React, { createContext, useState } from "react";

export const RouteContext = createContext(null);

/**
 * Router: provides current route via context and handles keyboard navigation.
 * @param {React.ReactNode} children
 * @param {{ name?: string, key: string, route: string }[]} links - Header links with key → route mapping
 * @param {string} defaultRoute - Initial route
 */
export const Router = ({ children, links, defaultRoute }) => {
  const [route, setRoute] = useState(defaultRoute);

  useInput((input, key) => {
    const link = links?.find((l) => l.key === input);
    if (link) {
      // Clear terminal so new page replaces previous output instead of appending below
      process.stdout.write("\x1b[2J\x1b[H");
      setRoute(link.route);
    }
  });

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
