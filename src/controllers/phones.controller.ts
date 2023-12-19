'use strict';

import dotenv from 'dotenv';
// import * as constants from '../utils/constants';

import {
  ControllerAction,
  // QueryParams,
} from '../types';
import * as phonesService from '../services/phones.service';
// import { processQuery } from '../utils/validateQuery';
import { parsePhoneData } from '../utils/normaliseData';
// import { countByCatecory } from '../services/products.service';

dotenv.config();

export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;

  try {
    const phone = await phonesService.getById(id);

    if (!phone) {
      res.sendStatus(404);
      return;
    }

    res.send(parsePhoneData(phone));

  } catch (error) {
    res.sendStatus(500);
  }
};

// export const findAllWithPagination: ControllerAction = async (req, res) => {
//   const {sort, page, perPage}: QueryParams = req.query;

//   // const totalElementsInDb = await phonesService.getCount();

//   const totalElementsInDb = await countByCatecory('phones');

//   const {
//     shouldRedirect,
//     sortBy,
//     elementsOnPage,
//     selectedPage,
//     maxPages,
//   } = processQuery({
//     sort,
//     page,
//     perPage,
//     totalElementsInDb,
//     DEFAULT_PER_PAGE: constants.DEFAULT_PER_PAGE,
//     DEFAULT_PAGE: constants.DEFAULT_PAGE,
//   });

//   if (shouldRedirect) {
//     res.redirect(constants.CLIENT_ORIGIN + '/#/');

//     return;
//   }

//   try {
//     const {
//       count,
//       rows,
//     } = await phonesService.findAllWithPagination({
//       sortBy,
//       selectedPage,
//       elementsOnPage,
//     });

//     res.send({
//       info:{
//         selectedPage,
//         perPage: elementsOnPage,
//         recordsOnPage: rows.length,
//         totalPages: maxPages,
//         totalRecords: count,
//       },
//       records: rows.map(row => parsePhoneData(row)),
//     });
//   } catch (error) {
//     res.sendStatus(500);
//   }
// };
