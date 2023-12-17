'use strict';
import { ControllerAction, User } from '../types';
import * as userService from '../services/user.service';

export const getCart: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  try {
    const cart = await userService.getCart(userId);

    if(cart === null) {
      res.send(JSON.stringify([]));
    }

    res.send(cart?.cart);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateCart: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const cart = req.body.cart;

  try {
    const userCart = await userService.updateCart({
      userId,
      cart,
    });

    res.send(userCart?.cart);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getFavorites: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;

  try {
    const favorites = await userService.getFavorites(userId);

    if(favorites === null) {
      res.send(JSON.stringify([]));
    }

    res.send(favorites?.favorite);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const updateFavorites: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const favorite = req.body.favorite;

  try {
    const favorites = await userService.updateFavorites({
      userId,
      favorite,
    });

    res.send(favorites?.favorite);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getOrders: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;

  try {
    const orders = await userService.getOrders(userId);

    if(orders === null) {
      res.send(JSON.stringify([]));
    }

    res.send(orders);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const createOrder: ControllerAction = async (req, res) => {
  const userId = (req.user as User).id;
  const order = req.body.favorite;

  try {
    const favorites = await userService.createOrder({
      userId,
      order,
    });

    res.send(favorites);
  } catch (error) {
    res.sendStatus(500);
  }
};
