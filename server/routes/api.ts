import express, { Request, Response } from 'express';

import wordManager from '../services/word';

const router = express.Router();

router.post('/submit', (req: Request, res: Response) => {
  let word = req.body.word;
  let answer = req.session.word ?? 'hello';
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
  req.session.word = wordManager.randomWord();
  res.end();
});

router.post('/answer', (req: Request, res: Response) => {
  res.send(req.session.word);
});


export default router;

