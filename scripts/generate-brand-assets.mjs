/**
 * Generates the Open Graph card and the favicon from the site's own design tokens.
 *
 * Run with: node scripts/generate-brand-assets.mjs
 * Re-run after changing the headline, the palette or the fonts.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const display = readFileSync(
  'node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',
).toString('base64');
const body = readFileSync(
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
).toString('base64');

// The SVG renderer resolves this variable font only at the weights explicitly
// requested, so every <text> below states its font-weight. Without it the text
// silently falls back to a serif.
const fontFaces = `
  @font-face { font-family: 'Display'; src: url(data:font/woff2;base64,${display}) format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'Body'; src: url(data:font/woff2;base64,${body}) format('woff2'); font-weight: 100 900; }
`;

// 1200x630 is what LinkedIn, X and Facebook crop to.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <style type="text/css">${fontFaces}</style>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#e3e4de"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#f7f7f4"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="10" fill="#2f55ff"/>
  <text x="80" y="190" font-family="Body" font-size="21" font-weight="500" fill="#2f55ff" letter-spacing="4">SOFTWARE DEVELOPER — BACKEND, APIS &amp; DATABASES</text>
  <text x="80" y="292" font-family="Display" font-size="78" font-weight="600" fill="#0f172a" letter-spacing="-2">Fabricio Carol</text>
  <text x="80" y="366" font-family="Display" font-size="40" font-weight="500" fill="#5b6478" letter-spacing="-1">Construyo productos digitales prácticos.</text>
  <line x1="80" y1="436" x2="1120" y2="436" stroke="#e3e4de" stroke-width="2"/>
  <text x="80" y="496" font-family="Body" font-size="25" font-weight="500" fill="#5b6478">Node.js · TypeScript · PostgreSQL · NestJS · React</text>
  <text x="80" y="542" font-family="Body" font-size="21" font-weight="500" fill="#5b6478">Córdoba, Argentina</text>
</svg>`;

const mark = (
  size,
) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs><style type="text/css">${fontFaces}</style></defs>
  <rect width="64" height="64" rx="14" fill="#0f172a"/>
  <text x="16" y="45" font-family="Display" font-size="38" font-weight="700" fill="#f7f7f4">F</text>
  <circle cx="45" cy="42" r="4.5" fill="#2f55ff"/>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
await sharp(Buffer.from(mark(180)))
  .png()
  .toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(mark(64)))
  .png()
  .toFile('public/favicon-64.png');

// The inline SVG favicon uses a system font: no base64 payload in every request.
writeFileSync(
  'public/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0f172a"/><text x="16" y="45" font-family="system-ui,sans-serif" font-size="38" font-weight="700" fill="#f7f7f4">F</text><circle cx="45" cy="42" r="4.5" fill="#2f55ff"/></svg>\n`,
);

console.log('Brand assets written to public/');
