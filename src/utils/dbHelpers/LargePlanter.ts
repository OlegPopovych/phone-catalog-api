'use strict';

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

import initialProducts from './initial_data/products.json';

import accessoriesLinks from './initial_data/accessoriesLinks.json';
import accessories from './initial_data/accessories.json';

import phonesLinks from './initial_data/phonesLinks.json';
import phones from './initial_data/phones.json';

import tabletsLinks from './initial_data/tabletsLinks.json';
import tablets from './initial_data/tablets.json';
import { AccessoriesModel, PhoneModel, ProductsModel, TabletModel } from '../../models';

const phonesNew: {namespaceId: string; color: string; images: string}[] = [];
const accessoriesNew: {namespaceId: string; color: string; images: string}[] = [];
const tabletsNew: {namespaceId: string; color: string; images: string}[] = [];

const productsPrepared: {image: string, color: string}[] = [];

const magreLinks = (
  initials: any,
  newLinks: any[],
  arr: any[],
) => {
  for (let elem of initials) {

    for (const newLinksObj of newLinks) {
      if (
        newLinksObj.namespaceId === elem.namespaceId &&
				newLinksObj.color === elem.color
      ) {
        elem = {
          id: elem.id,
          capacity: elem.capacity,
          color: elem.color,
          data: JSON.stringify({
            ...elem,
            images: newLinksObj.images,
          }),
        };
        arr.push(elem);
      }
    }
  }
};

magreLinks(accessories, accessoriesLinks, accessoriesNew);
magreLinks(phones, phonesLinks, phonesNew);
magreLinks(tablets, tabletsLinks, tabletsNew);

const applyNewLinksToProducts = (
  products: {image: string, color: string}[],
  links: {namespaceId: string, color: string, images: string[]}[],
  arr: {image: string, color: string}[],
) => {
  for (const prod of products) {
    for (const link of links) {
      if (prod.image.includes(`/${link.namespaceId}/${link.color}`)) {
        arr.push({
          ...prod,
          image: link.images[0]
        });
      }
    }
  }
};

applyNewLinksToProducts(initialProducts, accessoriesLinks, productsPrepared);
applyNewLinksToProducts(initialProducts, phonesLinks, productsPrepared);
applyNewLinksToProducts(initialProducts, tabletsLinks, productsPrepared);

const DB_URI = process.env.DB_URI;

console.log(DB_URI);

export const sequelize = new Sequelize(DB_URI ?? '', {
  models: [
    AccessoriesModel,
    ProductsModel,
    PhoneModel,
    TabletModel,
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

connect();

export const seedPhones = async () => { //seed pruducts!!!
  return PhoneModel.bulkCreate(phonesNew);
};
export const seedAccessories = async () => { //seed pruducts!!!
  return AccessoriesModel.bulkCreate(accessoriesNew);
};
export const seedTablet = async () => { //seed pruducts!!!
  return TabletModel.bulkCreate(tabletsNew);
};
export const seedProducts = async () => { //seed pruducts!!!
  return ProductsModel.bulkCreate(productsPrepared);
};

sequelize
  .sync(
    { force: true }
  )
  .then(() => {
    seedPhones();
    console.log(`${phonesNew.length} Телефонів засіяно!`);
  })
  .then(() => {
    seedAccessories();
    console.log(`${accessoriesNew.length} Аксесуарів засіяно!`);
  })
  .then(() => {
    seedTablet();
    console.log(`${tabletsNew.length} Планшетів засіяно!`);
  })
  .then(() => {
    seedProducts();
    console.log(`${productsPrepared.length} Товарів засіяно!`);
  })
  .catch((err) => {
    console.error('Сіяло зламалось!!!:', err);
  });
