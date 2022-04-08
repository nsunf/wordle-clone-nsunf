import React from "react";

import styled from "styled-components";
import Tile from "./Tile";

const TilesRowBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface TilesRowProps {
  row: string[];
  cursor: number|null;
}

function TilesRow({ row, cursor }: TilesRowProps) {
  return (
    <TilesRowBlock>
      {row.map((char, i) => 
        <Tile key={`tile_${i}`} 
        char={char} 
        isFocused={i === cursor}
        />
      )}
    </TilesRowBlock>
  );
}

export default TilesRow;