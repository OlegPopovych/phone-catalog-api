'use strict';

import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const signInSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
});
const signUpSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
});

export const ValidateFieldsSingUp = (req: Request, res: Response, next: NextFunction) => {
  const { error } = signUpSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const ValidateFieldsLogIn = (req: Request, res: Response, next: NextFunction) => {
  const { error } = signInSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
