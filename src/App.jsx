import { styled } from "goober";
import { Box, useInput, useStdout } from "ink";
import React from "react";
import pkg from "../package.json" with { type: "json" };
import { ControlsBox } from "./components/ControlsBox.jsx";
import { HeaderBar } from "./components/HeaderBar.jsx";
import { Router } from "./context/Router.jsx";
import { useRoute } from "./hooks/useRoute.js";

const AppContent = () => {
  const { route, links, actions, getPage } = useRoute();
  const { stdout } = useStdout();
  const terminalRows = stdout?.rows ?? 24;

  return (
    <AppRootBox
      flexDirection="column"
      padding={1}
      height={terminalRows}
    >
      <HeaderBar links={links} />
      <MainContentArea
        flexGrow={1}
        flexDirection="column"
        minHeight={0}
      >
        {getPage(route)}
      </MainContentArea>
      <ControlsBox version={pkg.version} actions={actions} />
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
    <Router>
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
