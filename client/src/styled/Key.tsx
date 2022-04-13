import styled, { css } from "styled-components";
import { TileState } from "../models/Tile";

interface IKey {
  keyValue: string;
  isBackspace: boolean;
  state: TileState;
}

export const Key = styled.div<IKey>`
  position: relative; 
  height: 100%;
  aspect-ratio: 1/1;
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  background: white;

  font-weight: bold;
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
    // aspect-ratio: 2/3;
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

  @media (max-width: 1200px) {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    aspect-ratio: 4/5;
    font-size: 16px;
  }
`;


export const KeysRow = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;


  @media (max-width: 1024px) {
    gap: 2px;
  }

  @media (max-width: 768px) {
  }
`;
