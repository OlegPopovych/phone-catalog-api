'use strict';

import { Router } from 'express';
import * as phoneController from '../controllers/phone.controller';

export const phoneRouter = Router();

phoneRouter.get('/', phoneController.findAllWithPagination);
phoneRouter.get('/:id', phoneController.getOneById);
phoneRouter.get('/new', phoneController.getBrandNew);
phoneRouter.get('/discount', phoneController.getHotPrices);
phoneRouter.get('/:id/recommended', phoneController.getSuggestedProducts);
