'use strict';

import { UserModel } from '../models';
import { User } from '../types';
import { sequelize } from '../utils/initDb';

export const normalize = ({ id, email, name }: Omit<User, 'password'>) => {
  return { id, email, name };
};

export const findByEmail = (email: string) => {
  return UserModel.findOne({ where: { email } });
};

export const signUp = async (name: string, email: string, password: string) => {

  await sequelize.sync().then(() => {
    console.log('Database synchronized successfully.');
  }).catch((error) => {
    console.error('Error during synchronization:', error);
  });

  await UserModel.create({ name, email, password });
};
