export const languages = ['en', 'sr'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

/** A value that has a separate version for every language. */
export type Localized<T = string> = Record<Language, T>;

/** Text that is either the same in every language or translated. */
export type LocalizedText = string | Localized;

export const languagePaths: Record<Language, string> = {
  en: '/',
  sr: '/sr',
};
