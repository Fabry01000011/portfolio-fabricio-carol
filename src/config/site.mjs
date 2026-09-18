/**
 * Single source of truth for site-wide constants.
 * Plain .mjs so it can be imported from astro.config.mjs and from TypeScript alike.
 */

/**
 * Production URL. Everything that has to be absolute derives from it: the
 * canonical link of every page, the sitemap, the hreflang alternates and the
 * image used when the site is shared. Change it once here after connecting a
 * custom domain.
 */
export const SITE_URL = 'https://portfolio-fabricio-carol.vercel.app';

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
