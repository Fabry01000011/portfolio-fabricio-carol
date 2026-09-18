import { LOCALES, DEFAULT_LOCALE } from '../config/site.mjs';

/**
 * Static paths for the `[locale]` routes.
 *
 * Spanish lives at the root (prefixDefaultLocale is false), so it is excluded
 * here — otherwise every Spanish page would exist twice, at `/` and `/es/`,
 * and the two would compete in search results.
 */
export function nonDefaultLocalePaths() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
    params: { locale },
  }));
}
