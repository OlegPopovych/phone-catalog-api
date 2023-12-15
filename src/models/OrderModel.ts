'use strict';

import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  DataType,
  Default,
} from 'sequelize-typescript';
import { UserModel } from './UserModel';

@Table({
  tableName: 'orders',
})
export class OrderModel extends Model {
  @PrimaryKey
  @AllowNull(false)
	@Default(DataTypes.UUIDV4)
  @Column({
    type: DataTypes.UUID,
  })
    id: string;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column
    userId: string;

  @AllowNull(false)
  @Column(DataType.JSONB)
    order: any;
}
