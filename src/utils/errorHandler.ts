'use strict';

import { Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);

  if (err.message) {
    res.sendStatus(500);
  }
};
