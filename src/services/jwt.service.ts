'use strict';

import jwt from 'jsonwebtoken';

let jwt_key = '';

if(process.env.JWT_KEY !== undefined) {
  jwt_key = process.env.JWT_KEY;
}

export const sign = (user: any) => {
  const token = jwt.sign(user, jwt_key);

  return token;
};

export const verift = (token: any) => {
  try {
    return jwt.verify(token, jwt_key);
  } catch(error) {
    return null;
  }
};
