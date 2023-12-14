'use strict';

import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/signUp', authController.signUp);
authRouter.post('/signIn', authController.signIn);
