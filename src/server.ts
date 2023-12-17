'use strict';

import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { phoneRouter } from './routes/phone.routes';

dotenv.config();

import { connect } from './utils/initDb';
import { authRouter } from './routes/auth.route';
import { staticRouter } from './routes/static.router';
import { userRouter } from './routes/user.routes';

connect();

const app = express()
  .use(cors({ origin: 'http://localhost:3000', credentials: true, }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60*60*24*1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/products', phoneRouter);
app.use('/auth', authRouter);
app.use('/static', staticRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hi dude!👽');
});

app.listen(process.env.PORT, () => {
  console.log(
    `☄️👽☄️ Server is running and you can not stop it http://localhost:${process.env.PORT} 🚀👽🚀`,
  );
});
