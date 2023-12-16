'use strict';

import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authLocal } from '../auth_config/local';
import { ValidateFieldsLogIn, ValidateFieldsSingUp } from '../utils/validateCredentials';

export const authRouter = Router();

authRouter.post('/signUp', ValidateFieldsSingUp, authController.signUp);
authRouter.post('/signIn', ValidateFieldsLogIn, authLocal, authController.signIn);
authRouter.post('/signOut', authLocal, authController.signOut);
