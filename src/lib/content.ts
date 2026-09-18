import { getCollection, type CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE } from '../config/site.mjs';

/**
 * Content helpers.
 *
 * Localisation rule used everywhere: Spanish is the base record, and a locale's
 * `i18n` entry overrides only the fields it actually defines. That way a project
 * translated halfway still renders complete instead of showing blanks.
 */

export type Project = CollectionEntry<'projects'>;
export type Experience = CollectionEntry<'experience'>;
export type Page = CollectionEntry<'pages'>;

/** Merges a locale's overrides over the base data, ignoring empty values. */
function applyOverrides<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown> | undefined,
): T {
  if (!override) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined || value === null) continue;
    if (typeof value === 'string' && value.trim() === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

export function localiseProject(entry: Project, locale: string) {
  const override = locale === DEFAULT_LOCALE ? undefined : entry.data.i18n?.[locale];
  return applyOverrides(entry.data, override as Record<string, unknown> | undefined);
}

export function localiseExperience(entry: Experience, locale: string) {
  const override = locale === DEFAULT_LOCALE ? undefined : entry.data.i18n?.[locale];
  return applyOverrides(entry.data, override as Record<string, unknown> | undefined);
}

export function localisePage(entry: Page, locale: string) {
  const override = locale === DEFAULT_LOCALE ? undefined : entry.data.i18n?.[locale];
  return applyOverrides(entry.data, override as Record<string, unknown> | undefined);
}

/** All projects, ordered. Drafts are included: they get a notice, not a hiding place. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/**
 * Featured projects for the home page.
 *
 * Drafts are included: a project can be the strongest thing here while its case
 * study is still being written, and the card carries its own "work in progress"
 * badge. Hiding it instead would bury the best work.
 */
export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.data.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

/** Non-featured projects, for the compact grid under the featured ones. */
export async function getSecondaryProjects(featured: Project[]): Promise<Project[]> {
  const all = await getProjects();
  const featuredIds = new Set(featured.map((p) => p.id));
  return all.filter((p) => !featuredIds.has(p.id));
}

export async function getAeonProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.data.aeon);
}

/** Previous / next in display order, wrapping around. */
export function getProjectNeighbours(projects: Project[], current: Project) {
  const index = projects.findIndex((p) => p.id === current.id);
  if (index === -1 || projects.length < 2) return { previous: undefined, next: undefined };
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { previous, next };
}

/** Experience entries, newest first. */
export async function getExperience(): Promise<Experience[]> {
  const all = await getCollection('experience');
  return all.sort((a, b) => b.data.startDate.localeCompare(a.data.startDate));
}

/** Unique category list across projects, for the index filter. */
export function collectCategories(projects: Project[]): string[] {
  const set = new Set<string>();
  for (const project of projects) {
    for (const category of project.data.categories) set.add(category);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
