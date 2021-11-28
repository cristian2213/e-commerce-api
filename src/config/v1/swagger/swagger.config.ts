import { SwaggerOptions } from 'swagger-ui-express';

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce with Express and Typescript',
      description:
        "This's an app where you can buy and sell products and services wihtout any limitation.",
      version: 'V1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1', // swagger will look for this url for executing the routes
      },
    ],
  },
  // This is the route to the documentation
  // apis: ['./src/routes/v1/index.ts', './src/routes/v1/modules/auth.route.ts'],
  apis: ['./src/routes/v1/modules/*.ts'],
};

export const setUpOptions: SwaggerOptions = {
  swaggerOptions: {
    filter: true,
    showRequestDuration: true,
  },
};
