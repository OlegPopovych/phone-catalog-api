'use strict';

import { Op } from 'sequelize';
import { PhoneModel, SpecificPhoneModel } from '../models';
import { SpecificPhoneInDb } from '../types';

export const getBrandNew = async ({ count }: { count:number }) => await PhoneModel.findAndCountAll({
  order: [['fullPrice', 'DESC']],
  offset: 0,
  limit: count,
});

export const getHotPrices = async ({ count }: { count:number }) => await PhoneModel.findAndCountAll({
  order: [['price', 'DESC']],
  offset: 0,
  limit: count,
});

export const getSuggestedProductsIds = async (id: string) => {
  const ids = await PhoneModel.findAll({
    attributes: ['id'],
    where: {
      id: {
        [Op.notIn]: [id],
      },
    },
  });

  return ids;
};

export const getSuggestedProducts = async (ids: string[]) => {
  const phones =await PhoneModel.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });

  return phones;
};

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
