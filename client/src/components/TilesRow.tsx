import styled from "styled-components";
import Tile from "./Tile";

import { ITile } from "../models/Tile";

const TilesRowBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface TilesRowProps {
  row: ITile[];
  cursor: number|null;
}

function TilesRow({ row, cursor }: TilesRowProps) {
  return (
    <TilesRowBlock>
      {row.map((tile, i) => 
        <Tile 
        key={`tile_${i}`} 
        tile={tile}
        isFocused={cursor === i}
        />
      )}
    </TilesRowBlock>
  );
}

export default TilesRow;