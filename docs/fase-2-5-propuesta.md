# FASES 2–5 — Posicionamiento · Arquitectura de información · Design system · Stack

Fecha: 2026-09-18. Cada fase termina con la opción **recomendada**. Todo lo textual vive en datos (no en componentes),
así que cambiar una alternativa después no obliga a tocar la interfaz.

---

## FASE 2 — Posicionamiento

### 2.1 Headline (H1 del hero)

| | Español (default) | English | Por qué |
|---|---|---|---|
| **A — recomendada** | **Construyo productos digitales prácticos.** | **Software Developer focused on building practical digital products.** | Es tu frase, pero en ES suena a persona y no a traducción. Corta, sin jerga, deja el rol para el eyebrow. |
| B | Backend, APIs y bases de datos para negocios reales. | Backend, APIs and databases for real businesses. | Más SEO-literal, pero suena a agencia. Pierde el "producto". |
| C | Software que resuelve problemas concretos. | Software that solves concrete problems. | Creíble, pero genérica: la podría firmar cualquiera. |

Estructura del hero con A:

```
[eyebrow, mono]   SOFTWARE DEVELOPER — BACKEND, APIS & DATABASES
[H1]              Construyo productos digitales prácticos.
[sub]             Backend · APIs · Bases de datos · Full Stack. Sistemas web, integraciones y
                  lógica de negocio para organismos públicos, empresas y proyectos propios.
[status pill]     ● Disponible para roles Backend / Full Stack y proyectos con ÆON
[CTAs]            Ver proyectos   |   Descargar CV ▾ (ES / EN)   |   Contactar
```

El eyebrow lleva la keyword exacta que un recruiter escanea. El H1 lleva la promesa. La disponibilidad va como
"status pill" chica y verde (patrón de producto, no de búsqueda laboral): comunica sin rogar.

### 2.2 Mensaje principal (propuesta de valor)

> Entiendo el problema antes de escribir código. Diseño los datos, construyo el backend y la interfaz,
> y me hago cargo de que el sistema funcione en producción y siga funcionando.

Es la frase que sostiene las cuatro audiencias: al recruiter le dice "backend + datos + full stack", al cliente
"me entrego un sistema que funciona", al puesto de analista "entiendo requerimientos".

### 2.3 Diferenciador (Tech + Negocio + Ventas), sin slogan

No va como frase. Va como **sección "Cómo trabajo"** con tres columnas que cuentan el proceso y, de paso, la
experiencia comercial:

1. **Entender el problema** — requerimientos, usuarios, restricciones. Respaldo: análisis funcional en Cencopay,
   dos organismos públicos, dos años vendiendo tecnología cara a cara.
2. **Diseñar los datos** — modelo, consultas, integridad. Respaldo: MySQL, PostgreSQL, Redis en producción.
3. **Construir y sostener** — API, interfaz, despliegue, mantenimiento evolutivo. Respaldo: sistemas en uso
   por el gobierno y por un cliente privado.

La palabra "ventas" aparece una sola vez en toda la web, en la experiencia (Movilmar), y en "Cómo trabajo" se
traduce a "sé escuchar a un cliente". Eso es lo que la hace creíble.

### 2.4 Narrativa de la Home (orden = prioridad del recruiter)

1. Hero (quién + qué + CTAs)
2. **Franja de prueba** (3 datos duros: "Desarrollando desde 2020" · "Público, privado y propio" · "Stack: Node/TS · SQL · React")
3. **Proyectos** (3 destacados grandes + 4 compactos)
4. **Cómo trabajo** (el diferenciador)
5. **Experiencia** (timeline condensada, link a la página completa)
6. **ÆON** (teaser: qué es + "Trabajar con ÆON")
7. **Contacto** (email, WhatsApp, LinkedIn, GitHub, ubicación)

Un recruiter que scrollea 45 segundos ve: nombre → rol → stack → 3 proyectos con imagen → experiencia → CV/LinkedIn.

### 2.5 CTAs

| CTA | Dónde | Destino |
|---|---|---|
| Ver proyectos | hero, primario | `/projects` |
| Descargar CV (ES / EN) | hero + nav + experiencia | `/cv/fabricio-carol-cv-es.pdf` y `-en.pdf` |
| Contactar | hero + footer | `/contact` |
| Trabajar con ÆON | sección ÆON + página ÆON | WhatsApp ÆON (`wa.me/5493855976756`) + email |
| Escribime por WhatsApp | contacto | `wa.me/5493855022830` |

