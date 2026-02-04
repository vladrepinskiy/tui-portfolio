import { useInput } from "ink";
import React, { createContext, useState } from "react";
import { Hero } from "../components/Hero.jsx";
import { ENTRY_TEXT } from "../constants/copy.constants.ts";
import { AboutPage } from "../pages/AboutPage.jsx";

export const ROUTES = {
  home: "home",
  about: "about",
};

const HEADER_LINKS = [
  { name: "home", key: "0", route: ROUTES.home },
  { name: "about", key: "1", route: ROUTES.about },
];

const CONTROLS_ACTIONS = [{ key: "q", label: "Quit" }];

const ROUTE_PAGES = {
  [ROUTES.home]: () => <Hero entryText={ENTRY_TEXT} typingSpeed={35} />,
  [ROUTES.about]: () => <AboutPage />,
};

export const RouteContext = createContext(null);

/**
 * Router: provides route, links, actions, and page renderer via context; handles keyboard navigation.
 * @param {React.ReactNode} children
 * @param {string} [defaultRoute] - Initial route (default: ROUTES.home)
 */
export const Router = ({ children, defaultRoute = ROUTES.home }) => {
  const [route, setRoute] = useState(defaultRoute);

  useInput((input, key) => {
    const link = HEADER_LINKS.find((l) => l.key === input);
    if (link) {
      process.stdout.write("\x1b[2J\x1b[H");
      setRoute(link.route);
    }
  });

  const getPage = (r) => ROUTE_PAGES[r]?.() ?? null;

  return (
    <RouteContext.Provider
      value={{
        route,
        setRoute,
        links: HEADER_LINKS,
        actions: CONTROLS_ACTIONS,
        getPage,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};
