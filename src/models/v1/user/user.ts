import { options } from './../../../config/v1/swagger/swagger.config';
import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from '../../../config/v1/db/databae.config';
import argon2 from 'argon2';
import Role from './roles';
// We recommend you declare an interface for the attributes, for stricter typechecking
const User = dbConnection.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: 'Allowed name length 2 to 255 characters',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Please, add a valid email',
        },
        max: {
          args: [60],
          msg: 'Only allow 60 characters',
        },
        notEmpty: true,
      },
    },

    password: {
      // constrains
      type: DataTypes.STRING,
      allowNull: false,
      // validation
      validate: {
        notEmpty: {
          msg: 'The password is required',
        },
        len: {
          args: [8, 150],
          msg: 'Allowed password length 8 to 60 characters',
        },
      },
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      comment: 'Field to verify is the users has an account',
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
      comment: 'Field to add verification token',
    },
    tokenExpiration: {
      type: DataTypes.DATE,
      defaultValue: null,
      comment: 'Field to set the limit time for token',
    },
  },
  {
    hooks: {
      async beforeCreate(user: any) {
        const hash = await argon2.hash(user.password);
        user.password = hash;
      },
    },
    paranoid: true,
  }
);

// 1:n
User.hasMany(Role, { sourceKey: 'id', foreignKey: 'userId', as: 'roles' });
Role.belongsTo(User, { foreignKey: 'userId' });

export default User;
