'use strict';

import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authLocal } from '../auth_config/local';

export const authRouter = Router();

authRouter.post('/signUp', authController.signUp);
authRouter.post('/signIn', authLocal, authController.signIn);
