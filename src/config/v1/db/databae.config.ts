import { Sequelize } from 'sequelize';
import config from '../../../config';
import envConfig from '../env/env.config';
envConfig();

const {
  databases: {
    mysql: { dbConnection: dbConnect, host, name, port, user, password },
  },
} = config();

const dbConnection = new Sequelize(name, user, password, {
  host,
  dialect: dbConnect as any,
  port,
  define: {
    charset: 'utf8',
    deletedAt: true,
    timestamps: true,
  },

  // to force sync for models, Just for development
  sync: { force: true },

  pool: {
    max: 60,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default dbConnection;
