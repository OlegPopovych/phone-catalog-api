'use strict';

import dotenv from 'dotenv';

import {
  ControllerAction,
} from '../types';
import * as phonesService from '../services/phones.service';
import { parsePhoneData } from '../utils/normaliseData';

dotenv.config();

export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;
  const phone = await phonesService.getById(id);

  if (!phone) {
    res.sendStatus(404);
    return;
  }

  res.send(parsePhoneData(phone));
};
