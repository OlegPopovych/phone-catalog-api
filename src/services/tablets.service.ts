'use strict';

import { TabletModel } from '../models';
import { SpecificProductInDb } from '../types';

export const getCount = async () => {
  return TabletModel.count();
};

export const getById = async (id: string): Promise<SpecificProductInDb | null> =>
  TabletModel.findByPk(id);
