import { styled } from "goober";
import { Box, useInput } from "ink";
import React from "react";
import pkg from "../package.json" with { type: "json" };
import { ControlsBox } from "./components/ControlsBox.jsx";
import { HeaderBar } from "./components/HeaderBar.jsx";
import { Hero } from "./components/Hero.jsx";
import { ENTRY_TEXT } from "./constants/copy.constants.ts";

const HEADER_LINKS = [{ name: "about" }];

const CONTROLS_ACTIONS = [{ key: "q", label: "Quit" }];

const App = () => {
  useInput((input, key) => {
    if (key.escape || input === "q") {
      process.exit(0);
    }
  });

  return (
    <AppRootBox flexDirection="column" padding={1}>
      <HeaderBar links={HEADER_LINKS} />
      <Hero entryText={ENTRY_TEXT} typingSpeed={35} />
      <ControlsBox version={pkg.version} actions={CONTROLS_ACTIONS} />
    </AppRootBox>
  );
};

export default App;

const AppRootBox = styled(Box)`
  flex-direction: column;
  padding: 1;
`;
