'use strict';

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { SpecificPhoneModel } from './SpecificPhoneModel';

@Table({
  tableName: 'phoneshortdata',
})
export class PhoneModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column
    id: string;

  @Column
    category: string;

  @ForeignKey(() => SpecificPhoneModel)
  @Column
    phoneId: string;

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
