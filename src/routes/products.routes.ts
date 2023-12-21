'use strict';

import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import asyncHandler from 'express-async-handler';

export const productsRouter = Router();

productsRouter.get('/new', productsController.getBrandNew);
productsRouter.get('/new', productsController.getBrandNew);
productsRouter.get('/discount', asyncHandler(productsController.getHotPrices));
// productsRouter.get('/discount', productsController.getHotPrices);
productsRouter.get('/:id/recommended', asyncHandler(productsController.getSuggestedProducts));
// productsRouter.get('/:id/recommended', productsController.getSuggestedProducts);
productsRouter.get('/:category', productsController.findAllWithPagination);
productsRouter.get('/favorites/get', productsController.getFavorites);
