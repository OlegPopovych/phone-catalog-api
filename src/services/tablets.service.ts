'use strict';

import { TabletModel } from '../models/newModels/TabletModel';
import { SpecificProductInDb } from '../types';

export const getCount = async () => {
  return TabletModel.count();
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

  const { count, rows } = await TabletModel.findAndCountAll({
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
  TabletModel.findByPk(id);
