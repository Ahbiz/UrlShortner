import { nanoid } from 'nanoid';
import Url from '../models/Url.js';


export const generateShortCode = async () => {
  let isUnique = false;
  let shortCode = "";

  while (!isUnique) {
    shortCode = nanoid(6);

    const existingUrl = await Url.findOne({ short_code: shortCode });
    if (!existingUrl) {
      isUnique = true;
    }
  }

  return shortCode;
};

export const validateUrl = (value) => {
  return /^(http|https):\/\/[^ "]+$/.test(value);
};