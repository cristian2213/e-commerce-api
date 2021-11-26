import dotenv from 'dotenv';
import { environments } from '../../../environments';

export default () => {
  const envs = environments as any;
  let type = process.env.NODE_ENV!;
  const allowedTypes = ['prod', 'dev', 'stag'];

  if (!type) type = 'dev';

  if (!allowedTypes.includes(type.trim())) {
    throw new Error('Environment not allowed');
  }

  dotenv.config({
    path: envs[type],
  });
};
