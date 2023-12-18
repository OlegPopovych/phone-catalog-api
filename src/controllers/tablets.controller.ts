'use strict';

import dotenv from 'dotenv';
import * as constants from '../utils/constants';
import {
  ControllerAction,
  QueryParams,
} from '../types';
import * as tabletsService from '../services/tablets.service';
import { parsePhoneData } from '../utils/parsePhoneData';
// import { generateRandomArray } from '../utils/randomGenerator';
import { processQuery } from '../utils/validateQuery';

dotenv.config();
export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;

  try {
    const phone = await tabletsService.getById(id);

    if (!phone) {
      res.sendStatus(404);
      return;
    }

    res.send(parsePhoneData(phone));

  } catch (error) {
    res.sendStatus(500);
  }
};

export const findAllWithPagination: ControllerAction = async (req, res) => {
  const {sort, page, perPage}: QueryParams = req.query;

  const totalElementsInDb = await tabletsService.getCount();

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
    res.redirect(constants.CLIENT_ORIGIN + '/#/phones/');

    return;
  }

  try {
    const {
      count,
      rows,
    } = await tabletsService.findAllWithPagination({
      sortBy,
      selectedPage,
      elementsOnPage,
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
