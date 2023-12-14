'use strict';

import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class UserModel extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({
    type: DataTypes.UUIDV4,
    defaultValue: DataTypes.UUIDV4
  })
    id: string;

  @AllowNull(false)
  @Column({
    defaultValue: DataTypes.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    defaultValue: DataTypes.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    defaultValue: DataTypes.STRING,
  })
    password: string;
}
