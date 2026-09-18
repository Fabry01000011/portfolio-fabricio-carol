import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { site } from '../data/site';

/**
 * Whether the CV files actually exist.
 *
 * Checked at build time so the download buttons only appear once the PDFs are in
 * place. A recruiter clicking "Download CV" and getting a 404 is worse than not
 * seeing the button at all, and this needs no code change when the files land:
 * drop them into public/cv/ and the next build turns the buttons on.
 */
function has(publicPath: string): boolean {
  try {
    const url = new URL(`../../public${publicPath}`, import.meta.url);
    return existsSync(fileURLToPath(url));
  } catch {
    return false;
  }
}

export const cvAvailable = {
  es: has(site.cv.es),
  en: has(site.cv.en),
} as const;

export const anyCvAvailable = cvAvailable.es || cvAvailable.en;

/** The best CV for a locale, or undefined when none has been uploaded. */
export function cvFor(locale: string): string | undefined {
  if (locale === 'en') return cvAvailable.en ? site.cv.en : cvAvailable.es ? site.cv.es : undefined;
  return cvAvailable.es ? site.cv.es : cvAvailable.en ? site.cv.en : undefined;
}
