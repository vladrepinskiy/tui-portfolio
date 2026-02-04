import { styled } from "goober";
import { Text } from "ink";
import React, { useEffect, useState } from "react";

/**
 * Types out text character by character.
 * @param {string} children - Text to type out (use as children)
 * @param {number} speed - Ms per character (default 40 for a fast type)
 */
export const Typed = ({ children, speed = 40 }) => {
  const text = typeof children === "string" ? children : String(children);
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (visibleLength >= text.length) return;
    const id = setTimeout(() => {
      setVisibleLength((n) => Math.min(n + 1, text.length));
    }, speed);
    return () => clearTimeout(id);
  }, [text.length, speed, visibleLength]);

  return <TypedOutputText>{text.slice(0, visibleLength)}</TypedOutputText>;
};

const TypedOutputText = styled(Text)`
  /* typed output inherits default text styling */
`;
