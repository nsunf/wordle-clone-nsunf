import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import TilesMatrixPresenter from "../presenters/TilesMatrixPresenter";
import TilesRow from "../components/TilesRow";
import SubmitButton from "../styled/SubmitButton";

import { ITile } from "../models/Tile";

const initialRows: ITile[][] = [
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }]
];

function TilesMatrixContainer() {
  const [cursor, setCursor] = useState<{row: number, idx: number}>({row: 0, idx: 0});
  const [rows, setRows] = useState<ITile[][]>(initialRows);
  const [loading, setLoading] = useState(false);
  
  const moveIdx = useCallback((forwards: boolean) => {
    let nxtIdx = cursor.idx;
    if (forwards && nxtIdx !== 4) {
      nxtIdx++;
    } else if (!forwards && nxtIdx !== 0) {
      nxtIdx--;
    }

    setCursor({...cursor, idx: nxtIdx});
  }, [cursor]);

  const moveRow = useCallback(() => {
    if (
      cursor.row === 4 ||
      cursor.idx !== 4 ||
      rows[cursor.row][cursor.idx].char === ''
      ) return;
    setCursor({row: cursor.row + 1, idx: 0});
  }, [cursor, rows]);
  
  const addChar = useCallback((char: string) => {
    if (rows[cursor.row][cursor.idx].char !== '') return;
    let tmp = [...rows];
    tmp[cursor.row][cursor.idx].char = char;
    setRows(tmp);
    moveIdx(true);
  }, [cursor, rows, moveIdx]);

  const removeChar = useCallback(() => {
    let tmp = rows;

    if (rows[cursor.row][cursor.idx].char === '') {
      moveIdx(false);
      tmp[cursor.row][cursor.idx - 1].char = '';
      console.log(cursor.idx - 1)
    } else {
      tmp[cursor.row][cursor.idx].char = '';
    }
    setRows([...tmp]);
  }, [cursor, rows, moveIdx]);

  const submitRow = useCallback(() => {
    let word = rows[cursor.row].map(x => x.char).join('');
    if (word.length !== 5) return;

    setLoading(true);
    axios.post('/api/submit', { word })
      .then((result) => {
        setLoading(false);
        if (result.data.status === 'succeed') {
          let tileStates = result.data.tiles;
          let tmp = [...rows];
          tmp[cursor.row].map((tile, i) => tile.state = tileStates[i]);
          setRows(tmp);
          moveRow();
        } else {
          alert(`'${word}' is not a word`);
          setCursor({...cursor, idx: 4})
        }
      })
  }, [cursor, rows, moveRow]);


  const keyPressEvent = useCallback((e: KeyboardEvent) => {
    if (loading) return;
    let key = e.code;
    if (key.slice(0, 3) === 'Key') {
      addChar(key.slice(-1));
    } else if (key === 'Enter') {
      submitRow();
    } else if (key === 'Backspace') {
      removeChar();
    }
  }, [ addChar, removeChar, submitRow, loading])

  useEffect(() => {
    window.addEventListener('keydown', keyPressEvent);
    return () => {
      window.removeEventListener('keydown', keyPressEvent);
    }
  }, [keyPressEvent])

  useEffect(() => {
    if (!loading) return; 
    const timer = setTimeout(() => {
      let nxtIdx = cursor.idx + 1 > 4 ? 0 : cursor.idx + 1;
      setCursor({...cursor, idx: nxtIdx})
    }, 200);

    return () => clearTimeout(timer);
  }, [loading, cursor])


  return (
    <TilesMatrixPresenter>
      <div>
      {rows.map((row, i) => 
        <TilesRow 
        key={`row_${i}`} 
        row={row}
        cursor={cursor.row === i ? cursor.idx : null}
        />)
      }
      </div>
      <SubmitButton onClick={submitRow}>Submit</SubmitButton>
    </TilesMatrixPresenter>
  );
}

export default TilesMatrixContainer;