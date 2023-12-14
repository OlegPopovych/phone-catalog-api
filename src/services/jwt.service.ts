'use strict';

import jwt from 'jsonwebtoken';
import { User } from '../types';

let jwt_key = '';

if (process.env.JWT_KEY !== undefined) {
  jwt_key = process.env.JWT_KEY;
}

export const sign = (user: Omit<User, 'name' | 'password'>) => {
  const token = jwt.sign(user, jwt_key);

  return token;
};

export const verift = (token: string) => {
  try {
    return jwt.verify(token, jwt_key);
  } catch (error) {
    return null;
  }
};
