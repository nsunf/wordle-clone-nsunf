import { useEffect, useState } from "react";
import _ from "lodash";

import KeyboardPresenter from "../presenters/KeyboardPresenter";
import { KeysRow, Key } from "../styled/Key";
import { ITile } from "../models/Tile";

const initialKeys: ITile[][]= [
  [{char: 'Q', state: 'normal'}, {char: 'W', state: 'normal'}, {char: 'E', state: 'normal'}, {char: 'R', state: 'normal'}, {char: 'T', state: 'normal'}, {char: 'Y', state: 'normal'}, {char: 'U', state: 'normal'}, {char: 'I', state: 'normal'}, {char: 'O', state: 'normal'}, {char: 'P', state: 'normal'}],
  [{char: 'A', state: 'normal'}, {char: 'S', state: 'normal'}, {char: 'D', state: 'normal'}, {char: 'F', state: 'normal'}, {char: 'G', state: 'normal'}, {char: 'H', state: 'normal'}, {char: 'J', state: 'normal'}, {char: 'K', state: 'normal'}, {char: 'L', state: 'normal'}],
  [{char: 'Z', state: 'normal'}, {char: 'X', state: 'normal'}, {char: 'C', state: 'normal'}, {char: 'V', state: 'normal'}, {char: 'B', state: 'normal'}, {char: 'N', state: 'normal'}, {char: 'M', state: 'normal'}]
]

function KeyboardContainer({ rows }: { rows: ITile[][] }) {
  const [keys, setKeys] = useState(initialKeys);

  useEffect(() => {
    let filteredTiles = rows.flat().filter(tile => tile.char !== '' && tile.state !== 'normal');

    let tmp = _.cloneDeep(initialKeys);

    filteredTiles.forEach(tile => {
      let rowIdx = tmp.findIndex(row => row.filter(key => key.char === tile.char).length > 0);
      let columnIdx = tmp[rowIdx].findIndex(key => key.char === tile.char);

      let key = tmp[rowIdx][columnIdx];

      switch (tile.state) {
        case 'right':
          key.state = 'right';
          break;
        case 'wrong position':
          if (key.state !== 'right') key.state = 'wrong position'
          break;
        case 'wrong':
          if (key.state !== 'right' && key.state !== 'wrong position') key.state = 'wrong';
          break;
        default: break;
      }
    })

    setKeys(tmp);
  }, [rows])

  return (
    <KeyboardPresenter>
      {keys.map((row, i) => {
        return (
          <KeysRow key={`keysRow_${i}`}>
            {row.map(key => <Key key={`key_${key.char}`} keyValue={key.char} isBackspace={false} state={key.state}></Key>)}
            {i === 2 ? <Key keyValue={'←'} isBackspace={true} state={Key.state}/> : null}
          </KeysRow>
        );
      })}
    </KeyboardPresenter>
  );
}

export default KeyboardContainer;