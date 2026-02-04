import { styled } from "goober";
import { Box, useStdout } from "ink";
import pkg from "../package.json" with { type: "json" };
import { ControlsBox } from "./components/ControlsBox";
import { HeaderBar } from "./components/HeaderBar";
import { Router } from "./context/route.provider";
import { ShortcutsProvider } from "./context/shortcuts.provider";
import { useRoute } from "./hooks/useRoute";

const AppContent = () => {
  const { route, links, getPage } = useRoute();
  const { stdout } = useStdout();
  const terminalRows = stdout?.rows ?? 24;

  return (
    <AppRootBox
      flexDirection="column"
      padding={1}
      height={terminalRows}
    >
      <HeaderBar links={links} activeRoute={route} />
      <MainContentArea
        flexGrow={1}
        flexDirection="column"
        minHeight={0}
      >
        {getPage(route)}
      </MainContentArea>
      <ControlsBox version={pkg.version} />
    </AppRootBox>
  );
};

const App = () => {
  return (
    <ShortcutsProvider>
      <Router>
        <AppContent />
      </Router>
    </ShortcutsProvider>
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
