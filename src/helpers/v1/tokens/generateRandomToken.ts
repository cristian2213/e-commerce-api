import { randomBytes } from 'crypto';

export const generateRandomToken = (
  expirationDate = Date.now() + 1000 * 60 * 60
): { token: string; expirationDate: any } => {
  const token = randomBytes(22).toString('hex');
  return { token, expirationDate };
};
