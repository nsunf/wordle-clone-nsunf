import express, { Request, Response } from 'express';

import wordManager from '../services/word';

const router = express.Router();

router.post('/submit', (req: Request, res: Response) => {
  let word = req.body.word;
  let answer = req.session.word;
  wordManager.isItAWord(word)
    .then(isWord => {
      if (isWord) {
        if (!answer) throw new Error('session word missing');
        res.send({status: 'succeed', tiles: wordManager.checkAnswer(word, answer.toUpperCase())});
      } else {
        res.send({status: 'failure', tiles: null})
      }
    })
});

router.post('/newGame', (req: Request, res: Response) => {
  if (req.session.history === undefined) res.send('history undefined');
  if (req.session.word === undefined) res.send('word undefined')
  req.session.history!.push({tiles: req.body.data, word: req.session.word!, status: req.body.status}) 
  req.session.word = wordManager.randomWord();
  req.session.process = null;
  res.send('/api/newGame called');
});

router.post('/answer', (req: Request, res: Response) => {
  res.send(req.session.word);
});

router.post('/save', (req: Request, res: Response) => {
  let rows: string = req.body.rows;
  let cursor: number = req.body.cursor;
  req.session.process = { rows, cursor };
  res.send('/api/save called');
});

router.post('/load', (req: Request, res: Response) => {
  res.send(req.session.process);
});

router.post('/getHistory', (req: Request, res: Response) => {
  res.send(req.session.history);
});


export default router;

