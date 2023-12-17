import { Sequelize } from 'sequelize-typescript';
import { PhoneModel, SpecificPhoneModel, UserModel } from '../models';
import { FavoriteModel } from '../models/FavoriteModel';
import { CartModel } from '../models/CartModel';
import { OrderModel } from '../models/OrderModel';

const DB_URI = process.env.DB_URI;

export const sequelize = new Sequelize(DB_URI ?? '', {
  models: [
    PhoneModel,
    SpecificPhoneModel,
    UserModel,
    FavoriteModel,
    CartModel,
    OrderModel,
  ],
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('🤖 Data source found captain! 🤖');
  } catch (error) {
    console.error('☠️☠️☠️Unable to connect to the database:', error);
  }
};
