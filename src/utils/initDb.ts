import { Sequelize } from 'sequelize-typescript';
import { PhoneModel, SpecificPhoneModel } from '../models';

const DB_URI =
  'postgres://phone_catalog_user:XC4mGK3s8a7n2kERfSHZ1IBJKBVugaAb@dpg-clqvkmhjvg7s73ebdj90-a.frankfurt-postgres.render.com/phone_catalog?ssl=true';

export const sequelize = new Sequelize(DB_URI ?? '', {
  models: [PhoneModel, SpecificPhoneModel],
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('🤖 Data source found captain! 🤖');
  } catch (error) {
    console.error('☠️☠️☠️Unable to connect to the database:', error);
  }
};
