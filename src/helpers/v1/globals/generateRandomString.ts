import { randomBytes } from 'crypto';

const generateRandomString = (length: number) => {
  return randomBytes(length).toString('hex');
};

export default generateRandomString;
