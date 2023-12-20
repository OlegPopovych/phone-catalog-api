'use strict';

import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'phones',
})
export class PhoneModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column
    id: string;

  @Column
    capacity: string;

  @Column
    color: string;

  @Column(DataType.JSONB)
    data: any;
}
