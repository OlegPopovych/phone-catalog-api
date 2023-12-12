'use strict';

import { PhoneModel, SpecificPhoneModel } from '../models';
import { SpecificPhoneInDb } from '../types';

export const findAll = async () => PhoneModel.findAll();

export const getById = async (id: string): Promise<SpecificPhoneInDb | null> =>
  SpecificPhoneModel.findByPk(id);

export const getCount = () => {
  return PhoneModel.count();
};

type PaginationParams = {
  sotrBy: string;
  selectedPage: number;
  elementsOnPage: number;
};

export const findAllWithPagination = async ({
  sotrBy,
  selectedPage,
  elementsOnPage,
}: PaginationParams) => {

  const offset = (selectedPage - 1) * elementsOnPage;

  const { count, rows } = await PhoneModel.findAndCountAll({
    order: [[`${(sotrBy)}`, 'ASC']],
    offset,
    limit: Number(elementsOnPage),
  });

  return {
    count,
    rows,
  };
};
