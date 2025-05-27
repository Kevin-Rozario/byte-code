const languages = {
  python: 71,
  java: 62,
  javascript: 63,
} as const;

type LanguageKey = keyof typeof languages;

export const getLanguageId = (language: string): number | undefined => {
  return languages[language.toLowerCase() as LanguageKey];
};
