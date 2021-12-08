import { randomBytes } from 'crypto';
import { add } from 'date-fns';

export const generateRandomToken = (): {
  token: string;
  expirationDate: any;
} => {
  const token = randomBytes(22).toString('hex');
  const expirationDate: Date = add(new Date(), { hours: 1 });
  return { token, expirationDate };
};
