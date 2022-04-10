import styled, { css } from "styled-components";

import { IHistory } from "../models/IHistory";

const HistoryTileBlock = styled.div<{word: string}>`
  display: grid;
  grid-template-columns: repeat(5, 20%);

  width: 20%;
  aspect-ratio: 5/6;
  box-sizing: border-box;

  cursor: pointer;
  transition: 250ms;

  &:hover {
    transform: scale(1.025);
    border: 1px solid black;

    &::before {
      content: "${props => props.word}";
      position: absolute;

      padding: 4px 8px;
      font-weight: bold;
      font-size: 18px;
    }
  }
`;

const Tile = styled.div<{type: number}>`
  width: 100%;
  aspecti-ratio: 1/1;
  ${props => {
    let { main_color, sub_color, yellow} = props.theme;
    switch (props.type) {
      case 0:
      case 3:
        return css`
        background: ${main_color};
        `;
      case 1:
        return css`
        background: ${yellow};
        `;
      case 2:
        return css`
        background: ${sub_color};
        `;
    }
  }}
`; 

function HistoryTile({ history }: { history: IHistory }) {
  let { tiles, word, status } = history
  return (
    <HistoryTileBlock word={word}>
      {tiles.map((num, i) => <Tile key={`${word}_historyTile_${i}`} type={num}/>)}
    </HistoryTileBlock>
  );
}

export default HistoryTile;