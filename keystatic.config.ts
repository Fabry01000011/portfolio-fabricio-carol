import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Admin panel at /keystatic.
 *
 * Local mode while developing (edits files on disk). In production, switch
 * `storage` to GitHub mode so each save is a commit and Vercel redeploys:
 *
 *   storage: { kind: 'github', repo: { owner: 'Fabry01000011', name: '<repo>' } }
 *
 * Images are written into src/assets so Astro optimises them at build time;
 * publicPath uses /src/… which is what the content schema's image() helper needs.
 */

/**
 * Per-locale text overrides. Anything left blank falls back to Spanish, so a
 * half-translated entry still renders complete.
 *
 * These are factory functions rather than shared constants because Keystatic
 * fields carry their own identity; reusing one instance across locales makes
 * every locale edit the same field.
 */
const projectTranslation = () =>
  fields.object({
    title: fields.text({ label: 'Título' }),
    tagline: fields.text({ label: 'Bajada' }),
    summary: fields.text({ label: 'Resumen', multiline: true }),
    problem: fields.text({ label: 'El problema', multiline: true }),
    solution: fields.text({ label: 'La solución', multiline: true }),
    role: fields.text({ label: 'Mi participación', multiline: true }),
  });

const experienceTranslation = () =>
  fields.object({
    role: fields.text({ label: 'Puesto' }),
    period: fields.text({ label: 'Período' }),
    summary: fields.text({ label: 'Resumen', multiline: true }),
  });

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Portfolio · Fabricio Carol' },
    navigation: {
      Contenido: ['projects', 'experience'],
      Páginas: ['about', 'aeon'],
    },
  },

  collections: {
    projects: collection({
      label: 'Proyectos',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { data: 'json' },
      columns: ['title', 'order'],
      entryLayout: 'form',
      schema: {
        title: fields.slug({
          name: { label: 'Título', description: 'Nombre del proyecto.' },
          slug: {
            label: 'URL',
            description:
              'Se usa en la dirección: /projects/<url>. Cambiarla rompe enlaces existentes.',
          },
        }),
        tagline: fields.text({
          label: 'Bajada',
          description: 'Una línea que aparece debajo del título.',
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: 'Resumen',
          description: 'Una o dos oraciones. Se usa en las tarjetas y en los buscadores.',
          multiline: true,
          validation: { isRequired: true },
        }),

        order: fields.integer({
          label: 'Orden',
          description: 'Menor número aparece primero.',
          defaultValue: 99,
        }),
        featured: fields.checkbox({
          label: 'Destacado',
          description: 'Aparece grande en la portada.',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Ficha en preparación',
          description: 'Muestra un aviso en la página y lo saca de los destacados de la portada.',
          defaultValue: false,
        }),

        year: fields.text({ label: 'Año' }),
        client: fields.text({ label: 'Cliente' }),
        status: fields.text({
          label: 'Estado',
          description: 'Por ejemplo: En producción, Demo pública, En desarrollo.',
        }),
        team: fields.text({ label: 'Equipo' }),

        categories: fields.array(fields.text({ label: 'Categoría' }), {
          label: 'Categorías',
          itemLabel: (props) => props.value,
        }),

        technologies: fields.array(fields.text({ label: 'Tecnología' }), {
          label: 'Tecnologías',
          description:
            'Identificadores del catálogo en src/data/tech.ts, por ejemplo: node, postgresql, react.',
          itemLabel: (props) => props.value,
        }),

        problem: fields.text({ label: 'El problema', multiline: true }),
        solution: fields.text({ label: 'La solución', multiline: true }),
        role: fields.text({ label: 'Mi participación', multiline: true }),

        features: fields.array(
          fields.object({
            title: fields.text({ label: 'Título' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Funcionalidades', itemLabel: (props) => props.fields.title.value },
        ),

        highlights: fields.array(
          fields.object({
            title: fields.text({ label: 'Título' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Decisiones técnicas', itemLabel: (props) => props.fields.title.value },
        ),

        results: fields.array(
          fields.object({
            label: fields.text({ label: 'Descripción' }),
            value: fields.text({ label: 'Valor' }),
          }),
          {
            label: 'Resultados',
            description: 'Solo datos verificables. Si no hay, dejar vacío.',
            itemLabel: (props) => props.fields.label.value,
          },
        ),

        architecture: fields.object(
          {
            nodes: fields.array(
              fields.object({
                id: fields.text({ label: 'Identificador' }),
                label: fields.text({ label: 'Nombre' }),
                kind: fields.select({
                  label: 'Tipo',
                  options: [
                    { label: 'Cliente', value: 'client' },
                    { label: 'Frontend', value: 'frontend' },
                    { label: 'API', value: 'api' },
                    { label: 'Servicio', value: 'service' },
                    { label: 'Worker', value: 'worker' },
                    { label: 'Base de datos', value: 'database' },
                    { label: 'Almacenamiento', value: 'storage' },
                    { label: 'Externo', value: 'external' },
                  ],
                  defaultValue: 'api',
                }),
                description: fields.text({ label: 'Detalle' }),
              }),
              { label: 'Componentes', itemLabel: (props) => props.fields.label.value },
            ),
            edges: fields.array(
              fields.object({
                from: fields.text({ label: 'Desde (identificador)' }),
                to: fields.text({ label: 'Hacia (identificador)' }),
                label: fields.text({ label: 'Etiqueta' }),
              }),
              {
                label: 'Conexiones',
                itemLabel: (props) => `${props.fields.from.value} → ${props.fields.to.value}`,
              },
            ),
            note: fields.text({ label: 'Nota al pie', multiline: true }),
          },
          { label: 'Arquitectura' },
        ),

        logo: fields.image({
          label: 'Logo del proyecto',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
        }),
        cover: fields.image({
          label: 'Imagen de portada',
          description: 'Se muestra en la tarjeta del proyecto. Proporción recomendada 16:10.',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
        }),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: 'Imagen',
              directory: 'src/assets/projects',
              publicPath: '/src/assets/projects/',
              validation: { isRequired: true },
            }),
            alt: fields.text({
              label: 'Texto alternativo',
              description: 'Describe la imagen para quien no puede verla.',
              validation: { isRequired: true },
            }),
            caption: fields.text({ label: 'Epígrafe' }),
          }),
          { label: 'Galería', itemLabel: (props) => props.fields.alt.value || 'Imagen' },
        ),

        links: fields.object(
          {
            demo: fields.url({ label: 'Demo' }),
            repo: fields.url({ label: 'Repositorio' }),
            extra: fields.array(
              fields.object({
                label: fields.text({ label: 'Texto' }),
                url: fields.url({ label: 'Dirección' }),
              }),
              { label: 'Otros enlaces', itemLabel: (props) => props.fields.label.value },
            ),
          },
          { label: 'Enlaces' },
        ),

        repoStatus: fields.select({
          label: 'Estado del repositorio',
          options: [
            { label: 'Público', value: 'public' },
            { label: 'Privado (código a pedido)', value: 'private' },
            { label: 'Despliegue institucional', value: 'institutional' },
            { label: 'Proyecto de cliente', value: 'client' },
            { label: 'No mostrar', value: 'none' },
          ],
          defaultValue: 'none',
        }),

        aeon: fields.checkbox({
          label: 'Proyecto de ÆON',
          description: 'Lo muestra también en la página de ÆON.',
          defaultValue: false,
        }),

        i18n: fields.object(
          {
            en: projectTranslation(),
            pt: projectTranslation(),
            fr: projectTranslation(),
            de: projectTranslation(),
            it: projectTranslation(),
          },
          { label: 'Traducciones' },
        ),
      },
    }),

    experience: collection({
      label: 'Experiencia',
      slugField: 'organisation',
      path: 'src/content/experience/*',
      format: { data: 'json' },
      columns: ['organisation', 'period'],
      schema: {
        organisation: fields.slug({ name: { label: 'Organización' } }),
        role: fields.text({ label: 'Puesto', validation: { isRequired: true } }),
        period: fields.text({
          label: 'Período',
          description: 'Texto libre, por ejemplo: Enero 2026 — Agosto 2026.',
          validation: { isRequired: true },
        }),
        startDate: fields.text({
          label: 'Fecha de inicio',
          description: 'Formato AAAA-MM. Solo se usa para ordenar.',
          validation: { isRequired: true },
        }),
        location: fields.text({ label: 'Ubicación' }),
        summary: fields.text({
          label: 'Resumen',
          multiline: true,
          validation: { isRequired: true },
        }),
        highlights: fields.array(fields.text({ label: 'Responsabilidad', multiline: true }), {
          label: 'Responsabilidades',
          itemLabel: (props) => props.value.slice(0, 60),
        }),
        technologies: fields.array(fields.text({ label: 'Tecnología' }), {
          label: 'Tecnologías',
          itemLabel: (props) => props.value,
        }),
        kind: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Técnica', value: 'tech' },
            { label: 'Comercial', value: 'commercial' },
          ],
          defaultValue: 'tech',
        }),
        current: fields.checkbox({ label: 'Actual', defaultValue: false }),
        i18n: fields.object(
          {
            en: experienceTranslation(),
            pt: experienceTranslation(),
            fr: experienceTranslation(),
            de: experienceTranslation(),
            it: experienceTranslation(),
          },
          { label: 'Traducciones' },
        ),
      },
    }),
  },

  singletons: {
    about: singleton({
      label: 'Sobre mí',
      path: 'src/content/pages/about',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Título', defaultValue: 'Sobre mí' }),
        body: fields.array(fields.text({ label: 'Párrafo', multiline: true }), {
          label: 'Texto',
          itemLabel: (props) => props.value.slice(0, 60),
        }),
        portrait: fields.image({
          label: 'Foto principal',
          description: 'Aparece al costado del texto. Proporción recomendada 4:5.',
          directory: 'src/assets/about',
          publicPath: '/src/assets/about/',
        }),
        portraitAlt: fields.text({ label: 'Texto alternativo de la foto' }),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: 'Imagen',
              directory: 'src/assets/about',
              publicPath: '/src/assets/about/',
              validation: { isRequired: true },
            }),
            alt: fields.text({ label: 'Texto alternativo', validation: { isRequired: true } }),
            caption: fields.text({ label: 'Epígrafe' }),
          }),
          { label: 'Galería de fotos', itemLabel: (props) => props.fields.alt.value || 'Imagen' },
        ),
        facts: fields.array(
          fields.object({
            label: fields.text({ label: 'Etiqueta' }),
            value: fields.text({ label: 'Valor' }),
          }),
          { label: 'Datos', itemLabel: (props) => props.fields.label.value },
        ),
      },
    }),

    aeon: singleton({
      label: 'ÆON',
      path: 'src/content/pages/aeon',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Título', defaultValue: 'ÆON Software Solutions' }),
        body: fields.array(fields.text({ label: 'Párrafo', multiline: true }), {
          label: 'Texto',
          itemLabel: (props) => props.value.slice(0, 60),
        }),
        services: fields.array(
          fields.object({
            title: fields.text({ label: 'Servicio' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
            icon: fields.select({
              label: 'Ícono',
              options: [
                { label: 'Base de datos', value: 'database' },
                { label: 'Pantalla', value: 'layout' },
                { label: 'Carrito', value: 'shopping-cart' },
                { label: 'Conector', value: 'plug' },
                { label: 'Rayo', value: 'zap' },
                { label: 'Llave', value: 'wrench' },
              ],
              defaultValue: 'layout',
            }),
          }),
          { label: 'Servicios', itemLabel: (props) => props.fields.title.value },
        ),
        steps: fields.array(
          fields.object({
            title: fields.text({ label: 'Paso' }),
            description: fields.text({ label: 'Descripción', multiline: true }),
          }),
          { label: 'Proceso', itemLabel: (props) => props.fields.title.value },
        ),
      },
    }),
  },
});
