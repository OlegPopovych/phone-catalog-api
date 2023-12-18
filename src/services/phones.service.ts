'use strict';

import { PhoneModel } from '../models/newModels/PhoneModel';
import { SpecificProductInDb } from '../types';

export const getCount = async () => {
  return PhoneModel.count();
};

type PaginationParams = {
  sortBy: string;
  selectedPage: number;
  elementsOnPage: number;
};

export const findAllWithPagination = async ({
  sortBy,
  selectedPage,
  elementsOnPage,
}: PaginationParams) => {

  const offset = (selectedPage - 1) * elementsOnPage;

  const { count, rows } = await PhoneModel.findAndCountAll({
    order: [[`${(sortBy)}`, 'ASC']],
    offset,
    limit: Number(elementsOnPage),
  });

  return {
    count,
    rows,
  };
};

export const getById = async (id: string): Promise<SpecificProductInDb | null> =>
  PhoneModel.findByPk(id);
