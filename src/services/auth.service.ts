'use strict';

import { UserModel } from '../models';
import { User } from '../types';

export const normalize = ({ id, email, name }: Omit<User, 'password'>) => {
  return { id, email, name };
};

export const signUp = async (name: string, email: string, password: string) => {
  await UserModel.create({ name, email, password });
};
