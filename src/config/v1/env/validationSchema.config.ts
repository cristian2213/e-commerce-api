import Joi from 'joi';
import { Environment } from '../../../types/v1/env/env.type';

export default async (env: Environment) => {
  const envSchema = Joi.object({
    app: Joi.object({
      port: Joi.number().required(),
      host: Joi.string().required(),
    }),
    databases: Joi.object({
      mysql: Joi.object({
        dbConnection: Joi.string().required(),
        host: Joi.string().required(),
        name: Joi.string().required(),
        port: Joi.number().required(),
        user: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    jwt: Joi.object({
      secret: Joi.string().required(),
    }),
  });

  await envSchema.validateAsync(env);
};
