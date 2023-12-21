'use strict';

import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import asyncHandler from 'express-async-handler';

export const productsRouter = Router();

productsRouter.get('/new', asyncHandler(productsController.getBrandNew));
productsRouter.get('/discount', asyncHandler(productsController.getHotPrices));
productsRouter.get('/:id/recommended', asyncHandler(productsController.getSuggestedProducts));
productsRouter.get('/:category', asyncHandler(productsController.findAllWithPagination));
productsRouter.get('/favorites/get', asyncHandler(productsController.getFavorites));
