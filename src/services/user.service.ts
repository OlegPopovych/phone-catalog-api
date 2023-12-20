'use strict';

import { CartModel, FavoriteModel, OrderModel, UserModel } from '../models';
import { User } from '../types';

export const normalizeData = (user: User) => {
  const { id, email, name } = user;
  return { id, email, name };
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return UserModel.findOne({
    where: {
      email,
    },
  });
};

export const findById = async(userId: string): Promise<User | null>  => {
  return UserModel.findOne({
    where: {
      id: userId,
    },
  });
};

export const getFavorites = async(userId: string) => {
  return await FavoriteModel.findOne({
    where: {
      userId,
    },
  });
};

export const updateFavorites = async({userId, favorite}: {userId: string, favorite: string}) => {
  try {
    const [data, created] = await FavoriteModel.findOrCreate({
      where: { userId },
      defaults: { favorite: JSON.stringify(favorite) },
    });

    if (!created) {
      data.favorite = JSON.stringify(favorite);
      await data.save();
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getCart = async(userId: string) => {
  return CartModel.findOne({
    where: {
      userId,
    },
  });
};

export const updateCart = async({userId, cart}: {userId: string, cart: string}) => {
  try {
    const [data, created] = await CartModel.findOrCreate({
      where: { userId },
      defaults: { cart: JSON.stringify(cart) },
    });

    if (!created) {
      data.cart = JSON.stringify(cart);
      await data.save();
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getOrders = async(userId: string) => {
  return OrderModel.findAll({
    where: {
      userId,
    },
  });
};

export const createOrder = async({userId, order}: {userId: string, order: string}) => {
  return OrderModel.create({
    order,
    userId,
  });
};
