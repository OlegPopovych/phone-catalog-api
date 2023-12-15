import { Router } from 'express';
import * as staticController from '../controllers/static.controller';

export const staticRouter = Router();

staticRouter.get('/slider', staticController.getSliderData);
staticRouter.get('/categories', staticController.getCategorysData);
