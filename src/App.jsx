import { styled } from "goober";
import { Box, useInput, useStdout } from "ink";
import React from "react";
import pkg from "../package.json" with { type: "json" };
import { ControlsBox } from "./components/ControlsBox.jsx";
import { HeaderBar } from "./components/HeaderBar.jsx";
import { Hero } from "./components/Hero.jsx";
import { ENTRY_TEXT } from "./constants/copy.constants.ts";
import { Router } from "./context/Router.jsx";
import { useRoute } from "./hooks/useRoute.js";
import { AboutPage } from "./pages/AboutPage.jsx";

const ROUTES = {
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

const AppContent = () => {
  const { route } = useRoute();
  const { stdout } = useStdout();
  const Page = ROUTE_PAGES[route];
  const terminalRows = stdout?.rows ?? 24;

  return (
    <AppRootBox
      flexDirection="column"
      padding={1}
      height={terminalRows}
    >
      <HeaderBar links={HEADER_LINKS} />
      <MainContentArea
        flexGrow={1}
        flexDirection="column"
        minHeight={0}
      >
        {Page ? <Page /> : null}
      </MainContentArea>
      <ControlsBox version={pkg.version} actions={CONTROLS_ACTIONS} />
    </AppRootBox>
  );
};

const App = () => {
  useInput((input, key) => {
    if (key.escape || input === "q") {
      process.exit(0);
    }
  });

  return (
    <Router links={HEADER_LINKS} defaultRoute={ROUTES.home}>
      <AppContent />
    </Router>
  );
};

export default App;

const AppRootBox = styled(Box)`
  flex-direction: column;
  padding: 1;
`;

const MainContentArea = styled(Box)`
  flex-grow: 1;
  flex-direction: column;
  min-height: 0;
`;
