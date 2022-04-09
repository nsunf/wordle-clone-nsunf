import styled, { css } from "styled-components";
import { TileState } from "../models/Tile";

interface IKey {
  keyValue: string;
  isBackspace: boolean;
  state: TileState;
}

export const Key = styled.div<IKey>`
  position: relative; 
  width: 72px;
  height: 80px;
  border: 1px solid black;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;

  font-weigth: bold;
  font-size: 32px;

  cursor: pointer;

  user-select: none;

  &::before {
    content: "${props => props.keyValue}";
  }

  &:active {
    background: #d7d7d7;
  }

  ${props => props.isBackspace ? `
    width: 112px;
  ` : null}

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
          background: ${props.theme.sub_color};
        `;  
      default:
        return;
    }
  }}
`;


export const KeysRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;

  margin: 2px 0;
`;
