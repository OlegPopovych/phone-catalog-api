'use strict';

import { Router } from 'express';
import * as productsController from '../controllers/products.controller';

export const productsRouter = Router();

productsRouter.get('/new', productsController.getBrandNew);
productsRouter.get('/discount', productsController.getHotPrices);
productsRouter.get('/:id/recommended', productsController.getSuggestedProducts);
productsRouter.get('/:category', productsController.findAllWithPagination);
productsRouter.get('/favorites/get', productsController.getFavorites);
