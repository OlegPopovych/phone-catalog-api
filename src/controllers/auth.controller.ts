'use strict';

import { ControllerAction } from '../types';
import * as authService from '../services/auth.service';
import * as jwtService from '../services/jwt.service';
import bcrypt from 'bcrypt';

export const signUp: ControllerAction = async(req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);
    await authService.signUp(name, email, hashedPass);

    res.sendStatus(201);
  } catch(error) {
    res.sendStatus(500);
  }
};

export const signIn: ControllerAction = async(req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findByEmail(email);

    if(!user) {
      res.sendStatus(401);
      return;
    }

    const isPassValid = bcrypt.compare(password, user.password);

    if(!isPassValid) {
      res.sendStatus(401);
      return;
    }

    const normalizedUser = authService.normalize(user);

    const accessToken = jwtService.sign(normalizedUser);

    res.send({
      user: normalizedUser,
      accessToken,
    });

  } catch(error) {
    res.sendStatus(500);
  }
};
