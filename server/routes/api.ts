import express, { Request, Response } from 'express';

import wordManager from '../services/word';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.end('ha')
})

export default router;

declare module 'express-session' {
  interface SessionData {
    state: { word: string, score: null }|null;
    history: { word: string, count: number }[];
  }
}