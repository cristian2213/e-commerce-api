import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from '../../../config/v1/db/databae.config';
import argon2 from 'argon2';
import Role from './roles';
import Product from '../products/product';
import Log from '../logs/log';

// UserAttributes defines all the possible attributes of our model
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  emailVerifiedAt: Date;
  token: string | null;
  tokenExpiration: Date | null;
}

// UserInput defines the type of the object passed to Sequelize’s model.create
export interface UserCreation
  extends Optional<
    UserAttributes,
    'id' | 'emailVerifiedAt' | 'token' | 'tokenExpiration'
  > {}

// IngredientOuput defines the returned object from model.create, model.update, and model.findOne
export interface UserInstance
  extends Model<UserAttributes, UserCreation>,
    UserAttributes {
  roles?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const User = dbConnection.define<UserInstance>(
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
      allowNull: true,
      defaultValue: null,
      comment: 'Field to add verification token',
    },
    tokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
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
    timestamps: true,
    deletedAt: true,
    paranoid: true,
  }
);

// 1:n
User.hasMany(Role, { sourceKey: 'id', foreignKey: 'userId', as: 'roles' });
Role.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Product, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'products',
});
Product.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Log, { sourceKey: 'id', foreignKey: 'userId', as: 'logs' });
Log.belongsTo(User, { foreignKey: 'userId' });

export default User;
