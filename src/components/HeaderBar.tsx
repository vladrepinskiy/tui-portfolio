import { styled } from "goober";
import { Box, Text } from "ink";
import { RunningLine } from "./RunningLine";

type HeaderLink = {
  name: string;
  key: string;
  route: string;
};

type HeaderBarProps = {
  links: HeaderLink[];
  activeRoute?: string;
};

export const HeaderBar = ({ links, activeRoute }: HeaderBarProps) => {
  return (
    <HeaderBarRow flexDirection="row" marginBottom={1} paddingX={1}>
      <HeaderLinksBox paddingLeft={2} flexDirection="row" gap={2}>
        {links.map((link, i) => {
          const isActive = link.route === activeRoute;

          return (
            <HeaderLinkText
              key={link.route ?? link.name ?? i}
              dimColor={!isActive}
              color={isActive ? "#FFA500" : undefined}
              underline={isActive}
            >
              {link.key}
              {link.name ? ` ${link.name}` : ""}
            </HeaderLinkText>
          );
        })}
      </HeaderLinksBox>
      <HeaderWipBox flexGrow={1} flexDirection="row" justifyContent="flex-end">
        <RunningLine width={10} text="Work In Progress" stepDelay={140} />
      </HeaderWipBox>
    </HeaderBarRow>
  );
};

const HeaderBarRow = styled(Box)`
  flex-direction: row;
  margin-bottom: 1;
`;

const HeaderLinksBox = styled(Box)`
  flex-direction: row;
  gap: 2;
`;

const HeaderLinkText = styled(Text)`
  /* dimColor via prop */
`;

const HeaderWipBox = styled(Box)`
  flex-grow: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const HeaderWipText = styled(Text)`
  /* dimColor via prop */
`;
