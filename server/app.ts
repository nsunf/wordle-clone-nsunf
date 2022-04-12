require('dotenv').config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import f from 'session-file-store'
import createUser from "./middleware/createUser";

import indexRouter from './routes/index'; 
import apiRouter from './routes/api';


const app = express();
const FileStore = f(session);

app.set('port', process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'sECreT kEY',
  resave: false,
  saveUninitialized: true,
  store: new FileStore({
    ttl: 10_512_000
  })
}))

app.use(createUser);
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));



declare module 'express-session' {
  interface SessionData {
    word: string;
    state: 'new'|'ongoing'|'end';
    process: { rows: string, cursor: { row: number, col: number }}|null;
    history: { tiles: number[], word: string, status: 'succeed'|'failure'}[];
  }
}

app.listen(app.get('port'), () => {
  console.log('Express server is running on ' + app.get('port'));
});