'use strict';

import dotenv from 'dotenv';
import {
  ControllerAction,
} from '../types';
import * as tabletsService from '../services/tablets.service';
import { parsePhoneData } from '../utils/normaliseData';

dotenv.config();
export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;

  const phone = await tabletsService.getById(id);

  if (!phone) {
    res.sendStatus(404);
    return;
  }

  res.send(parsePhoneData(phone));
};
