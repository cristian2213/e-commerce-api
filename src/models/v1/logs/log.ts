import { DataTypes, Optional, Model } from 'sequelize';
import dbConnection from '../../../config/v1/db/databae.config';

interface LogAttributes {
  id: number;
  logType: string;
  successfulUploads: number;
  failedUploads: number;
  errors: string;
  filePath: string;
  userId?: number;
}

export interface LogCreation extends Optional<LogAttributes, 'id'> {}

export interface LogInstance
  extends Model<LogAttributes, LogCreation>,
    LogAttributes {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

const Log = dbConnection.define<LogInstance>(
  'Log',
  {
    id: {
      type: DataTypes.INTEGER({ unsigned: true }),
      autoIncrement: true,
      primaryKey: true,
    },

    logType: {
      type: DataTypes.ENUM(...['products']),
      allowNull: false,
      validate: {
        notNull: true,
      },
    },

    successfulUploads: {
      type: DataTypes.INTEGER({ unsigned: true }),
      allowNull: false,

      validate: {
        isNumeric: true,
        notNull: true,
      },
    },

    failedUploads: {
      type: DataTypes.INTEGER({ unsigned: true }),
      allowNull: false,
      validate: {
        isNumeric: true,
        notNull: true,
      },
    },

    errors: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
      validate: {
        notNull: false,
      },
    },

    filePath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
  },

  {
    timestamps: true,
    deletedAt: true,
    paranoid: true,
  }
);

export default Log;
