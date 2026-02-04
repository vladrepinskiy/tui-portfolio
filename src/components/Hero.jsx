import { styled } from "goober";
import { Box, Text } from "ink";
import React from "react";
import { DEFAULT_LOGO } from "../constants/ascii.constants.ts";
import { Typed } from "./Typed.jsx";

const normalizeLogoLines = (lines) => {
  const normalized = Array.isArray(lines)
    ? lines
    : String(lines).trim().split("\n");
  const width = 40;
  return normalized.map((line) => line.slice(0, width).padEnd(width, " "));
};

export const Hero = ({ entryText, logo = DEFAULT_LOGO, typingSpeed = 40 }) => {
  const logoLines = normalizeLogoLines(logo);

  return (
    <HeroCenteringWrapper
      flexDirection="column"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
    >
      <HeroInnerRow flexDirection="row" gap={4} padding={2}>
        <HeroTextPanelBox
          flexDirection="column"
          width={44}
          justifyContent="center"
          alignItems="center"
        >
          <Typed speed={typingSpeed}>{entryText}</Typed>
        </HeroTextPanelBox>
        <HeroLogoPanelBox flexDirection="column" flexShrink={0}>
          {logoLines.map((line, i) => (
            <HeroLogoLineText key={i} dimColor>
              {line}
            </HeroLogoLineText>
          ))}
        </HeroLogoPanelBox>
      </HeroInnerRow>
    </HeroCenteringWrapper>
  );
};

const HeroCenteringWrapper = styled(Box)`
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const HeroInnerRow = styled(Box)`
  flex-direction: row;
  gap: 4;
  padding: 2;
`;

const HeroTextPanelBox = styled(Box)`
  flex-direction: column;
  width: 44px;
  justify-content: center;
  align-items: center;
`;

const HeroLogoPanelBox = styled(Box)`
  flex-direction: column;
  flex-shrink: 0;
`;

const HeroLogoLineText = styled(Text)`
  /* dimColor via prop */
`;
