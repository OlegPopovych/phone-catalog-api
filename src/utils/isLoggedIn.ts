'use strict';

import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    user_in_req: req.user
  });
  req.user ? next() : res.sendStatus(401);
};
