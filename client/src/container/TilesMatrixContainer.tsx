import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

import TilesMatrixPresenter from "../presenters/TilesMatrixPresenter";

import { TileState, ITile, tileToInt } from "../models/Tile";

type GameState = 'new'|'ongoing'|'end';
type Cursor = { row: number, col: number };

const initialRows: ITile[][] = [
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }],
  [{ char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }, { char: '', state: 'normal' }]
];

function TilesMatrixContainer() {
  const [state, setState] = useState<GameState>('new');
  const [cursor, setCursor] = useState<Cursor>({row: 0, col: 0});
  const [rows, setRows] = useState<ITile[][]>(initialRows);
  const [loading, setLoading] = useState(false);
  
  const moveCol = useCallback((forwards: boolean) => {
    let nxtIdx = cursor.col;
    if (forwards && nxtIdx !== 4) {
      nxtIdx++;
    } else if (!forwards && nxtIdx !== 0) {
      nxtIdx--;
    }

    setCursor({...cursor, col: nxtIdx});
  }, [cursor]);

  const moveRow = useCallback(() => {
    if (
      cursor.row === 5 ||
      cursor.col !== 4 ||
      rows[cursor.row][cursor.col].char === ''
      ) return;
    setCursor({row: cursor.row + 1, col: 0});
  }, [cursor, rows]);
  
  const addChar = useCallback((char: string) => {
    if (rows[cursor.row][cursor.col].char !== '') return;
    let tmp = _.cloneDeep(rows);
    tmp[cursor.row][cursor.col].char = char;
    setRows(tmp);
    moveCol(true);
  }, [cursor, rows, moveCol]);

  const removeChar = useCallback(() => {
    let tmp = _.cloneDeep(rows);

    if (rows[cursor.row][cursor.col].char === '' && cursor.col > 0) {
      moveCol(false);
      tmp[cursor.row][cursor.col - 1].char = '';
    } else {
      tmp[cursor.row][cursor.col].char = '';
    }
    setRows(tmp);
  }, [cursor, rows, moveCol]);

  const checkWord = useCallback(async (word: string): Promise<{status: 'succeed'|'failure', tiles: TileState[]}> => {
    try {
      let response = await axios.post('/api/submit', { word })
      return response.data;
    } catch (err) {
      throw new Error('Error checkWord : ' + err);
    }
  }, []);

  const saveProcess = useCallback((_rows: ITile[][], _cursor: Cursor, _state: GameState) => {
    return axios.post('/api/saveProcess', { rows: _rows, cursor: _cursor, state: _state})
  }, [])

  const saveLeaderboard = useCallback((_rows: ITile[][], status: 'succeed'|'failure') => {
    let convertedTiles = _rows.flat().flatMap(tileToInt)
    return axios.post('/api/addHistory', { data: convertedTiles, status})
  }, []);



  const onSubmit = useCallback(async() => {
    if (cursor.col !== 4 || rows[cursor.row][cursor.col].char === '') return;
    setLoading(true);

    let tmpRows = _.cloneDeep(rows);
    let tmpCursor = _.cloneDeep(cursor);
    let tmpRow = tmpRows[tmpCursor.row];

    let word = tmpRow.map(tile => tile.char).join('');

    let wordCheck = await checkWord(word);
    setLoading(false);
    if (wordCheck.status === 'succeed') {
      setState('ongoing');
      wordCheck.tiles.forEach((tileState, i) => tmpRow[i].state = tileState);
      setRows(tmpRows);

      if (tmpRow.every(tile => tile.state === 'right')) {
        alert('right');
        setState('end');
        await saveProcess(tmpRows, tmpCursor, 'end');
        await saveLeaderboard(tmpRows, 'succeed');
      } else {
        if (tmpCursor.row < 5) {
          await saveProcess(tmpRows, {row: tmpCursor.row + 1, col: 0}, 'ongoing');
          moveRow();
        } else {
          alert('Beep');
          setState('end');
          await saveProcess(tmpRows, tmpCursor, 'end');
          await saveLeaderboard(tmpRows, 'failure');
        }
      }
    } else {
      alert(`${word} is not a word`);
    }

    // is it a word?
      // yes
        // change game state to ongoing
        // mark each tile
        // save process
        // is it an answer?
          // yes
            // notice user it is right
            // set game state to end [setState]
            // set button to New Game
            // save process
            // save result to leaderboard(history)
          // no
            // does user have a chance? 
              // yes
                // move cursor [setCursor]
              // no
                // show answer to user
                // set game state to end [setState]
                // set button to New Game
                // save process
                // save result to leaderboard(history)
      // no
        // alert to user
  }, [rows, cursor, checkWord, saveProcess, saveLeaderboard, moveRow]);

  const onNewGame = useCallback(async() => {
    await axios.post('/api/newGame');
    await saveProcess(initialRows, { row: 0, col: 0 }, 'new')
    setState('new');
    setRows(initialRows);
    setCursor({ row: 0, col: 0 });
    // set state to new
    // reset rows
    // reset cursor
    // save process
  }, [saveProcess])
  


  const keyPressEvent = useCallback((e: KeyboardEvent) => {
    if (loading || state === 'end') return;
    let key = e.code;
    if (key.slice(0, 3) === 'Key') {
      addChar(key.slice(-1));
    } else if (key === 'Enter') {
      onSubmit();
    } else if (key === 'Backspace') {
      removeChar();
    }
  }, [ addChar, removeChar, onSubmit, loading, state])

  useEffect(() => {
    window.addEventListener('keydown', keyPressEvent);
    return () => {
      window.removeEventListener('keydown', keyPressEvent);
    }
  }, [keyPressEvent])

  useEffect(() => {
    if (!loading) return; 
    const timer = setTimeout(() => {
      let nxtIdx = cursor.col + 1 > 4 ? 0 : cursor.col + 1;
      setCursor({...cursor, col: nxtIdx})
    }, 200);

    return () => clearTimeout(timer);
  }, [loading, cursor])


  useEffect(() => {
    axios.post('/api/load')
      .then(response => {
        let { process, state } = response.data;
        if (!process) return;
        let rows: ITile[][] = process.rows;
        setState(state);
        setRows(rows);
        setCursor(process.cursor)
      })
  }, [])

  return (
    <TilesMatrixPresenter
      state={state}
      rows={rows}
      cursor={cursor}
      onSubmit={onSubmit}
      onNewGame={onNewGame}
      addChar={addChar}
      removeChar={removeChar}
    />
  );
}

export default TilesMatrixContainer;