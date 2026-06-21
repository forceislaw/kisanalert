import { dictionary } from './dictionary';

const dictionaries = dictionary;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: string): Dictionary {
  if (locale in dictionaries) {
    return dictionaries[locale as Locale];
  }
  return dictionaries.en;
}

export const locales = Object.keys(dictionaries) as Locale[];
