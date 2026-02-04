import { useInput } from "ink";
import React, { createContext, useState, type ReactNode } from "react";
import { Hero } from "../components/Hero";
import { ENTRY_TEXT } from "../constants/copy.constants";
import { AboutPage } from "../pages/AboutPage";

export const ROUTES = {
  home: "home",
  about: "about",
} as const;

const HEADER_LINKS = [
  { name: "home", key: "0", route: ROUTES.home },
  { name: "about", key: "1", route: ROUTES.about },
];

const ROUTE_PAGES: Record<string, () => React.ReactNode> = {
  [ROUTES.home]: () =>
    React.createElement(Hero, {
      entryText: ENTRY_TEXT,
    }),
  [ROUTES.about]: () => React.createElement(AboutPage, {}),
};

export const RouteContext = createContext<{
  route: string;
  setRoute: (route: string) => void;
  links: typeof HEADER_LINKS;
  getPage: (r: string) => React.ReactNode;
} | null>(null);

type RouteProviderProps = {
  children: ReactNode;
  defaultRoute?: string;
};

export const Router = ({
  children,
  defaultRoute = ROUTES.home,
}: RouteProviderProps) => {
  const [route, setRoute] = useState(defaultRoute);

  useInput((input, key) => {
    const link = HEADER_LINKS.find((l) => l.key === input);
    if (link && link.route !== route) {
      process.stdout.write("\x1b[2J\x1b[H");
      setRoute(link.route);
    }
  });

  const getPage = (r: string) => ROUTE_PAGES[r]?.() ?? null;

  return React.createElement(
    RouteContext.Provider,
    {
      value: {
        route,
        setRoute,
        links: HEADER_LINKS,
        getPage,
      },
    },
    children
  );
};
