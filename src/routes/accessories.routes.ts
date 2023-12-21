'use strict';

import { Router } from 'express';
import * as accessoriesController from '../controllers/accessories.controller';
import asyncHandler from 'express-async-handler';

export const accessoriesRouter = Router();

accessoriesRouter.get('/:id', asyncHandler(accessoriesController.getOneById));
