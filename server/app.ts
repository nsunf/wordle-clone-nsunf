require('dotenv').config();
import express from "express";
import path from "path";

import indexRouter from './routes/index'; 

const app = express();

app.set('port', process.env.PORT);

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.get('/', indexRouter);

app.listen(app.get('port'), () => {
  console.log('Express server is running on ' + app.get('port'));
});