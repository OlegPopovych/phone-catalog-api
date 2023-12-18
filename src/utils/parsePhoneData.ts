'use strict';

import { SpecificProduct, SpecificProductInDb } from '../types';

export const parsePhoneData = (
  phoneFromDb: SpecificProductInDb,
): SpecificProduct => {
  const phone = JSON.parse(phoneFromDb.data);
  console.log(phone);

  return phone;
};
