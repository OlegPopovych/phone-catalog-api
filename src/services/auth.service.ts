'use strict';

import { UserModel } from '../models';
import { User } from '../types';

export const normalize = ({ id, email, name }: Omit<User, 'password'>) => {
  return { id, email, name };
};

export const signUp = async (name: string, email: string, password: string) => {
  const existedUser = await UserModel.findOne({
    where: {
      email,
    }
  });

  if (existedUser) {
    return existedUser;
  }

  await UserModel.create({ name, email, password });
};
