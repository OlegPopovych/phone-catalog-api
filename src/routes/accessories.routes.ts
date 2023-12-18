'use strict';

import { Router } from 'express';
import * as accessoriesController from '../controllers/accessories.controller';

export const accessoriesRouter = Router();

accessoriesRouter.get('/', accessoriesController.findAllWithPagination);
accessoriesRouter.get('/:id', accessoriesController.getOneById);
