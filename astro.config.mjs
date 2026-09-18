// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';

import { SITE_URL, LOCALES, DEFAULT_LOCALE } from './src/config/site.mjs';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  /**
   * `imageService` is deliberately off. With it on, Astro stops optimising at
   * build time and defers every image to Vercel's runtime transform: the markup
   * then asks for a 3840px copy at quality 100 for a card that renders at 400px,
   * the local preview cannot resolve those URLs at all, and the transforms are
   * metered. This site is static with a handful of images, so it is both faster
   * and simpler to generate the sizes once, during the build.
   */
  adapter: vercel(),

  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  integrations: [
    react(),
    keystatic(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((l) => [l, l])),
      },
      filter: (page) => !page.includes('/keystatic'),
    }),
  ],

  image: {
    // Keystatic writes uploads into src/assets; Astro optimises them at build time.
    responsiveStyles: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
