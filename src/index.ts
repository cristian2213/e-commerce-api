import cors from 'cors';
import express, { Application } from 'express';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options, setUpOptions } from './config/v1/swagger/swagger.config';

import config from './config';
import dbConnection from './config/v1/db/databae.config';
import envConfig from './config/v1/env/env.config';
import validationSchema from './config/v1/env/validationSchema.config';
import routerV1 from './routes/v1/index';
import { Environment } from './types/v1/env/env.type';
import User from './models/v1/user/user';
import Role from './models/v1/user/roles';

const app = express() as Application;

const swaggerSpec = swaggerJSDoc(options);

envConfig();

const bootstrap = async (): Promise<void> => {
  try {
    const env = config() as Environment;
    await validationSchema(env);

    // await dbConnection.sync({ force: true, alter: true });

    app.use(express.json());
    app.use(
      cors({
        origin: '*',
      })
    );

    app.use(
      '/storate-images',
      express.static(join(__dirname, 'storage', 'v1', 'images'))
    );
    app.use(
      '/storate-docs',
      express.static(join(__dirname, 'storage', 'v1', 'docs'))
    );
    app.use(
      '/storate-logs',
      express.static(join(__dirname, 'storage', 'v1', 'logs'))
    );

    app.use('/api/v1', routerV1);
    app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec, setUpOptions)
    );

    const {
      app: { port, host },
    } = env;
    app.listen(port, host, () => {
      console.info(`Server running on the host http://${host}:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

bootstrap();
