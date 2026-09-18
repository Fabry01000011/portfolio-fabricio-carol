/**
 * Single source of truth for site-wide constants.
 * Plain .mjs so it can be imported from astro.config.mjs and from TypeScript alike.
 */

/** Production URL. Change once here after connecting the custom domain. */
export const SITE_URL = 'https://fabriciocarol.vercel.app';

export const DEFAULT_LOCALE = 'es';

/** Order matters: it drives the language switcher. */
export const LOCALES = ['es', 'en', 'pt', 'fr', 'de', 'it'];

/** Locales with professionally reviewed copy. The rest fall back to Spanish. */
export const COMPLETE_LOCALES = ['es', 'en'];

export const LOCALE_NAMES = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
};

/** BCP-47 tags used in <html lang> and hreflang. */
export const LOCALE_TAGS = {
  es: 'es-AR',
  en: 'en',
  pt: 'pt-BR',
  fr: 'fr',
  de: 'de',
  it: 'it',
};
