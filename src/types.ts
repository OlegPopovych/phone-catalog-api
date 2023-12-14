'use strict';

import { Request, Response } from 'express';

export interface PhoneModel {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface SpecificPhoneInDb {
  id: string;
  capacity: string;
  color: string;
  data: string;
}

export interface SpecificPhone {
  id: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Description[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

type Description = {
  title: string;
  text: string[];
};

export type ControllerAction = (req: Request, res: Response) => void;

export interface QueryParams {
  sort?: string;
  page?: string;
  perPage?: string;
}

export interface QueryParamsProcess {

	sort?: string;
  page?: string;
  perPage?: string;
  totalElementsInDb: number;
  DEFAULT_PER_PAGE: number;
  DEFAULT_PAGE: number;
}
