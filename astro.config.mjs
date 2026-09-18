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
  adapter: vercel({ imageService: true }),

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
