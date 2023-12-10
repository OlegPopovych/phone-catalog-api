'use strict'

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {phoneRouter} from './routes/phone.routes';

dotenv.config();

import { connect } from './utils/initDb';

connect();

const app = express()
  .use(express.json())
  .use(cors({ origin: '*' }));

app.use('/phone', phoneRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(process.env.PORT, () => {
  console.log(`🚀🚀🚀 Server is running on http://localhost:${process.env.PORT} 🚀🚀🚀`)
});