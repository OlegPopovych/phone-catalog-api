'use strict';

import { AccessoriesModel } from '../models';
import { SpecificProductInDb } from '../types';

export const getCount = async () => {
  return AccessoriesModel.count();
};

export const getById = async (id: string): Promise<SpecificProductInDb | null> =>
  AccessoriesModel.findByPk(id);
