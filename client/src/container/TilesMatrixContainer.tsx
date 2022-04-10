import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

import TilesMatrixPresenter from "../presenters/TilesMatrixPresenter";

import { ITile, tileToInt } from "../models/Tile";

const initialRows: ITile[][] = [
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
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
  const [willRestart, setWillRestart] = useState(false);
  
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
      cursor.row === 5 ||
      cursor.idx !== 4 ||
      rows[cursor.row][cursor.idx].char === ''
      ) return;
    setCursor({row: cursor.row + 1, idx: 0});
  }, [cursor, rows]);
  
  const addChar = useCallback((char: string) => {
    if (rows[cursor.row][cursor.idx].char !== '') return;
    let tmp = _.cloneDeep(rows);
    tmp[cursor.row][cursor.idx].char = char;
    setRows(tmp);
    moveIdx(true);
  }, [cursor, rows, moveIdx]);

  const removeChar = useCallback(() => {
    let tmp = _.cloneDeep(rows);

    if (rows[cursor.row][cursor.idx].char === '' && cursor.idx > 0) {
      moveIdx(false);
      tmp[cursor.row][cursor.idx - 1].char = '';
    } else {
      tmp[cursor.row][cursor.idx].char = '';
    }
    setRows(tmp);
  }, [cursor, rows, moveIdx]);

  const submitRow = useCallback(() => {
    let word = rows[cursor.row].map(x => x.char).join('');
    if (word.length !== 5) return;
    let tmp = _.cloneDeep(rows);

    setLoading(true);
    axios.post('/api/submit', { word })
      .then(response => {
        setLoading(false);
        if (response.data.status === 'succeed') {
          let tileStates = response.data.tiles;
          tmp[cursor.row].map((tile, i) => tile.state = tileStates[i]);
          return true;
        } else {
          alert(`'${word}' is not a word`);
          setCursor({...cursor, idx: 4})
        }
      }).then(isWord => {
        if (!isWord) return;
          axios.post('/api/save', { rows: JSON.stringify(tmp), cursor: cursor.row + 1 }).then(() => console.log('saved'))
          setRows(tmp);
          moveRow(); 
      })
  }, [cursor, rows, moveRow]);

  const reset = () => {
    setCursor({ row: 0, idx: 0 });
    setRows(initialRows);
    setWillRestart(false);
  };

  const convertRows = useCallback(() => {
    return rows.flat().flatMap(tileToInt);
  }, [rows]);


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

  useEffect(() => {
    let tilesRow = rows[cursor.row]
    if (tilesRow.every(tile => tile.state === 'right')) {
      alert('Right');
      axios.post('/api/newGame', { data: convertRows(), status: 'succeed' }).then(() => setWillRestart(true));
    } else if (cursor.row === 5 && tilesRow.every(tile => tile.state !== 'normal')) {
      axios.post('/api/answer').then((response) => {
        let answer = response.data;
        alert(`the answer is ${answer}`);
      }).then(() => {
        axios.post('/api/newGame', { data: convertRows(), status: 'failure' }).then(() => setWillRestart(true));
      })
    }
  }, [cursor, rows, convertRows]);

  useEffect(() => {
    if (!willRestart) return; 
    reset();
  }, [willRestart]);

  useEffect(() => {
    axios.post('/api/load')
      .then(response => {
        if (!response.data) return;
        setRows(JSON.parse(response.data.rows));
        setCursor({row: response.data.cursor, idx: 0})
      })
  }, [])

  return (
    <TilesMatrixPresenter
      rows={rows}
      cursor={cursor}
      submitRow={submitRow}
      addChar={addChar}
      removeChar={removeChar}
    />
  );
}

export default TilesMatrixContainer;