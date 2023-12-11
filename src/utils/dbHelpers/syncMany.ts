'use strict';

import * as fs from 'fs';
import * as path from 'path';
import { SpecificPhoneModel, PhoneModel } from '../../models';
import { sequelize } from '../initDb';
import { phones } from './phonesShortData';

import newPhotoLinks from './links.json';

export const seedPhones = async () => {
  return PhoneModel.bulkCreate(phones);
};

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('База даних синхронізована');
    addPhonesToDB();
  })
  .then(seedPhones)
  .catch((err) => {
    console.error('Помилка синхронізації бази даних:', err);
  });

async function addPhonesToDB() {
  const filesPath = path.join(__dirname, 'phones');

  try {
    const files = fs.readdirSync(filesPath);

    for (const file of files) {
      const filePath = path.join(filesPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      let phone = JSON.parse(fileContent);

      for (const newLinksObj of newPhotoLinks) {
        if (
          newLinksObj.namespaceId === phone.namespaceId &&
          newLinksObj.color === phone.color
        ) {
          phone = {
            ...phone,
            images: newLinksObj.images,
          };
        }
      }

      const phonedata = {
        id: phone.id,
        capacity: phone.capacity,
        color: phone.color,
        data: JSON.stringify(phone),
      };

      await SpecificPhoneModel.create(phonedata);
    }

    console.log('Дані успішно додані у базу даних');
    process.exit(0);
  } catch (err) {
    console.error('Помилка при додаванні даних у базу даних:', err);
    process.exit(1);
  }
}
