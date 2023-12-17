'use strict';

import { Router } from 'express';
import { isLoggedIn } from '../utils/isLoggedIn';
import * as userController from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/favorites', isLoggedIn, userController.getFavorites);
userRouter.patch('/favorites', isLoggedIn, userController.updateFavorites);

userRouter.get('/cart', isLoggedIn, userController.getCart);
userRouter.patch('/cart', isLoggedIn, userController.updateCart);

userRouter.get('/orders', isLoggedIn, userController.getOrders);
userRouter.post('/orders', isLoggedIn, userController.createOrder);

userRouter.get('/test', isLoggedIn, (req, res) => {
  res.send('<h1>HELLO</h1>');
});
