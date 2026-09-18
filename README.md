# Portfolio — Fabricio Carol

Portfolio profesional en Astro 7, con panel de administración propio y seis idiomas.

**Documentos del proceso:** [auditoría del material](docs/fase-1-auditoria.md) ·
[posicionamiento, arquitectura, diseño y stack](docs/fase-2-5-propuesta.md) ·
[control de calidad y pendientes](docs/fase-7-8-qa.md)

---

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Compila el sitio a `dist/` |
| `npm run preview` | Sirve lo compilado, tal como saldrá en producción |
| `npm run check` | Verifica tipos de TypeScript y Astro |
| `npm run format` | Formatea todo el código |
| `node scripts/generate-brand-assets.mjs` | Regenera la imagen social y el favicon |

Requiere Node 22.12 o superior.

---

## Panel de administración

El panel vive en `/keystatic`. Desde ahí editás **todo el contenido del sitio sin tocar código**:
proyectos, capturas, logos, links de demo, experiencia, textos de "Sobre mí" y de ÆON.

- **En desarrollo** funciona sin configurar nada: entrá a http://localhost:4321/keystatic y los
  cambios se guardan directamente en los archivos del proyecto.
- **En producción** hay que conectarlo a GitHub para que cada cambio quede versionado. Los pasos
  están en [docs/fase-7-8-qa.md](docs/fase-7-8-qa.md#conectar-el-panel-en-producción).

Las imágenes que subís desde el panel se guardan en `src/assets/` y Astro las optimiza sola al
compilar: genera webp, varios tamaños y carga diferida.

---

## Qué tenés que cargar vos

| Qué | Dónde | Qué pasa mientras tanto |
|---|---|---|
| CV en español e inglés | `public/cv/` con los nombres exactos que indica `public/cv/LEER-ME.txt` | Los botones de descarga **no se muestran**, así nadie encuentra un enlace roto |
| Capturas de proyectos | Panel → Proyectos → Galería | Se muestra un recuadro que dice "capturas en preparación" |
| Imagen de portada de cada proyecto | Panel → Proyectos → Imagen de portada | La tarjeta muestra un marcador con el nombre del proyecto |
| Foto tuya | Panel → Sobre mí → Foto principal | Marcador neutro, sin foto de archivo |
| Fotos de "Sobre mí" | Panel → Sobre mí → Galería de fotos | Recuadro "fotos en preparación" |
| Links de demo y repositorio | Panel → Proyectos → Enlaces | El botón no aparece |

Ningún marcador inventa contenido ni finge que algo existe.

---

## Estructura

```
src/
├── config/site.mjs        URL del sitio, idiomas. Lo lee también astro.config
├── data/
│   ├── site.ts            Nombre, contacto, redes, ÆON. Ningún componente hardcodea un dato
│   └── tech.ts            Catálogo de tecnologías, con su capa y su nivel real
├── i18n/                  es · en completos · pt, fr, de, it parciales con respaldo a español
├── content/
│   ├── projects/          Un archivo por proyecto
│   ├── experience/        Un archivo por puesto
│   └── pages/             Sobre mí · ÆON
├── content.config.ts      Esquema de los datos, con validación
├── lib/                   Helpers: contenido, diagramas, SEO, CV
├── components/
│   ├── ui/ sections/ project/ layout/ seo/ pages/
├── layouts/BaseLayout.astro
├── pages/                 Rutas en español + [locale]/ para los otros cinco idiomas
└── styles/global.css      Todos los tokens de diseño viven acá
```

### Cómo agregar cosas

- **Un proyecto nuevo:** Panel → Proyectos → crear. No se toca ningún componente.
- **Un idioma nuevo:** agregarlo en `src/config/site.mjs` y crear su diccionario en `src/i18n/`.
- **Una tecnología nueva:** una línea en `src/data/tech.ts`.
- **Cambiar la paleta:** las variables de `src/styles/global.css`, en un solo lugar.

---

## Decisiones que conviene conocer

- **Astro y no Next.js.** Es un sitio de contenido: Astro manda cero JavaScript por defecto.
  La portada carga 16 KB de JavaScript, y es solo el de las transiciones entre páginas.
- **El panel no necesita servidor ni base de datos.** Cada cambio es un commit en el repo y el
  sitio se vuelve a desplegar solo.
- **El español no lleva prefijo en la URL** y los demás idiomas sí. Las rutas son siempre las
  mismas en inglés, así hay un solo mapa de rutas para mantener.
- **Los diagramas de arquitectura se generan desde los datos.** Nadie dibuja cajas: se describen
  los componentes y sus conexiones, y el sitio calcula el diagrama.
- **Las animaciones nunca esconden contenido.** Si el navegador no entrega los eventos de scroll,
  un temporizador muestra todo igual. Con "reducir movimiento" activado no se anima nada.
- **Los proyectos sin ficha terminada se muestran igual**, con una marca visible. Esconderlos
  sería enterrar los trabajos más fuertes.

---

## Despliegue

Pensado para Vercel. El adaptador ya está configurado y el sitio compila estático.

1. Subí el repo a GitHub.
2. En Vercel, importá el repo. No hace falta configurar nada: detecta Astro.
3. Cambiá `SITE_URL` en `src/config/site.mjs` por el dominio definitivo.
4. Para el panel en producción, seguí los pasos de la documentación de control de calidad.
