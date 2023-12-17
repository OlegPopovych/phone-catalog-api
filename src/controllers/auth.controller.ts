'use strict';

import { ControllerAction, User } from '../types';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';

export const signUp: ControllerAction = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    await authService.signUp(name, email, hashedPass);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const signIn: ControllerAction = async (req, res)=> {
  console.log(`🤘Come in friend ${(req.user as User)?.name}!🤘`);

  res.status(200).send(
    userService.normalizeData((req.user as User))
  );
};

export const checkIfAuthorized: ControllerAction = async (req, res)=> {
  console.log(`🤘Happy to see you again ${(req.user as User)?.name}!🤘`);

  res.status(200).send(
    userService.normalizeData((req.user as User))
  );
};

export const signOut: ControllerAction = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send({ success: true });
  });
};
