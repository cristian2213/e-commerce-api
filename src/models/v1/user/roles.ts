import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from '../../../config/v1/db/databae.config';
import { Roles } from '../../../helpers/v1/roles/roles';

const Role = dbConnection.define(
  'Role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.ENUM,
      values: Object.values(Roles),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

export default Role;
