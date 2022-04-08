import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const TileBlock = styled.div<{isFocused: boolean}>`
  width: 100px;
  height: 100px;

  border: 2px solid black;
  border-radius: 10px;

  margin: 4px;

  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 48px;
  font-weight: bold;

  transition: 250ms;

  ${props => props.isFocused ?
    `
      background: white;
      transform: scale(1.025);
    ` : null
  }
`;

interface TileProps {
  char: string;
  isFocused: boolean;
}

function Tile({ char, isFocused }: TileProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  });

  return (
    <TileBlock isFocused={isFocused}>
      {char}
    </TileBlock>
  );
}

export default Tile;