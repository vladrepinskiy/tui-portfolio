import { styled } from "goober";
import { Box, Text } from "ink";
import { useEffect, useState } from "react";

const SEPARATOR = "   ";

type RunningLineProps = {
  width: number;
  text: string;
  stepDelay?: number;
};

export const RunningLine = ({
  width,
  text,
  stepDelay = 200,
}: RunningLineProps) => {
  const content = text.trim() ? `${text}${SEPARATOR}`.repeat(3) : "";
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (!content || width <= 0) return;

    const id = setInterval(() => {
      setPosition((p) => (p + 1) % content.length);
    }, stepDelay);

    return () => clearInterval(id);
  }, [content, width, stepDelay]);

  const loop = content + content;
  const innerWidth = Math.max(0, width - 4); // reserve 4 chars for "[ " and " ]"
  const visible =
    content.length <= innerWidth
      ? content.slice(0, innerWidth).padEnd(innerWidth, " ")
      : loop.slice(
          position % content.length,
          (position % content.length) + innerWidth
        );

  return (
    <RunningLineBox width={width}>
      <RunningLineText>[ {visible} ]</RunningLineText>
    </RunningLineBox>
  );
};

const RunningLineBox = styled(Box)`
  /* fixed width container */
`;

const RunningLineText = styled(Text)`
  /* running line text */
`;
