import styled from "styled-components";

import { KeysRow, Key } from "../styled/Key";

import { ITile } from "../models/Tile";

const Presenter = styled.div`
`;

interface PresenterProps {
  keys: ITile[][];
  addChar: (char: string) => void;
  removeChar: () => void;
}

function KeyboardPresenter({ keys, addChar, removeChar }: PresenterProps) {
  return (
    <Presenter>
      {keys.map((row, i) => {
        return (
          <KeysRow key={`keysRow_${i}`}>
            {row.map(key => <Key key={`key_${key.char}`} keyValue={key.char} isBackspace={false} state={key.state} onClick={() => addChar(key.char)}></Key>)}
            {i === 2 ? <Key keyValue={'←'} isBackspace={true} state={Key.state} onClick={removeChar}/> : null}
          </KeysRow>
        );
      })}
    </Presenter>
  );
}

export default KeyboardPresenter