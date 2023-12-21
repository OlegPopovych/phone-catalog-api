'use strict';
import { ControllerAction, User } from '../types';
import * as userService from '../services/user.service';
import { ProductsModel } from '../models';

export const getCart: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  // try {
  const cart = await userService.getCart(userId);

  if(cart === null) {
    res.send(JSON.stringify([]));

    return;
  }

  res.send(cart?.cart);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

export const updateCart: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const cart = req.body.cart;

  // try {
  const userCart = await userService.updateCart({
    userId,
    cart,
  });

  res.send(userCart?.cart);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

export const getFavorites: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;

  // try {
  const favorites = await userService.getFavorites(userId);

  if(favorites === null) {
    res.send(JSON.stringify([]));

    return;
  }

  res.send(favorites?.favorite);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

export const updateFavorites: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const favorite = req.body.favorite;

  // try {
  const favorites = await userService.updateFavorites({
    userId,
    favorite,
  });

  res.send(favorites?.favorite);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

export const getOrders: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;

  // try {
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

  console.log(preparedOrders);

  if(ordersFromDb === null) {
    res.send(JSON.stringify([]));

    return;
  }

  res.send(preparedOrders);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

export const createOrder: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const order = req.body.order;

  // try {
  const newOrder = await userService.createOrder({
    userId,
    order,
  });

  res.send(newOrder);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

// [
// 	{
// 		createdAt,
// 		products: [
// 			{
// 				name,
// 				count,
// 				img,
// 			}
// 		]
// 	}
// ]
