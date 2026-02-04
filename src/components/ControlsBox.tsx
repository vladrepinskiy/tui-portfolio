import { styled } from "goober";
import { Box, Text } from "ink";
import { useShortcuts } from "../hooks/useShortcuts";

type ControlsBoxProps = {
  version: string;
};

const SIDE_WIDTH = 12;

export const ControlsBox = ({ version }: ControlsBoxProps) => {
  const { shortcuts } = useShortcuts();
  return (
    <ControlsBoxRow flexDirection="row" marginTop={1} paddingX={1}>
      <ControlsVersionBox width={SIDE_WIDTH} paddingLeft={2}>
        <ControlsVersionText dimColor>v{version}</ControlsVersionText>
      </ControlsVersionBox>
      <ControlsShortcutsBox
        flexGrow={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        {shortcuts.map((shortcut, i) => (
          <ControlsShortcutText key={shortcut.key ?? i} dimColor>
            {shortcut.key}
            {shortcut.label ? ` ${shortcut.label}` : ""}
          </ControlsShortcutText>
        ))}
      </ControlsShortcutsBox>
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
  /* same width as left side so shortcuts are truly centered */
`;

const ControlsVersionText = styled(Text)`
  /* dimColor via prop */
`;

const ControlsShortcutsBox = styled(Box)`
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2;
`;

const ControlsShortcutText = styled(Text)`
  /* dimColor via prop */
`;
