require('dotenv').config();
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import f from 'session-file-store'
const FileStore = f(session);

import indexRouter from './routes/index'; 
import apiRouter from './routes/api';

const app = express();

app.set('port', process.env.PORT);

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'sECreT kEY',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
  console.log('Express server is running on ' + app.get('port'));
});