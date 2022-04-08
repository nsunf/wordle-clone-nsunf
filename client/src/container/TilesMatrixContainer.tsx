import { useCallback, useEffect, useState } from "react";

import TilesMatrixPresenter from "../presenters/TilesMatrixPresenter";
import TilesRow from "../components/TilesRow";
import SubmitButton from "../styled/SubmitButton";

const initialRows: string[][] = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
];

function TilesMatrixContainer() {
  const [cursor, setCursor] = useState<{row: number, idx: number}>({row: 0, idx: 0});
  const [rows, setRows] = useState<string[][]>(initialRows);
  
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
      rows[cursor.row][cursor.idx] === ''
      ) return;
    setCursor({row: cursor.row + 1, idx: 0});
  }, [cursor, rows]);
  
  const addChar = useCallback((char: string) => {
    if (rows[cursor.row][cursor.idx] !== '') return;
    let tmp = [...rows];
    tmp[cursor.row][cursor.idx ] = char;
    setRows(tmp);
    moveIdx(true);
  }, [cursor, rows, moveIdx]);

  const removeChar = useCallback(() => {
    let tmp = rows;

    if (rows[cursor.row][cursor.idx] === '') {
      moveIdx(false);
      tmp[cursor.row][cursor.idx - 1] = '';
      console.log(cursor.idx - 1)
    } else {
      tmp[cursor.row][cursor.idx] = '';
    }
    setRows([...tmp]);
  }, [cursor, rows, moveIdx]);

  const keyPressEvent = useCallback((e: KeyboardEvent) => {
    let key = e.code;
    if (key.slice(0, 3) === 'Key') {
      addChar(key.slice(-1));
    } else if (key === 'Enter') {
      moveRow();
    } else if (key === 'Backspace') {
      removeChar();
    }
  }, [ moveRow, addChar, removeChar])

  useEffect(() => {
    window.addEventListener('keydown', keyPressEvent);
    return () => {
      window.removeEventListener('keydown', keyPressEvent);
    }
  }, [keyPressEvent])

  return (
    <TilesMatrixPresenter>
      <div>
      {rows.map((row, i) => 
        <TilesRow 
        key={`row_${i}`} 
        cursor={i === cursor.row ? cursor.idx : null} 
        row={row}
        />)
      }
      </div>
      <SubmitButton>Submit</SubmitButton>
    </TilesMatrixPresenter>
  );
}

export default TilesMatrixContainer;