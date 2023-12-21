'use strict';

import { Router } from 'express';
import * as tabletsController from '../controllers/tablets.controller';
import asyncHandler from 'express-async-handler';

export const tabletsRouter = Router();

tabletsRouter.get('/:id', asyncHandler(tabletsController.getOneById));
