'use strict';

import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { connect } from './utils/initDb';
import { authRouter } from './routes/auth.route';
import { staticRouter } from './routes/static.router';
import { userRouter } from './routes/user.routes';
import { tabletsRouter } from './routes/tablets.routes';
import { accessoriesRouter } from './routes/accessories.routes';
import { productsRouter } from './routes/products.routes';
import { phonesRouter } from './routes/phones.routes';

connect();

const app = express()
  .enable('trust proxy')
  .use(cors({ origin: [
    'http://localhost:3000',
    'https://fe-aug23-nohuggingonlydebugging.github.io'
  ], credentials: true, }));

app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 60*60*24*1000,
//     },
//   })
// );

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000,
    sameSite: 'none',
    secure: true, // Встановіть true, якщо ви використовуєте HTTPS
    httpOnly: true,
    domain: 'fe-aug23-nohuggingonlydebugging.github.io', // Домен клієнта
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/products', productsRouter);
app.use('/phones', phonesRouter);
app.use('/tablets', tabletsRouter);
app.use('/accessories', accessoriesRouter);
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