---

## FASE 3 — UX / Arquitectura de información

### 3.1 Rutas

Español sin prefijo (default y SEO principal); los demás idiomas con prefijo. Los slugs de ruta son en inglés
en todos los idiomas: un solo mapa de rutas, sin tabla de traducción de paths que se rompa.

```
/                      Home
/projects              Índice de proyectos (filtro por categoría)
/projects/[slug]       Detalle de proyecto
/about                 Sobre mí (con galería de imágenes editable)
/experience            Experiencia + educación + idiomas + CV
/aeon                  ÆON Software Solutions (servicios + CTA)
/contact               Contacto
/en/..., /pt/..., /fr/..., /de/..., /it/...   mismas rutas por idioma
/keystatic             Panel admin (ver Fase 5)
/sitemap-index.xml, /robots.txt, /cv/*.pdf
```

### 3.2 Navegación

Header fijo, translúcido al scrollear: `Proyectos · Sobre mí · Experiencia · ÆON · Contacto` + selector de idioma +
botón "CV". En móvil: menú a pantalla completa con las mismas entradas grandes y los contactos abajo.
Footer: repite nav + redes + "© Fabricio Carol · ÆON Software Solutions".

### 3.3 Página de proyecto (estructura fija, datos variables)

```
Hero          logo del proyecto (opcional) · nombre · una línea · categorías · stack principal
              links: Demo · Repositorio (público / privado / institucional) · Caso ÆON (si aplica)
Problema      qué dolía antes
Solución      qué se construyó
Mi rol        qué hice yo (equipo si lo hubo)
Arquitectura  diagrama SVG generado desde datos (nodos + conexiones)
Features      lista con ícono
Tecnologías   chips agrupados por capa
Resultados    solo si hay datos verificables; si no, la sección no se renderiza
Galería       capturas/GIF/video subidos desde el admin; si no hay, placeholder elegante "capturas pronto"
Highlights    decisiones técnicas (2–4 tarjetas)
Repositorio   público con link · "Private repository — source available upon request" ·
              "Institutional deployment — running on government servers, not publicly available"
Nav           ← Proyecto anterior · Siguiente proyecto →
```

Orden y protagonismo de proyectos (primer corte, editable desde el admin con un campo `order` y `featured`):

| # | Proyecto | Featured | Categoría |
|---|---|---|---|
| 1 | AgroCordS / Ventana de Aplicación | ✅ | AgTech · Data · Satellite · Decision Support |
| 2 | Virtual-Fit | ✅ | AI · E-commerce · Computer Vision |
| 3 | Puerta a Puerta X | ✅ | Marketplace · Payments · Realtime · Mobile |
| 4 | Dirección de la Juventud (Municipalidad SDE) | | Full Stack · Government |
| 5 | Dirección de Tránsito y Transporte | | Business Software · Backend · Data |
| 6 | Micropasajes (PatyBus / El Delfín Turismo) | | Web App · Transactions · ÆON |
| 7 | More Agile | | Product · Teams · Gamification |

### 3.4 Flujos

- **Recruiter:** Home → 3 proyectos → detalle de uno → Experiencia → CV/LinkedIn. Todo a ≤2 clics.
- **Cliente:** Home → ÆON (desde nav o teaser) → servicios + casos (Micropasajes, PaPx) → WhatsApp ÆON.
- **Analista funcional / Data:** Experiencia (Cencopay, Tránsito) → proyectos con "Datos" en categoría.

### 3.5 Panel admin (requisito nuevo)

Desde `/keystatic` (login con tu GitHub) editás: proyectos (todos los campos, por idioma), imágenes de galería,
logo de proyecto, links de demo/repo, imágenes de "Sobre mí", experiencia, textos de ÆON, y los PDFs del CV.
Cada guardado es un commit al repo y la web se redespliega sola en 1–2 minutos. No hay base de datos ni servidor
que mantener. Detalle en Fase 5.

---

## FASE 4 — Design system

### 4.1 Concepto visual: **"Blueprint"**

