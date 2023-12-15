'use strict';

import { Router } from 'express';
import * as phoneController from '../controllers/phone.controller';
import { isLoggedIn } from '../utils/isLoggedIn';

export const userRouter = Router();

userRouter.get('/favorites', isLoggedIn, phoneController.findAllWithPagination);
userRouter.put('/favorites', isLoggedIn, phoneController.findAllWithPagination);

userRouter.get('/cart', isLoggedIn, phoneController.findAllWithPagination);
userRouter.put('/cart', isLoggedIn, phoneController.findAllWithPagination);

userRouter.get('/orders', isLoggedIn, phoneController.findAllWithPagination);
userRouter.post('/orders', isLoggedIn, phoneController.findAllWithPagination);
