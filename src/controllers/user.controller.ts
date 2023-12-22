'use strict';
import { ControllerAction, User } from '../types';
import * as userService from '../services/user.service';
import { ProductsModel } from '../models';

export const getCart: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const cart = await userService.getCart(userId);

  if(cart === null) {
    res.send(JSON.stringify([]));

    return;
  }

  res.send(cart?.cart);
};

export const updateCart: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const cart = req.body.cart;

  const userCart = await userService.updateCart({
    userId,
    cart,
  });

  res.send(userCart?.cart);
};

export const getFavorites: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;

  const favorites = await userService.getFavorites(userId);

  if(favorites === null) {
    res.send(JSON.stringify([]));

    return;
  }

  res.send(favorites?.favorite);
};

export const updateFavorites: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const favorite = req.body.favorite;

  const favorites = await userService.updateFavorites({
    userId,
    favorite,
  });

  res.send(favorites?.favorite);
};

export const getOrders: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;

  const ordersFromDb = await userService.getOrders(userId);

  const parsedOrders = ordersFromDb.map(el => {
    return {
      id: el.id,
      createdAt: el.createdAt,
      order: JSON.parse(el.order),
    };
  });

  const preparedOrders = [];

  for (const orderItem of parsedOrders) {

    const getData = async () => {
      const prods = [];
      for await (const prod of orderItem.order) {
        const prodData = await ProductsModel.findOne({
          where: {
            itemId: prod.name,
          }
        });

        prods.push({
          quantity: prod.quantity,
          title: prodData?.name,
          color: prodData?.color,
          imageUrl: prodData?.image,
          price: prodData?.price,
          fullPrice: prodData?.fullPrice,
          itemId: prodData?.itemId,
        });
      }
      return prods;
    };

    preparedOrders.push({
      id: orderItem.id,
      createdAt: orderItem.createdAt,
      products: await getData(),
    });
  }

  if(ordersFromDb === null) {
    res.send(JSON.stringify([]));

    return;
  }

  res.send(preparedOrders);
};

export const createOrder: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const order = req.body.order;

  const newOrder = await userService.createOrder({
    userId,
    order,
  });

  res.send(newOrder);
};
