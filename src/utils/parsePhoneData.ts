'use strict';

import { SpecificPhone, SpecificPhoneInDb } from '../types';

export const parsePhoneData = (
  phoneFromDb: SpecificPhoneInDb,
): SpecificPhone => {
  const phone = JSON.parse(phoneFromDb.data);
  console.log(phone);

  return phone;
};
