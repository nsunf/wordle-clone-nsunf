import styled from "styled-components";

import TilesRow from "../components/TilesRow";
import SubmitButton from "../styled/SubmitButton";
import KeyboardContainer from "../container/KeyboardContainer";

import { ITile } from "../models/Tile";

const Presenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  
  margin: 80px 0;
`;

const MatrixBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

interface PresenterProps {
  state: 'new'|'ongoing'|'end';
  rows: ITile[][];
  cursor: { row: number, col: number };
  onSubmit: () => void;
  onNewGame: () => void;
  addChar: (char: string) => void;
  removeChar: () => void;
}

function TilesMatrixPresenter({ state, rows, cursor, onSubmit, onNewGame, addChar, removeChar } : PresenterProps) {
  return (
    <Presenter>
      <MatrixBlock>
      {rows.map((row, i) => 
        <TilesRow 
        key={`row_${i}`} 
        row={row}
        cursor={cursor.row === i ? cursor.col : null}
        />)
      }
      </MatrixBlock>
      {state === 'end' ?
        <SubmitButton onClick={onNewGame}>New Game</SubmitButton> :
        <SubmitButton onClick={onSubmit}>Submit</SubmitButton>
      }
      <KeyboardContainer rows={rows} addChar={addChar} removeChar={removeChar}/>
    </Presenter>
  );
}

export default TilesMatrixPresenter;