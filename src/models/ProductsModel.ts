'use strict';

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { TabletModel } from './TabletModel';
import { AccessoriesModel } from './AccessoriesModel';
import { PhoneModel } from './PhoneModel';

@Table({
  tableName: 'products',
})
export class ProductsModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column
    id: string;

  @Column
    category: string;

  @ForeignKey(() => TabletModel)
  @ForeignKey(() => PhoneModel)
  @ForeignKey(() => AccessoriesModel)
  @Column
    itemId: string;

  @Column
    name: string;

  @Column
    fullPrice: number;

  @Column
    price: number;

  @Column
    screen: string;

  @Column
    capacity: string;

  @Column
    color: string;

  @Column
    ram: string;

  @Column
    year: number;

  @Column
    image: string;
}
