// ******************** External dependencies **********************
import express, { Application } from 'express';
import { join } from 'path';
import cors from 'cors';
// *****************************************************************
// ******************** Local dependencies *************************
import config from './config'; // key - value
import envConfig from './config/v1/env/env.config';
import validationSchema from './config/v1/env/validationSchema.config';
import { Environment } from './types/env/env.type';
import routerV1 from './routes/v1/index';

// *****************************************************************
const app = express() as Application;

// ******************** Set up dotenv ******************************
envConfig();
// *****************************************************************

const bootstrap = async (): Promise<void> => {
  try {
    // ****************** environment variables ********************
    const env = config() as Environment;
    await validationSchema(env);
    // *************************************************************
    // ****************** Set up cors ******************************
    app.use(
      cors({
        origin: '*',
        // methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      })
    );
    // *************************************************************
    // ****************** Parsear body *****************************
    app.use(express.json());
    // *************************************************************
    // ********  Set up static files (Refactor to AWS S3)***********
    app.use(
      '/storate-images',
      express.static(join(__dirname, '..', 'storage', 'v1', 'images'))
    );
    app.use(
      '/storate-docs',
      express.static(join(__dirname, '..', 'storage', 'v1', 'docs'))
    );
    app.use(
      '/storate-logs',
      express.static(join(__dirname, '..', 'storage', 'v1', 'logs'))
    );
    console.log(join(__dirname, '..', 'storage', 'v1', 'logs'));
    // *************************************************************
    // ****************** routes handler ***************************
    app.use('/api/v1', routerV1);
    // app.use('/api/v2', routerV2);
    // *************************************************************

    // ****************** Server ***********************************
    const {
      app: { port, host },
    } = env;
    app.listen(port, host, () => {
      console.info(`Server running on the host http://${host}:${port}`);
    });
    // **************************************************************
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

bootstrap();
