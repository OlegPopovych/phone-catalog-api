'use strict';

import dotenv from 'dotenv';

import { ControllerAction, QueryParams } from '../types';
import * as phoneService from '../services/phone.service';
import { parsePhoneData } from '../utils/parsePhoneData';
import { SortType } from '../emuns';

dotenv.config();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

export const getAll: ControllerAction = async (req, res) => {
  const phones = await phoneService.findAll();

  res.send(phones);
};

export const findAllWithPagination: ControllerAction = async (req, res) => {
  const {sort, page, perPage}: QueryParams = req.query;

  const totalElementsInDb = await phoneService.getCount();

  let sotrBy = 'id';

  if (sort === SortType.age) {
    sotrBy = 'year';
  }
  if (sort === SortType.title) {
    sotrBy = 'name';
  }
  if (sort === SortType.price) {
    sotrBy = 'price';
  }

  let elementsOnPage = Number(perPage);
  let selectedPage = Number(page);

  if (perPage === undefined || Number(perPage) > totalElementsInDb) {
    elementsOnPage = totalElementsInDb;
  }

  const maxPages = Math.ceil(totalElementsInDb / elementsOnPage);

  if (page === undefined) {
    selectedPage = 1;
  }

  if (Number(page) > maxPages) {

    res.redirect(CLIENT_ORIGIN + '/#/phones/');

    return;
  }

  try {
    const {
      count,
      rows,
    } = await phoneService.findAllWithPagination({
      sotrBy,
      selectedPage,
      elementsOnPage,
    });

    res.send({
      page,
      perPage: elementsOnPage,
      recordsOnPage: rows.length,
      totalPages: maxPages,
      totalRecords: count,
      records: rows,
    });
  } catch (error) {
    res.sendStatus(500);
  }

};

export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;

  try {
    const phone = await phoneService.getById(id);

    if (!phone) {
      res.sendStatus(404);
      return;
    }

    res.send(parsePhoneData(phone));

  } catch (error) {
    res.sendStatus(500);
  }
};
