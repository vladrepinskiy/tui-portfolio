import { styled } from "goober";
import { Box, Text } from "ink";
import React from "react";

export const AboutPage = () => {
  return (
    <AboutPageWrapper
      flexDirection="column"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
    >
      <AboutPageTitle bold>About</AboutPageTitle>
      <AboutPageText dimColor>
        This is the about page. More coming soon.
      </AboutPageText>
    </AboutPageWrapper>
  );
};

const AboutPageWrapper = styled(Box)`
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const AboutPageTitle = styled(Text)`
  font-weight: bold;
`;

const AboutPageText = styled(Text)`
  /* dimColor via prop */
`;
