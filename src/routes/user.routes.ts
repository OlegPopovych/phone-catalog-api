'use strict';

import { Router } from 'express';
import { isLoggedIn } from '../utils/isLoggedIn';
import * as userController from '../controllers/user.controller';
import asyncHandler from 'express-async-handler';

export const userRouter = Router();

userRouter.get('/favorites', isLoggedIn, asyncHandler(userController.getFavorites));
userRouter.patch('/favorites', isLoggedIn, asyncHandler(userController.updateFavorites));

userRouter.get('/cart', isLoggedIn, asyncHandler(userController.getCart));
userRouter.patch('/cart', isLoggedIn, asyncHandler(userController.updateCart));

userRouter.get('/orders', isLoggedIn, asyncHandler(userController.getOrders));
userRouter.post('/orders', isLoggedIn, asyncHandler(userController.createOrder));
