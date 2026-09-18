import type { APIRoute } from 'astro';

/**
 * robots.txt generated from the configured site URL, so it stays correct after
 * the custom domain is connected. The admin panel is excluded from crawling.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://example.com').href;

  const body = `User-agent: *
Allow: /
Disallow: /keystatic

Sitemap: ${sitemap}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
