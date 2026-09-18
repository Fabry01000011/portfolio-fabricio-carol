import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content schemas.
 *
 * Everything the site renders comes from here, and every one of these files is
 * editable from the Keystatic admin at /keystatic. Adding a project never means
 * touching a component.
 *
 * Translation strategy: Spanish fields are required; `i18n` holds per-locale
 * overrides for the text that matters. Any locale without an override falls back
 * to Spanish, so a half-translated project still renders correctly.
 */

/** Per-locale overrides of the narrative fields of a project. */
const projectTranslation = z
  .object({
    title: z.string().optional(),
    tagline: z.string().optional(),
    summary: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    role: z.string().optional(),
    features: z
      .array(z.object({ title: z.string(), description: z.string().optional() }))
      .optional(),
    highlights: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    results: z.array(z.object({ label: z.string(), value: z.string().optional() })).optional(),
  })
  .partial();

const architectureNode = z.object({
  id: z.string(),
  label: z.string(),
  /** Drives the node's colour and column in the generated diagram. */
  kind: z.enum([
    'client',
    'frontend',
    'api',
    'service',
    'worker',
    'database',
    'external',
    'storage',
  ]),
  description: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.json' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Short line under the title in the project hero. */
      tagline: z.string(),
      /** One or two sentences, used in cards and meta descriptions. */
      summary: z.string(),

      /** Controls ordering on the index; lower comes first. */
      order: z.number().default(99),
      featured: z.boolean().default(false),
      /**
       * true → the case study is still being written. The page renders with a
       * visible notice and the project is hidden from the home page.
       */
      draft: z.boolean().default(false),

      year: z.string().optional(),
      client: z.string().optional(),
      /** e.g. "En producción", "Demo pública", "En desarrollo". */
      status: z.string().optional(),
      team: z.string().optional(),

      categories: z.array(z.string()).default([]),
      /** Ids from src/data/tech.ts. Unknown ids are skipped, never fatal. */
      technologies: z.array(z.string()).default([]),

      /** Narrative. Empty sections are simply not rendered. */
      problem: z.string().optional(),
      solution: z.string().optional(),
      role: z.string().optional(),

      features: z
        .array(z.object({ title: z.string(), description: z.string().optional() }))
        .default([]),
      highlights: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
      /** Only ever filled with verifiable facts. Left empty otherwise. */
      results: z.array(z.object({ label: z.string(), value: z.string().optional() })).default([]),

      architecture: z
        .object({
          nodes: z.array(architectureNode).default([]),
          edges: z
            .array(z.object({ from: z.string(), to: z.string(), label: z.string().optional() }))
            .default([]),
          note: z.string().optional(),
        })
        .optional(),

      /** Media. All uploaded from the admin panel. */
      logo: image().optional(),
      cover: image().optional(),
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),

      links: z
        .object({
          demo: z.url().optional(),
          repo: z.url().optional(),
          extra: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
        })
        .default({ extra: [] }),

      /**
       * Repository status drives the badge shown on the project page:
       * public → link · private → "source available on request" ·
       * institutional → runs on the institution's servers · client → belongs to the client.
       */
      repoStatus: z.enum(['public', 'private', 'institutional', 'client', 'none']).default('none'),

      /** Marks the project as delivered through ÆON. */
      aeon: z.boolean().default(false),

      i18n: z.record(z.string(), projectTranslation).default({}),
    }),
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.json' }),
  schema: z.object({
    role: z.string(),
    organisation: z.string(),
    /** Free text so "Ene 2026 — Ago 2026" and "2020 — Actualidad" both work. */
    period: z.string(),
    /** Used only for sorting, newest first. Format: YYYY-MM. */
    startDate: z.string(),
    location: z.string().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    /** 'tech' items are emphasised; 'commercial' ones are shown as supporting background. */
    kind: z.enum(['tech', 'commercial']).default('tech'),
    current: z.boolean().default(false),
    i18n: z
      .record(
        z.string(),
        z
          .object({
            role: z.string().optional(),
            period: z.string().optional(),
            summary: z.string().optional(),
            highlights: z.array(z.string()).optional(),
          })
          .partial(),
      )
      .default({}),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.json' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Paragraphs of body copy. Rendered in order. */
      body: z.array(z.string()).default([]),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
      gallery: z
        .array(z.object({ image: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      services: z
        .array(
          z.object({ title: z.string(), description: z.string(), icon: z.string().optional() }),
        )
        .default([]),
      steps: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
      i18n: z
        .record(
          z.string(),
          z
            .object({
              title: z.string().optional(),
              body: z.array(z.string()).optional(),
              facts: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
              services: z
                .array(
                  z.object({
                    title: z.string(),
                    description: z.string(),
                    icon: z.string().optional(),
                  }),
                )
                .optional(),
              steps: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
            })
            .partial(),
        )
        .default({}),
    }),
});

export const collections = { projects, experience, pages };
