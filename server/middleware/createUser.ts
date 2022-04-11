import express from 'express';
import wordManager from '../services/word';

export default function createUser(req: express.Request, res: express.Response, nxt: Function) {
  if (!req.session.word) {
    req.session.word = wordManager.randomWord();
    req.session.history = [];
    console.log('New User ---> ' + req.session.word);
  } else {
    console.log('Old User ---> ' + req.session.word);
  }
  nxt();
}