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
        res.send({status: 'failure', tiles: []})
      }
    })
});

router.post('/newGame', (req: Request, res: Response) => {
  req.session.process = null;
  req.session.state = 'new';
  req.session.word = wordManager.randomWord();
  res.send('/api/newGame called');
});

router.post('/answer', (req: Request, res: Response) => {
  res.send(req.session.word);
});

router.post('/saveProcess', (req: Request, res: Response) => {
  req.session.state = req.body.state;
  req.session.process = { rows: req.body.rows, cursor: req.body.cursor };
  res.send('/api/save called');
});

router.post('/load', (req: Request, res: Response) => {
  res.send({process: req.session.process, state: req.session.state});
});

router.post('/addHistory', (req: Request, res: Response) => {
  if (!req.session.history) req.session.history = [];
  if (!req.session.word) res.send('word undefined');
  req.session.history.push({tiles: req.body.data, word: req.session.word!, status: req.body.status});
  res.send('/api/addHistory called');
});

router.post('/getHistory', (req: Request, res: Response) => {
  res.send(req.session.history);
});


export default router;

