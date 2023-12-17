'use strict';

import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authLocal } from '../auth_config/local';
import { ValidateFieldsLogIn, ValidateFieldsSingUp } from '../utils/validateCredentials';
import { isLoggedIn } from '../utils/isLoggedIn';

export const authRouter = Router();

authRouter.post('/signUp', ValidateFieldsSingUp, authController.signUp);
authRouter.post('/signIn', ValidateFieldsLogIn, authLocal, authController.signIn);
authRouter.post('/signOut', isLoggedIn, authController.signOut);
authRouter.post('/checkIfAuthorized', isLoggedIn, authController.checkIfAuthorized);
