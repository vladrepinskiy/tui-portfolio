import { styled } from "goober";
import { Box, Text } from "ink";
import React from "react";

export const ControlsBox = ({ children }) => {
  return (
    <ControlsBoxWrapper
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderStyle="round"
      borderColor="gray"
      paddingX={2}
      paddingY={1}
      marginTop={1}
    >
      <ControlsBoxText dimColor>{children}</ControlsBoxText>
    </ControlsBoxWrapper>
  );
};

const ControlsBoxWrapper = styled(Box)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1;
`;

const ControlsBoxText = styled(Text)`
  /* dimColor via prop */
`;
