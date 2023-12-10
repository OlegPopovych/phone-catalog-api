'use strict'

// import { User } from '../models/User';
import { PhoneModel, SpecificPhoneModel } from '../models';
import { SpecificPhoneInDb } from '../types';

export const findAll = async () => PhoneModel.findAll();

export const getById = async (id: string): Promise<SpecificPhoneInDb | null> => (
  SpecificPhoneModel.findByPk(id)
);