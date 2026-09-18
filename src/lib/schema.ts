import { site } from '../data/site';

/**
 * JSON-LD builders. Structured data only ever restates what the page already says —
 * it never asserts anything that is not visible on the site.
 */

export function personSchema(origin: string, role: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.fullName,
    alternateName: site.name,
    jobTitle: role,
    url: origin,
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    sameAs: [site.linkedin, site.github, site.instagram],
    knowsLanguage: ['es', 'en', 'pt'],
  };
}

export function projectSchema(
  origin: string,
  project: { title: string; summary: string; technologies: string[] },
  url: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `${origin}${url}`,
    author: { '@type': 'Person', name: site.fullName, url: origin },
    keywords: project.technologies.join(', '),
  };
}

export function breadcrumbSchema(origin: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}
