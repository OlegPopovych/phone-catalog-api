import { Sequelize } from 'sequelize-typescript';
import { AccessoriesModel } from '../models/newModels/AccessoriesModel';
import { ProductsModel } from '../models/newModels/ProductsModel';
import { PhoneModel } from '../models/newModels/PhoneModel';
import { TabletModel } from '../models/newModels/TabletModel';
// import { PhoneModel, SpecificPhoneModel, UserModel } from '../models';

const DB_URI = process.env.DB_URI;

// export const sequelize = new Sequelize(DB_URI ?? '', {
//   models: [PhoneModel, SpecificPhoneModel, UserModel],
// });

export const sequelize = new Sequelize(DB_URI ?? '', {
  models: [AccessoriesModel, ProductsModel, PhoneModel, TabletModel],
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('🤖 Data source found captain! 🤖');
  } catch (error) {
    console.error('☠️☠️☠️Unable to connect to the database:', error);
  }
};
