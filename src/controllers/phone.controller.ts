'use strict';

import { ControllerAction } from '../types';
import * as phoneService from '../services/phone.service';
import { parsePhoneData } from '../utils/parsePhoneData';

export const getAll: ControllerAction = async (req, res) => {
  const phones = await phoneService.findAll();

  console.log(phones);

  res.send(phones);
};

export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;

  const phone = await phoneService.getById(id);

  if (!phone) {
    res.sendStatus(404);
    return;
  }

  res.send(parsePhoneData(phone));
};
