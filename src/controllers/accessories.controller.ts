'use strict';

import dotenv from 'dotenv';
import {
  ControllerAction,
} from '../types';
import * as accessoriesService from '../services/accessories.service';
import { parsePhoneData } from '../utils/normaliseData';

dotenv.config();

export const getOneById: ControllerAction = async (req, res) => {
  const { id } = req.params;

  try {
    const phone = await accessoriesService.getById(id);

    if (!phone) {
      res.sendStatus(404);
      return;
    }

    res.send(parsePhoneData(phone));

  } catch (error) {
    res.sendStatus(500);
  }
};
