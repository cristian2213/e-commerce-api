import { DataTypes, Model, Optional } from 'sequelize';
import dbConnection from '../../../config/v1/db/databae.config';
import { Roles } from '../../../helpers/v1/roles/roles';
import argon2 from 'argon2';

// We recommend you declare an interface for the attributes, for stricter typechecking
export interface UserAttr {
  id: number;
  name: string;
  email: string | null;
  password: string;
  role: string;
  emailVerifiedAt: Date;
  token: string;
  tokenExpiration: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Some fields are optional when calling UserModel.create() or UserModel.build()
export interface UserCreationAttr extends Optional<UserAttr, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
export interface UserInstance
  extends Model<UserAttr, UserCreationAttr>,
    UserAttr {}

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
          args: [8, 60],
          msg: 'Allowed password length 8 to 60 characters',
        },
      },
    },

    role: {
      type: DataTypes.ENUM,
      values: Object.values(Roles),
      allowNull: false,
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
      async beforeCreate(user: UserInstance) {
        const hash = await argon2.hash(user.password);
        user.password = hash;
      },
      async beforeUpdate(user: UserInstance) {
        if (user.password) {
          user.password = await argon2.hash(user.password);
        }
      },
    },
    paranoid: true,
  }
);

export default User;
