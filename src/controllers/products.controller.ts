'use strict';

import dotenv from 'dotenv';

import { ControllerAction, QueryParams } from '../types';
import * as productsService from '../services/products.service';
import { generateRandomArray } from '../utils/randomGenerator';
import { processQuery } from '../utils/validateQuery';
import * as constants from '../utils/constants';

dotenv.config();

const PRODUCTS_FOR_COMPONENT = 10;

export const getBrandNew: ControllerAction = async (req, res) => {
  try {
    const products = await productsService.getBrandNew({
      count: PRODUCTS_FOR_COMPONENT,
    });

    res.send(products);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getHotPrices: ControllerAction = async (req, res) => {
  try {
    const products = await productsService.getHotPrices({
      count: PRODUCTS_FOR_COMPONENT,
    });

    res.send(products);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getSuggestedProducts: ControllerAction = async (req, res) => {
  const {id: itemId} = req.params;

  try {
    const productsObjectsWithIds = await productsService.getSuggestedProductsIds(itemId);
    const ids = productsObjectsWithIds.map(obj => obj.itemId);

    const randomIndexes = generateRandomArray({size: PRODUCTS_FOR_COMPONENT, to: ids.length - 1});
    const randomIds = randomIndexes.reduce((acc: string[], k) => {
      return acc = [...acc, ids[k]];
    }, []);

    const suggestedProducts = await productsService.getSuggestedProducts(randomIds);

    res.send(suggestedProducts);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const findAllWithPagination: ControllerAction = async (req, res) => {
  const {sort, page, perPage}: QueryParams = req.query;
  const {category} = req.params;

  // const totalElementsInDb = await phonesService.getCount();

  const totalElementsInDb = await productsService.countByCatecory('phones');

  const {
    shouldRedirect,
    sortBy,
    elementsOnPage,
    selectedPage,
    maxPages,
  } = processQuery({
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

  try {
    const {
      count,
      rows,
    } = await productsService.findAllWithPagination({
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
  } catch (error) {
    res.sendStatus(500);
  }
};