Software y datos como *estructura*: fondo de papel con grilla de puntos sutil, diagramas de arquitectura como
elemento visual protagonista (no decoración), etiquetas en monoespaciada como en un plano técnico, y un acento
eléctrico que marca lo interactivo. Se siente startup y personal sin recurrir a terminal negra ni glass.

### 4.2 Color (tokens CSS, light + dark)

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--bg` | `#F7F7F4` (papel cálido) | `#0B1020` (navy profundo, no negro) | fondo |
| `--surface` | `#FFFFFF` | `#121A2E` | cards |
| `--ink` | `#0F172A` | `#E8EAF2` | texto principal |
| `--muted` | `#5B6478` | `#9AA3B8` | texto secundario |
| `--line` | `#E3E4DE` | `#233049` | bordes, grilla |
| `--accent` | `#2F55FF` (cobalto) | `#6C8CFF` | CTAs, links, nodos activos |
| `--accent-2` | `#D8F45A` (lima ácida) | `#D8F45A` | highlights de datos, status pill; **uso escaso** |
| `--ok` | `#16A34A` | `#4ADE80` | disponibilidad |

Contraste verificado AA en ambos modos para texto sobre `--bg` y `--surface`. Dark mode por `prefers-color-scheme`
con toggle manual persistido.

### 4.3 Tipografía (self-hosted, subset latin, `font-display: swap`)

- **Display / títulos:** Space Grotesk 500–700. Personalidad geométrica, lee "tech" sin ser fría.
- **Texto:** Inter 400–600. Legibilidad máxima en móvil.
- **Mono (etiquetas, chips, números de sección, nodos de diagrama):** JetBrains Mono 400–500.

Escala fluida con `clamp()`: H1 40→72px, H2 28→44px, H3 22→28px, body 16→18px, small 14px, mono 12–13px.

### 4.4 Espaciado y layout

Base 4px. Secciones: 64px móvil / 112px desktop. Contenedor 1200px, gutter 16px móvil / 24px tablet / 32px desktop.
Grid 12 columnas. Radios: 12px cards, 999px chips y pills. Sombras mínimas (1 nivel), los bordes hacen el trabajo.

### 4.5 Componentes

`Button` (primary / secondary / ghost / icon) · `Chip` (tech, con punto de color por capa) · `SectionHeader`
(número mono "01" + título + lead) · `ProjectCardFeatured` (imagen 16:10, categoría, 3 chips, flecha) ·
`ProjectCardCompact` · `ArchitectureDiagram` (SVG desde datos: nodos + conectores animados) · `Timeline` ·
`ProofStrip` · `Gallery` (lightbox, lazy) · `StatusPill` · `LanguageSwitcher` · `ThemeToggle` · `CVMenu` ·
`ContactCard` · `WhatsAppButton` · `RepoBadge` (public / private / institutional) · `ProjectNav` (prev/next).

### 4.6 Iconografía

Lucide (SVG inline, solo los usados). Nada de muro de logos: las tecnologías son chips de texto con punto de color.

### 4.7 Animación (todo bajo `prefers-reduced-motion: reduce` → off)

- Hero: entrada escalonada de eyebrow → H1 → sub → CTAs (200ms, easing suave).
- Reveal al scroll con IntersectionObserver (translateY 16px + opacity, una sola vez).
- Cards: hover con lift 4px + la imagen escala 1.03; en touch no hay hover, no se pierde nada.
- Diagramas de arquitectura: los conectores se "dibujan" (stroke-dashoffset) al entrar en viewport.
- Transiciones entre páginas con View Transitions (la card del proyecto se convierte en el hero del detalle).
- Grilla de puntos del fondo con parallax leve (solo desktop, `transform` en GPU).
- Cero WebGL, cero lluvia de código, cero cursores custom.

### 4.8 Responsive

Mobile-first. Breakpoints 640 / 768 / 1024 / 1280 / 1536. Hero a una columna en móvil con CTAs a ancho completo,
proyectos en 1 → 2 → 3 columnas, diagramas de arquitectura se vuelven verticales bajo 768px.

---

## FASE 5 — Stack

### 5.1 Comparación

