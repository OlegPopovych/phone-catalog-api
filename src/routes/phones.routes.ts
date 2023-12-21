'use strict';

import { Router } from 'express';
import * as phonesController from '../controllers/phones.controller';
import asyncHandler from 'express-async-handler';

export const phonesRouter = Router();

phonesRouter.get('/:id', asyncHandler(phonesController.getOneById));
