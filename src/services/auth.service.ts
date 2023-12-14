'use strict';

import { UserModel } from '../models';
import { User } from '../types';

export const normalize = ({ id, email }: Omit<User, 'name' | 'password'>) => {
  return { id, email };
};

export const findByEmail = (email: string) => {
  return UserModel.findOne({ where: { email } });
};

export const signUp = async (name: string, email: string, password: string) => {
  const existUser = await findByEmail(email);

  if (existUser) {
    throw new Error('this email already exist');
  }

  await UserModel.create({ name, email, password });
};
