'use strict';

import { Request, Response } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);

  // Повертаємо клієнту відповідь з кодом помилки та повідомленням
  res.status(500).send('Something went wrong!');
};
