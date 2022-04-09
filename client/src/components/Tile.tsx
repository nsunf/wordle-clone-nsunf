import styled, { css } from "styled-components";

import { ITile, TileState } from "../models/Tile";

const TileBlock = styled.div<{isFocused: boolean, state: TileState}>`
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
      // transform: scale(1.025);
      animation: cursor 1000ms linear infinite;
    ` : null
  }

  ${props => {
      switch (props.state) {
        case 'right':
          return css`
            color: white;
            background: ${props.theme.main_color};
          `;
        case 'wrong position':
          return css`
            color: white;
            background: ${props.theme.yellow};
          `;
        case 'wrong':
          return css`
            color: white;
            background: ${props.theme.sub_color};
          `;
        default :
          return;
      }
    }
  }

  @keyframes cursor {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }
  }
`;


function Tile({ tile, isFocused }: { tile: ITile, isFocused: boolean }) {
  const { char, state } = tile;

  return (
    <TileBlock isFocused={isFocused} state={state}>
      {char}
    </TileBlock>
  );
}

export default Tile;