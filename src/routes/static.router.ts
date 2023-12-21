import { Router } from 'express';
import * as staticController from '../controllers/static.controller';
import asyncHandler from 'express-async-handler';

export const staticRouter = Router();

staticRouter.get('/slider', asyncHandler(staticController.getSliderData));
staticRouter.get('/categories', asyncHandler(staticController.getCategorysData));
