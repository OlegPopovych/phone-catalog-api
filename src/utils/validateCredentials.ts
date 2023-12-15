'use strict';

import { Request, Response, NextFunction } from 'express';

const onPasswordCheck = (password: string) => {

  if (password.length < 6) {
    return false;
  }

  return true;
};
const onNameCheck = (name: string) => {

  if (!name || name.length < 2) {
    return false;
  }

  return true;
};

const onEmailCheck = (email: string) => {
  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!email || !emailPattern.test(email)) {
    return false;
  }

  return true;
};

export const ValidateFieldsSingUp = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if(!onPasswordCheck(password)) {
    res.status(400).json({ error: 'Password is invalid' });

    return;
  }

  if(!onEmailCheck(email)) {
    res.status(400).json({ error: 'Email is invalid' });

    return;
  }

  if(!onNameCheck(name)) {
    res.status(400).json({ error: 'Name is invalid' });

    return;
  }

  next();
};

export const ValidateFieldsLogIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if(!onPasswordCheck(password)) {
    res.status(400).json({ error: 'Password is invalid' });

    return;
  }

  if(!onEmailCheck(email)) {
    res.status(400).json({ error: 'Email is invalid' });

    return;
  }

  next();
};
