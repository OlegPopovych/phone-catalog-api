'use strict';

import { Router } from 'express';
import * as tabletsController from '../controllers/tablets.controller';

export const tabletsRouter = Router();

tabletsRouter.get('/:id', tabletsController.getOneById);
