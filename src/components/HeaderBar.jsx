import { styled } from "goober";
import { Box, Text } from "ink";
import React from "react";

export const HeaderBar = ({ links }) => {
  return (
    <HeaderBarRow flexDirection="row" marginBottom={1} paddingX={1}>
      <HeaderLinksBox paddingLeft={2} flexDirection="row" gap={2}>
        {links.map((link, i) => (
          <HeaderLinkText key={link.name ?? i} dimColor>
            {link.name}
          </HeaderLinkText>
        ))}
      </HeaderLinksBox>
      <HeaderWipBox flexGrow={1} flexDirection="row" justifyContent="flex-end">
        <HeaderWipText dimColor>Work In Progress</HeaderWipText>
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
