'use strict';

import { UserModel } from '../models';
import { User } from '../types';

export const normalizeData = (user: User) => {
  const { id, email, name } = user;
  return { id, email, name };
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({
    where: {
      email,
    },
  });
};

export const findById = async (id: string): Promise<User | null>  => {
  return UserModel.findOne({
    where: {
      id,
    },
  });
};
