import { styled } from "goober";
import { Box, Text } from "ink";
import React from "react";

type ControlAction = {
  key: string;
  label?: string;
};

type ControlsBoxProps = {
  version: string;
  actions: ControlAction[];
};

const SIDE_WIDTH = 12;

export const ControlsBox = ({ version, actions }: ControlsBoxProps) => {
  return (
    <ControlsBoxRow flexDirection="row" marginTop={1} paddingX={1}>
      <ControlsVersionBox width={SIDE_WIDTH} paddingLeft={2}>
        <ControlsVersionText dimColor>v{version}</ControlsVersionText>
      </ControlsVersionBox>
      <ControlsActionsBox
        flexGrow={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {actions.map((action, i) => (
          <ControlsActionText key={action.key ?? i} dimColor>
            {action.key}
            {action.label ? ` ${action.label}` : ""}
          </ControlsActionText>
        ))}
      </ControlsActionsBox>
      <ControlsSpacer width={SIDE_WIDTH} />
    </ControlsBoxRow>
  );
};

const ControlsBoxRow = styled(Box)`
  flex-direction: row;
  margin-top: 1;
`;

const ControlsVersionBox = styled(Box)`
  /* version left-aligned with fixed width for symmetric center */
`;

const ControlsSpacer = styled(Box)`
  /* same width as left side so actions are truly centered */
`;

const ControlsVersionText = styled(Text)`
  /* dimColor via prop */
`;

const ControlsActionsBox = styled(Box)`
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2;
`;

const ControlsActionText = styled(Text)`
  /* dimColor via prop */
`;