| Criterio | Astro 5 | Next.js 15 | React + Vite (SPA) |
|---|---|---|---|
| Performance / CWV | JS cero por defecto, islas solo donde hay interacción | Bueno, pero envía runtime React en cada página | Peor: todo cliente |
| SEO / SSG | Nativo, sitemap oficial | Bueno (App Router) | Malo sin prerender |
| Páginas dinámicas de proyectos | Content Collections tipadas + `getStaticPaths` | Sí | Sí, pero sin SSG |
| i18n con 6 idiomas | Routing i18n integrado | Middleware + config manual | Manual |
| Animaciones | View Transitions nativas + Motion en islas | Framer Motion (pesado) | Igual que Next |
| Panel admin para imágenes | **Keystatic soporte oficial** | Keystatic soporte oficial | No aplica |
| Mantenimiento | Bajo: contenido = archivos | Medio | Bajo |
| Sobreingeniería | No | Un poco para un sitio de contenido | No, pero no cumple SEO |

### 5.2 Elección

- **Astro 5 + TypeScript** — sitio estático (prerender) con dos rutas server-side solo para el admin.
- **Tailwind CSS 4** con tokens CSS propios (el design system vive en `:root`, Tailwind consume las variables).
- **Content Collections** — cada proyecto es un archivo con schema tipado (Zod): título, slug, categorías, stack,
  imágenes, links, problem/solution/role/architecture/features/results por idioma, `featured`, `order`, `draft`.
- **Keystatic** — panel admin en `/keystatic`. Modo local en desarrollo (edita archivos), modo GitHub en
  producción (login con tu cuenta, cada guardado es un commit → redeploy automático). Sube imágenes al repo y
  Astro las optimiza en build (`<Image>`: webp/avif, tamaños, lazy). Sin base de datos, sin costo, con historial.
- **Motion** (vanilla, ~5 KB) solo en islas que lo necesiten; el resto es CSS + IntersectionObserver.
- **Astro i18n** + diccionarios `src/i18n/{es,en,pt,fr,de,it}.ts` para la UI; contenido por idioma dentro de
  cada entrada, con fallback a español cuando falte una traducción.
- **@astrojs/sitemap**, componente `Seo.astro` (title, description, canonical, OG, Twitter, hreflang),
  JSON-LD `Person` en home y `SoftwareSourceCode`/`CreativeWork` por proyecto, `robots.txt`.
- **Deploy:** Vercel o Netlify (adapter Astro), ambos gratis para este tamaño. Recomiendo **Vercel**.
- **Calidad:** ESLint + Prettier, `astro check` (TypeScript), Lighthouse CI en QA.

### 5.3 Qué NO se usa y por qué

Next.js (runtime innecesario para un sitio de contenido), Payload/Strapi (requieren base de datos y hosting con
estado para lo que resuelve un CMS git-based), Framer Motion (30 KB para animaciones que CSS hace), Three.js/WebGL
(prohibido por brief), Turborepo/monorepo (un solo paquete).

### 5.4 Estructura del proyecto

```
PORTFOLIO/
├── docs/                     auditoría y propuestas (este archivo)
├── public/
│   ├── cv/                   fabricio-carol-cv-es.pdf · -en.pdf   ← los subís vos
│   ├── robots.txt · favicon · og-default.png
├── src/
│   ├── content/
│   │   ├── projects/         un .json/.mdx por proyecto (editable desde /keystatic)
│   │   ├── experience/
│   │   ├── about/            textos + galería de imágenes
│   │   └── aeon/
│   ├── assets/               imágenes subidas (proyectos/, about/, aeon/) — optimizadas en build
│   ├── i18n/                 es.ts en.ts pt.ts fr.ts de.ts it.ts + utils
│   ├── data/                 tech.ts (catálogo de tecnologías: nombre, capa, color) · site.ts (metadata central)
│   ├── components/           ui/ · sections/ · project/ · seo/
│   ├── layouts/
│   ├── pages/                index · projects/ · about · experience · aeon · contact · [locale]/...
│   └── styles/               tokens.css · global.css
├── keystatic.config.ts
├── astro.config.mjs · tailwind config · tsconfig.json · package.json
```

Agregar un proyecto = crear una entrada desde el admin. Agregar un idioma = un diccionario nuevo + activar el locale.
Agregar una tecnología = una línea en `tech.ts`. Ninguno de los tres toca componentes.
