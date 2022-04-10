import { useEffect, useState} from "react";
import _ from "lodash";

import KeyboardPresenter from "../presenters/KeyboardPresenter";
import { ITile } from "../models/Tile";

interface KeyboardContainerProps {
  rows: ITile[][];
  addChar: (char: string) => void;
  removeChar: () => void;
}

const initialKeys: ITile[][]= [
  [{char: 'Q', state: 'normal'}, {char: 'W', state: 'normal'}, {char: 'E', state: 'normal'}, {char: 'R', state: 'normal'}, {char: 'T', state: 'normal'}, {char: 'Y', state: 'normal'}, {char: 'U', state: 'normal'}, {char: 'I', state: 'normal'}, {char: 'O', state: 'normal'}, {char: 'P', state: 'normal'}],
  [{char: 'A', state: 'normal'}, {char: 'S', state: 'normal'}, {char: 'D', state: 'normal'}, {char: 'F', state: 'normal'}, {char: 'G', state: 'normal'}, {char: 'H', state: 'normal'}, {char: 'J', state: 'normal'}, {char: 'K', state: 'normal'}, {char: 'L', state: 'normal'}],
  [{char: 'Z', state: 'normal'}, {char: 'X', state: 'normal'}, {char: 'C', state: 'normal'}, {char: 'V', state: 'normal'}, {char: 'B', state: 'normal'}, {char: 'N', state: 'normal'}, {char: 'M', state: 'normal'}]
]

function KeyboardContainer({ rows, addChar, removeChar }: KeyboardContainerProps) {
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
    <KeyboardPresenter
      keys={keys}
      addChar={addChar}
      removeChar={removeChar}
    />
  );
}

export default KeyboardContainer;