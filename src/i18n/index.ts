import { es, type Dictionary } from './es';
import { en } from './en';
import { pt } from './pt';
import { fr } from './fr';
import { de } from './de';
import { it } from './it';
import {
  DEFAULT_LOCALE,
  LOCALES,
  COMPLETE_LOCALES,
  LOCALE_NAMES,
  LOCALE_TAGS,
} from '../config/site.mjs';

export type Locale = (typeof LOCALES)[number];

/**
 * The config file is plain .mjs so astro.config can import it, which means these
 * maps arrive untyped. Re-exported here with an index signature so components can
 * look up a locale that TypeScript only knows as `string`.
 */
const localeNames: Record<string, string> = LOCALE_NAMES;
const localeTags: Record<string, string> = LOCALE_TAGS;

/**
 * Partial dictionaries (pt, fr, de, it) are deep-merged over Spanish, so an untranslated
 * key falls back to Spanish instead of rendering an empty string or a key name.
 */
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

const partials: Record<string, DeepPartial<Dictionary>> = { pt, fr, de, it };

function deepMerge<T>(base: T, override: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(override ?? {})) {
    if (value === undefined) continue;
    const current = out[key];
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      current &&
      typeof current === 'object'
    ) {
      out[key] = deepMerge(current, value as DeepPartial<typeof current>);
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

const dictionaries: Record<string, Dictionary> = {
  es,
  en,
  pt: deepMerge(es, pt),
  fr: deepMerge(es, fr),
  de: deepMerge(es, de),
  it: deepMerge(es, it),
};

export function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Returns the dictionary for a locale, falling back to Spanish for unknown values. */
export function useTranslations(locale: string | undefined): Dictionary {
  return dictionaries[locale ?? DEFAULT_LOCALE] ?? dictionaries[DEFAULT_LOCALE]!;
}

/** True when the locale still relies on Spanish fallbacks for part of the UI. */
export function isPartialLocale(locale: string): boolean {
  return !(COMPLETE_LOCALES as readonly string[]).includes(locale);
}

/**
 * Builds a path for a locale. Spanish has no prefix; every other locale does.
 * `path` is always the canonical (Spanish) route, e.g. '/projects/virtual-fit'.
 */
export function localePath(locale: string, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const normalised = clean === '/' ? '' : clean.replace(/\/$/, '');
  if (locale === DEFAULT_LOCALE) return normalised || '/';
  return `/${locale}${normalised}` || `/${locale}`;
}

/** Strips the locale prefix from a URL pathname, returning the canonical route. */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  if (match && isLocale(match[1]) && match[1] !== DEFAULT_LOCALE) {
    const rest = pathname.slice(match[1].length + 1);
    return rest || '/';
  }
  return pathname || '/';
}

export {
  DEFAULT_LOCALE,
  LOCALES,
  COMPLETE_LOCALES,
  localeNames as LOCALE_NAMES,
  localeTags as LOCALE_TAGS,
  type Dictionary,
};
