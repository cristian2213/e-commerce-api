import { nanoid } from 'nanoid';
import slugify from 'slugify';

export const generateSlug = (str: string) => {
  const maxLength = 80;
  if (str.length > maxLength) {
    str = str.slice(0, maxLength);
  }

  const serializedStr = slugify(str, {
    lower: true,
    trim: true,
    replacement: '-',
    remove: /[*+~.()'"!:@_#%&=?¿\\<>$|°[\]{}\/¡0-9]/g,
  });
  return serializedStr + '-' + nanoid();
};
