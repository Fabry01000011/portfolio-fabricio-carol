/**
 * Centralised site metadata. Everything a recruiter or client can click lives here,
 * so no component ever hardcodes a phone number, an email or a profile URL.
 *
 * All values below are CONFIRMED. Do not add unverified data.
 */

export const site = {
  name: 'Fabricio Carol',
  fullName: 'Fabricio Leonel Carol',
  role: {
    es: 'Software Developer — Backend, APIs y Bases de Datos',
    en: 'Software Developer — Backend, APIs & Databases',
  },
  /** Base location shown publicly. Santiago del Estero is the origin, kept for local SEO. */
  location: {
    city: 'Córdoba',
    region: 'Córdoba',
    country: 'Argentina',
    countryCode: 'AR',
    secondary: 'Santiago del Estero, Argentina',
  },
  email: 'fabricioleonelcarol@gmail.com',
  /** Personal WhatsApp: full international format, digits only, for wa.me links. */
  whatsapp: '5493855022830',
  whatsappDisplay: '+54 385 502-2830',
  linkedin: 'https://www.linkedin.com/in/fabricio-carol/',
  github: 'https://github.com/Fabry01000011',
  githubUser: 'Fabry01000011',
  instagram: 'https://www.instagram.com/fabricarol_/',
  instagramHandle: '@fabricarol_',
  cv: {
    es: '/cv/fabricio-carol-cv-es.pdf',
    en: '/cv/fabricio-carol-cv-en.pdf',
  },
  openGraphImage: '/og-default.png',
} as const;

export const aeon = {
  name: 'ÆON Software Solutions',
  /** ASCII fallback for places where the ligature may not render (meta, alt text). */
  nameAscii: 'AEON Software Solutions',
  whatsapp: '5493855976756',
  whatsappDisplay: '+54 385 597-6756',
  /** Reuses the personal inbox until ÆON has its own verified address. */
  email: 'fabricioleonelcarol@gmail.com',
} as const;

/** Builds a wa.me link with a prefilled message. */
export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
