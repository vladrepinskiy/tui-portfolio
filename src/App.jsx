import { styled } from "goober";
import { Box, useInput } from "ink";
import React from "react";
import { ControlsBox } from "./components/ControlsBox.jsx";
import { Hero } from "./components/Hero.jsx";
import { ENTRY_TEXT } from "./constants/copy.constants.ts";

const App = () => {
  useInput((input, key) => {
    if (key.escape || input === "q") {
      process.exit(0);
    }
  });

  return (
    <AppRootBox flexDirection="column" padding={1}>
      <Hero entryText={ENTRY_TEXT} typingSpeed={35} />
      <ControlsBox>Press q or Esc to exit.</ControlsBox>
    </AppRootBox>
  );
};

export default App;

const AppRootBox = styled(Box)`
  flex-direction: column;
  padding: 1;
`;
