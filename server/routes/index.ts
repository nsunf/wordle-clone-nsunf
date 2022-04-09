import express, { Request, Response } from 'express';
import path from 'path';
import wordManager from '../services/word';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (!req.session.word) {
    req.session.word = wordManager.randomWord();
    req.session.history = [];
    console.log('New User ---> ' + req.session.word);
  } else {
    console.log('Old User ---> ' + req.session.word);
  }
  res.sendFile(path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'));
});

export default router;