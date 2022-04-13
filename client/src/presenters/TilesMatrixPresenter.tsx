import styled from "styled-components";

import TilesRow from "../components/TilesRow";
import SubmitButton from "../styled/SubmitButton";
import KeyboardContainer from "../container/KeyboardContainer";

import { ITile } from "../models/Tile";

const Presenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  gap: 32px;
  
  height: 100%;
  padding: 32px 0;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    gap: 24px;
  }
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Section = styled.div`
  height: 75%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  @media (max-width: 1200px) {
    gap: 24px;
  }
  @media (max-width: 768px) {
    gap: 16px;
  }

`;

const MatrixBlock = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  
  @media (max-width: 1200px) {
    gap: 2px;
  }
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
      <Section>
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
      </Section>
      <KeyboardContainer rows={rows} addChar={addChar} removeChar={removeChar}/>
    </Presenter>
  );
}

export default TilesMatrixPresenter;