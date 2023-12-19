'use strict';

import { Product } from '../types';
import { SpecificProduct, SpecificProductInDb } from '../types';

export const parsePhoneData = (
  phoneFromDb: SpecificProductInDb,
): SpecificProduct => {
  const phone = JSON.parse(phoneFromDb.data);

  return phone;
};

export const normalizeProductsData = (product: Product) => {
  const {
    id,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    color,
    ram,
    year,
    image, } = product;
  return { id,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    color,
    ram,
    year,
    image, };
};

export const normalizeSpecificData = (product: SpecificProduct) => {
  const {
    id,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = product;
  return {
    id,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  };
};
