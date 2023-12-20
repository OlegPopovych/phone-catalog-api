'use strict';

import { PhoneModel } from '../models';
import { SpecificProductInDb } from '../types';

export const getCount = async () => {
  return PhoneModel.count();
};

export const getById = async (id: string): Promise<SpecificProductInDb | null> =>
  PhoneModel.findByPk(id);
