'use strict';

import dotenv from 'dotenv';

import { ControllerAction, QueryParams } from '../types';
import * as productsService from '../services/products.service';
import { generateRandomArray } from '../utils/randomGenerator';
import { validateQuery } from '../utils/validateQuery';
import * as constants from '../utils/constants';

dotenv.config();

const PRODUCTS_FOR_COMPONENT = 10;

export const getBrandNew: ControllerAction = async (req, res) => {
  const products = await productsService.getBrandNew({
    count: PRODUCTS_FOR_COMPONENT,
  });

  res.send(products);
};

export const getHotPrices: ControllerAction = async (req, res) => {
  const products = await productsService.getHotPrices({
    count: PRODUCTS_FOR_COMPONENT,
  });

  res.send(products);
};

export const getSuggestedProducts: ControllerAction = async (req, res) => {
  const {id: itemId} = req.params;

  const productsObjectsWithIds = await productsService.getSuggestedProductsIds(itemId);
  const ids = productsObjectsWithIds.map(obj => obj.itemId);

  const randomIndexes = generateRandomArray({size: PRODUCTS_FOR_COMPONENT, to: ids.length - 1});
  const randomIds = randomIndexes.reduce((acc: string[], k) => {
    return acc = [...acc, ids[k]];
  }, []);

  const suggestedProducts = await productsService.getByItemId(randomIds);
  res.send(suggestedProducts);
};

export const findAllWithPagination: ControllerAction = async (req, res) => {
  const {sort, page, perPage}: QueryParams = req.query;
  const {category} = req.params;

  const totalElementsInDb = await productsService.countByCatecory(category);

  const {
    orderBy,
    shouldRedirect,
    sortBy,
    elementsOnPage,
    selectedPage,
    maxPages,
  } = validateQuery({
    sort,
    page,
    perPage,
    totalElementsInDb,
    DEFAULT_PER_PAGE: constants.DEFAULT_PER_PAGE,
    DEFAULT_PAGE: constants.DEFAULT_PAGE,
  });

  if (shouldRedirect) {
    res.redirect(constants.CLIENT_ORIGIN + '/#/');

    return;
  }

  const {
    count,
    rows,
  } = await productsService.findAllWithPagination({
    orderBy,
    sortBy,
    selectedPage,
    elementsOnPage,
    category,
  });

  res.send({
    info:{
      selectedPage,
      perPage: elementsOnPage,
      recordsOnPage: rows.length,
      totalPages: maxPages,
      totalRecords: count,
    },
    records: rows,
  });
};

export const getFavorites: ControllerAction = async (req, res) => {
  try {
    const {itemsIds}: {itemsIds?: string} = req.query;

    if (!itemsIds) {
      return res.sendStatus(400);
    }

    const prods = await productsService.getByItemId(JSON.parse(itemsIds));

    res.send(prods);
  } catch (error) {
    res.sendStatus(500);
  }
};
