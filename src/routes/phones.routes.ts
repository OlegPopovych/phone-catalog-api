'use strict';

import { Router } from 'express';
import * as phonesController from '../controllers/phones.controller';

export const phonesRouter = Router();

phonesRouter.get('/:id', phonesController.getOneById);
