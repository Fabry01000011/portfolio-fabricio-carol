/**
 * Technology catalogue.
 *
 * `level` reflects the AUDIT, not aspiration:
 *   'core'      — used in real, verifiable projects. Shown in the main stack.
 *   'secondary' — real experience, less depth or less recent. Shown in a quieter group.
 *
 * Adding a technology = one entry here. No component changes.
 */

export type TechLayer = 'language' | 'backend' | 'frontend' | 'database' | 'infra' | 'practice';

export interface Tech {
  id: string;
  name: string;
  layer: TechLayer;
  level: 'core' | 'secondary';
}

/** Layer colours are resolved to CSS custom properties in the Chip component. */
export const layerOrder: TechLayer[] = [
  'language',
  'backend',
  'database',
  'frontend',
  'infra',
  'practice',
];

export const techs = {
  // Languages
  typescript: { id: 'typescript', name: 'TypeScript', layer: 'language', level: 'core' },
  javascript: { id: 'javascript', name: 'JavaScript', layer: 'language', level: 'core' },
  sql: { id: 'sql', name: 'SQL', layer: 'language', level: 'core' },
  python: { id: 'python', name: 'Python', layer: 'language', level: 'secondary' },
  java: { id: 'java', name: 'Java', layer: 'language', level: 'secondary' },
  php: { id: 'php', name: 'PHP', layer: 'language', level: 'secondary' },

  // Backend
  node: { id: 'node', name: 'Node.js', layer: 'backend', level: 'core' },
  express: { id: 'express', name: 'Express', layer: 'backend', level: 'core' },
  nestjs: { id: 'nestjs', name: 'NestJS', layer: 'backend', level: 'core' },
  rest: { id: 'rest', name: 'APIs REST', layer: 'backend', level: 'core' },
  bullmq: { id: 'bullmq', name: 'BullMQ', layer: 'backend', level: 'core' },
  springboot: { id: 'springboot', name: 'Spring Boot', layer: 'backend', level: 'secondary' },

  // Databases
  postgresql: { id: 'postgresql', name: 'PostgreSQL', layer: 'database', level: 'core' },
  mysql: { id: 'mysql', name: 'MySQL', layer: 'database', level: 'core' },
  redis: { id: 'redis', name: 'Redis', layer: 'database', level: 'core' },
  prisma: { id: 'prisma', name: 'Prisma', layer: 'database', level: 'core' },
  sqlserver: { id: 'sqlserver', name: 'SQL Server', layer: 'database', level: 'secondary' },
  mongodb: { id: 'mongodb', name: 'MongoDB', layer: 'database', level: 'secondary' },
  supabase: { id: 'supabase', name: 'Supabase', layer: 'database', level: 'core' },

  // Frontend
  react: { id: 'react', name: 'React', layer: 'frontend', level: 'core' },
  nextjs: { id: 'nextjs', name: 'Next.js', layer: 'frontend', level: 'core' },
  astro: { id: 'astro', name: 'Astro', layer: 'frontend', level: 'core' },
  preact: { id: 'preact', name: 'Preact', layer: 'frontend', level: 'core' },
  tailwind: { id: 'tailwind', name: 'Tailwind CSS', layer: 'frontend', level: 'core' },
  html: { id: 'html', name: 'HTML', layer: 'frontend', level: 'core' },
  css: { id: 'css', name: 'CSS', layer: 'frontend', level: 'core' },
  reactnative: { id: 'reactnative', name: 'React Native', layer: 'frontend', level: 'secondary' },

  // Infrastructure & tooling
  git: { id: 'git', name: 'Git', layer: 'infra', level: 'core' },
  docker: { id: 'docker', name: 'Docker', layer: 'infra', level: 'core' },
  linux: { id: 'linux', name: 'Linux / Debian', layer: 'infra', level: 'core' },
  pm2: { id: 'pm2', name: 'PM2', layer: 'infra', level: 'core' },
  tailscale: { id: 'tailscale', name: 'Tailscale', layer: 'infra', level: 'secondary' },
  vercel: { id: 'vercel', name: 'Vercel', layer: 'infra', level: 'core' },
  railway: { id: 'railway', name: 'Railway', layer: 'infra', level: 'secondary' },
  netlify: { id: 'netlify', name: 'Netlify', layer: 'infra', level: 'secondary' },
  githubactions: {
    id: 'githubactions',
    name: 'GitHub Actions',
    layer: 'infra',
    level: 'secondary',
  },
  jest: { id: 'jest', name: 'Jest', layer: 'infra', level: 'core' },

  // Practices & product
  scrum: { id: 'scrum', name: 'Scrum', layer: 'practice', level: 'core' },
  kanban: { id: 'kanban', name: 'Kanban', layer: 'practice', level: 'core' },
  requirements: {
    id: 'requirements',
    name: 'Análisis de requerimientos',
    layer: 'practice',
    level: 'core',
  },
  figma: { id: 'figma', name: 'Figma', layer: 'practice', level: 'secondary' },

  // Integrations used in projects
  mercadopago: { id: 'mercadopago', name: 'Mercado Pago', layer: 'backend', level: 'core' },
  gemini: { id: 'gemini', name: 'Gemini API', layer: 'backend', level: 'secondary' },
  capacitor: { id: 'capacitor', name: 'Capacitor', layer: 'frontend', level: 'secondary' },
  leaflet: { id: 'leaflet', name: 'Leaflet', layer: 'frontend', level: 'secondary' },
} as const satisfies Record<string, Tech>;

export type TechId = keyof typeof techs;

export function getTech(id: string): Tech | undefined {
  return (techs as Record<string, Tech>)[id];
}

/** Resolves a list of ids to Tech objects, silently skipping unknown ids
 *  so a typo in the CMS never breaks a build. */
export function resolveTechs(ids: readonly string[] = []): Tech[] {
  return ids.map(getTech).filter((t): t is Tech => Boolean(t));
}

export function groupByLayer(list: Tech[]): { layer: TechLayer; items: Tech[] }[] {
  return layerOrder
    .map((layer) => ({ layer, items: list.filter((t) => t.layer === layer) }))
    .filter((g) => g.items.length > 0);
}
