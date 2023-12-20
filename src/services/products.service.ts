'use strict';

import { Op } from 'sequelize';
import { ProductsModel } from '../models/newModels/ProductsModel';
import { normalizeProductsData } from '../utils/normaliseData';

export const getBrandNew = async ({ count }: { count:number }) => {
  const prods = await ProductsModel.findAndCountAll({
    order: [['fullPrice', 'DESC']],
    offset: 0,
    limit: count,
  });

  return {
    info: {
      count: prods.count,
    },
    records: prods.rows.map(prod => normalizeProductsData(prod)),
  };
};

export const getHotPrices = async ({ count }: { count:number }) => {
  const prods = await ProductsModel.findAndCountAll({
    order: [['price', 'DESC']],
    offset: 0,
    limit: count,
  });

  return {
    info: {
      count: prods.count,
    },
    records: prods.rows.map(prod => normalizeProductsData(prod)),
  };
};

export const getSuggestedProductsIds = async (itemId: string) => {
  const ids = await ProductsModel.findAll({
    attributes: ['itemId'],
    where: {
      id: {
        [Op.notIn]: [itemId],
      },
    },
  });

  return ids;
};

export const countByCatecory = async (category: string) => {
  const count = await ProductsModel.count({
    where: {
      category,
    }
  });

  return count;
};

type PaginationParams = {
	orderBy: string;
  sortBy: string;
  selectedPage: number;
  elementsOnPage: number;
	category: string;
};

export const findAllWithPagination = async ({
  orderBy,
  sortBy,
  selectedPage,
  elementsOnPage,
  category,
}: PaginationParams) => {

  const offset = (selectedPage - 1) * elementsOnPage;

  const { count, rows } = await ProductsModel.findAndCountAll({
    where: {
      category,
    },
    order: [[`${(sortBy)}`, orderBy]],
    offset,
    limit: Number(elementsOnPage),
  });

  return {
    count,
    rows: rows.map(prod => normalizeProductsData(prod)),
  };
};

export const getByItemId = async (ids: string[]) => {
  const prods = await ProductsModel.findAll({
    where: {
      itemId: {
        [Op.in]: ids,
      },
    },
  });

  return prods.map(prod => normalizeProductsData(prod));
};
