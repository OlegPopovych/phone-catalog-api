'use strict';

import { Router } from 'express';
import { isLoggedIn } from '../utils/isLoggedIn';

export const userRouter = Router();

userRouter.get('/favorites', isLoggedIn);
userRouter.put('/favorites', isLoggedIn);

userRouter.get('/cart', isLoggedIn);
userRouter.put('/cart', isLoggedIn);

userRouter.get('/orders', isLoggedIn);
userRouter.post('/orders', isLoggedIn);

userRouter.get('/test', isLoggedIn, (req, res) => {
  res.send('<h1>HELLO</h1>');
});
