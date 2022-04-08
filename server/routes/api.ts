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


export default router;

