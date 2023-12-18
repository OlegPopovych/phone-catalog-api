'use strict';

import { promises as fsPromises } from 'fs';
import path from 'path';
import { ControllerAction } from '../types';
import * as phonesService from '../services/phones.service';
import * as accessoriesService from '../services/accessories.service';
import * as tabletsService from '../services/tablets.service';

export const getSliderData: ControllerAction = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../public/sliderData.json');

    const data = await fsPromises.readFile(filePath, 'utf8');

    const jsonData = JSON.parse(data);

    res.json(jsonData);
  } catch (error) {
    console.error('Помилка:', error);
    res.sendStatus(500);
  }
};

export const getCategorysData: ControllerAction = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../public/categoryData.json');

    const data = await fsPromises.readFile(filePath, 'utf8');

    const phonesCount = await phonesService.getCount();
    const accessoriesCount = await accessoriesService.getCount();
    const tabletsCount = await tabletsService.getCount();

    const itemsInDatabaseTables = {
      phones: phonesCount,
      tablets: tabletsCount,
      accessories: accessoriesCount,
    };

    const tablesData = JSON.parse(data);

    tablesData.phones.total = itemsInDatabaseTables.phones;
    tablesData.tablets.total = itemsInDatabaseTables.tablets;
    tablesData.accessories.total = itemsInDatabaseTables.accessories;

    res.json([
      tablesData.phones,
      tablesData.tablets,
      tablesData.accessories,
    ]);
  } catch (error) {
    console.error('Помилка:', error);
    res.sendStatus(500);
  }
};
