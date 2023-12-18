'use strict';

import dotenv from 'dotenv';

import { ControllerAction } from '../types';
import * as phoneService from '../services/products.service';
// import { parsePhoneData } from '../utils/parsePhoneData';
import { generateRandomArray } from '../utils/randomGenerator';
// import { processQuery } from '../utils/validateQuery';

dotenv.config();

// const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
const PHONES_FOR_COMPONENT = 10;
// const DEFAULT_PER_PAGE = 16;
// const DEFAULT_PAGE = 1;

export const getBrandNew: ControllerAction = async (req, res) => {
  try {
    const phones = await phoneService.getBrandNew({
      count: PHONES_FOR_COMPONENT,
    });

    res.send(phones);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getHotPrices: ControllerAction = async (req, res) => {
  try {
    const phones = await phoneService.getHotPrices({
      count: PHONES_FOR_COMPONENT,
    });

    res.send(phones);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getSuggestedProducts: ControllerAction = async (req, res) => {
  const {id: phoneId} = req.params;

  try {
    const phonesObjectsWithIds = await phoneService.getSuggestedProductsIds(phoneId);
    const ids = phonesObjectsWithIds.map(obj => obj.itemId);

    const randomIndexes = generateRandomArray({size: PHONES_FOR_COMPONENT, to: ids.length - 1});
    const randomIds = randomIndexes.reduce((acc: string[], k) => {
      return acc = [...acc, ids[k]];
    }, []);

    const suggestedProducts = await phoneService.getSuggestedProducts(randomIds);

    res.send(suggestedProducts);
  } catch (error) {
    res.sendStatus(500);
  }
};
