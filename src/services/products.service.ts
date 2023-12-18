'use strict';

import { Op } from 'sequelize';
import { ProductsModel } from '../models/newModels/ProductsModel';

export const getBrandNew = async ({ count }: { count:number }) => await ProductsModel.findAndCountAll({
  order: [['fullPrice', 'DESC']],
  offset: 0,
  limit: count,
});

export const getHotPrices = async ({ count }: { count:number }) => await ProductsModel.findAndCountAll({
  order: [['price', 'DESC']],
  offset: 0,
  limit: count,
});

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

export const getSuggestedProducts = async (ids: string[]) => {
  const prods =await ProductsModel.findAll({
    where: {
      itemId: {
        [Op.in]: ids,
      },
    },
  });

  return prods;
};
