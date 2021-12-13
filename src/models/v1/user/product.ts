import { DataTypes } from 'sequelize';
import dbConnection from '../../../config/v1/db/databae.config';

const Product = dbConnection.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: 255,
        min: 5,
        notNull: true,
      },
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: 255,
        min: 5,
        notNull: true,
      },
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        max: 5000,
        min: 20,
        notNull: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        notNull: true,
      },
    },

    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        async isUnique(value: string) {
          // throw an error
          const product = await Product.findOne({
            where: {
              slug: value,
            },
          });

          if (product) throw new Error('The slug field exists already');
        },
      },
    },

    stock: {
      type: DataTypes.SMALLINT,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true,
      },
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    likes: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: true,
        isInt: true,
      },
    },

    position: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
  },

  {
    timestamps: true,
    deletedAt: true,
    paranoid: true,
  }
);

export default Product;
