# FASES 7–8 — Control de calidad y revisión crítica

Fecha: 2026-09-18.

---

## FASE 7 — Verificación

Todo lo de abajo se comprobó ejecutando el sitio, no leyendo el código.

| Control | Resultado |
|---|---|
| Compilación | 84 páginas, sin errores |
| TypeScript (`astro check`) | 0 errores, 0 advertencias |
| Enlaces internos y recursos | 2532 verificados, **0 rotos** |
| Contraste modo claro | 310 elementos, 0 fallos tras corregir |
| Contraste modo oscuro | 0 fallos tras corregir |
| Encabezados | Un solo `h1` por página, jerarquía correcta |
| Controles sin nombre accesible | 0 |
| Navegación por teclado | El salto al contenido es el primer elemento; el menú móvil atrapa el foco y devuelve el foco al cerrar |
| Desborde horizontal en móvil | Ninguno a 375 px |
| Idiomas | Los seis generan páginas; inglés completo; los parciales avisan y caen a español |
| Imágenes sin texto alternativo | 0 |

### Rendimiento medido sobre lo compilado

| Métrica | Valor |
|---|---|
| JavaScript de la portada | 16 KB (solo transiciones entre páginas) |
| CSS | 39 KB |
| HTML de la portada | 91 KB |
| Fuentes que descarga un visitante | ~108 KB (solo el subconjunto latino) |

El panel de administración pesa unos 2,9 MB, pero **solo se descarga al entrar a `/keystatic`**.
Ningún visitante del sitio lo carga.

### Errores encontrados y corregidos

Ocho problemas reales, todos detectados probando el sitio:

1. **El filtro de proyectos no mostraba nada.** La tarjeta descartaba el atributo de categorías
   que le pasaba el índice. Ahora la tarjeta escribe sus propias categorías, así el filtro y lo
   que se muestra no pueden desincronizarse.
2. **El texto del filtro activo desaparecía.** Al hacer clic y dejar el cursor encima, la clase
   de hover pintaba texto azul sobre fondo azul. Los estilos de hover ahora pertenecen solo al
   estado inactivo.
3. **Todo botón primario fallaba el contraste en modo oscuro** (3,07:1). El modo oscuro aclara
   el color de acento, así que el texto blanco encima quedaba ilegible. Se agregó un token para
   el color del texto sobre el acento: ahora 6,16:1 en ambos modos.
4. **Las animaciones podían dejar el contenido invisible para siempre.** El sitio revela cada
   sección con un observador de scroll que solo entrega avisos mientras el navegador está
   dibujando la página. Un primer intento de red de seguridad no alcanzó, y un segundo tampoco:
   dependía del mismo ciclo de dibujado que deja de ejecutarse en esa exacta situación, o sea que
   fallaba junto con lo que venía a cubrir. La versión final barre la página por su cuenta, con el
   scroll y con temporizadores, sin depender de ninguno de los dos mecanismos. Verificado
   recorriendo la portada entera: los 38 elementos aparecen progresivamente hasta quedar cero
   ocultos.
5. **El diagrama de arquitectura era ilegible en móvil.** El SVG se escalaba a 309 px y dejaba
   cajas de 60 px. En teléfonos ahora se arma con HTML, que no depende de escalado.
6. **El diagrama era ilegible también en escritorio**, encajonado en una columna angosta. Se
   rediseñó la página de proyecto a una sola columna: el diagrama pasó de 490 a 1086 px.
7. **Cinco enlaces rotos** hacia páginas 404 por idioma que no existían. Ahora existen y están
   traducidas.
8. **La insignia de borrador no llegaba al contraste mínimo** (3,53:1).

### Lo que la revisión crítica agregó

- **Imagen para compartir en redes.** El sitio la declaraba pero el archivo no existía: cualquier
  enlace compartido en LinkedIn se habría visto vacío. Se genera desde los tokens del propio
  diseño con `scripts/generate-brand-assets.mjs`, junto con el favicon.
- **Los botones de CV aparecen solos.** Se verifica al compilar si los PDF existen. Mientras no
  estén, el botón no se muestra: un recruiter que hace clic en "Descargar CV" y recibe un error
  es peor que no ver el botón. Cuando subas los archivos, se activan sin tocar código.
- **Precarga de las dos fuentes visibles de entrada**, para que el título no parpadee.

---

## FASE 8 — Revisión crítica

### ¿Parece el portfolio de alguien que puede trabajar en una empresa de tecnología?

Sí, y por una razón concreta: las fichas de proyecto explican **decisiones**, no funcionalidades.
La de Virtual-Fit dice por qué el proveedor de IA se resuelve en cada trabajo y no al arrancar,
por qué el resultado se guarda en almacenamiento propio, y qué error real motivó separar la base
de datos de las pruebas. Eso es lo que distingue a alguien que construyó algo de alguien que
siguió un tutorial.

### ¿Un recruiter entiende rápido quién sos?

En los primeros 40 píxeles de scroll: rol, promesa, disponibilidad y tres botones. Después,
sin leer un párrafo: tres datos duros, siete proyectos con su categoría y su stack, y la
experiencia. El stack aparece **después** de los proyectos y la experiencia, a propósito: lo que
hiciste pesa más que lo que sabés.

### ¿Un cliente entiende qué podés construir?

ÆON tiene página propia con servicios en lenguaje de negocio, no técnico ("procesos repetitivos
que hoy alguien hace a mano"), un proceso de trabajo de cuatro pasos y WhatsApp propio. Está
separado del perfil de empleo, así que ninguna de las dos audiencias lee lo que no le sirve.

### ¿Hay algo que parezca amateur o exagerado?

Se revisó con ese criterio y se corrigieron tres cosas:

- **Ninguna métrica inventada.** La sección de resultados existe en el esquema pero está vacía en
  los siete proyectos, y **no se renderiza** cuando está vacía. Las métricas que traía el README
  de Micropasajes no se publicaron porque no son verificables.
- **Virtual-Fit no dice lo que no hace.** El pedido original mencionaba segmentación, detección
  de pose y deformación de prendas; la especificación del proyecto los excluye explícitamente.
  La ficha describe lo que el sistema realmente hace.
- **Los repositorios privados se declaran privados**, con cuatro estados distintos y honestos:
  público, privado con código a pedido, despliegue institucional en servidores del organismo, y
  proyecto de cliente.

### Lo que sigue siendo débil

1. **No hay una sola imagen.** Es lo que más le falta al sitio hoy. Los marcadores están
   resueltos con dignidad, pero un portfolio sin capturas pierde mucho. Es lo primero que
   deberías cargar.
2. **Seis de las siete fichas están marcadas como borrador**: AgroCordS, Puerta a Puerta,
   Juventud, Tránsito, Micropasajes y More Agile llevan texto que escribí a partir de lo que me
   contaste, y que **tenés que revisar** antes de publicar. Virtual-Fit es la única verificada
   íntegramente contra su código. Cada una muestra un aviso en su página hasta que le saques la
   marca desde el panel.
3. **Faltan los CV.** Sin ellos no hay botón de descarga.

---

## Conectar el panel en producción

Mientras trabajás localmente no hace falta nada. Para editar desde el sitio publicado:

1. Subí el repo a GitHub y desplegá en Vercel.
2. Abrí `https://tu-dominio/keystatic` y seguí el asistente **Create GitHub App**.
3. Copiá a `.env` las cuatro variables que genera (están listadas en `.env.example`) y cargá las
   mismas en Vercel, en la configuración de variables de entorno del proyecto.
4. En `keystatic.config.ts`, cambiá el almacenamiento a modo GitHub:

```ts
storage: {
  kind: 'github',
  repo: { owner: 'Fabry01000011', name: 'NOMBRE-DEL-REPO' },
}
```

Desde ahí, cada vez que guardes algo en el panel se crea un commit y Vercel vuelve a desplegar
en uno o dos minutos.

---

## Pendientes para vos

| Prioridad | Tarea |
|---|---|
| Alta | Cargar capturas de al menos los tres proyectos destacados |
| Alta | Revisar y corregir las seis fichas marcadas como borrador |
| Alta | Subir los dos CV a `public/cv/` sin DNI ni fecha de nacimiento |
| Media | Definir el dominio y actualizar `SITE_URL` en `src/config/site.mjs` |
| Media | Confirmar los datos que quedaron pendientes en la auditoría (hackathon de AgroCordS, stack real del sistema de Tránsito, socios y logo de ÆON) |
| Media | Reordenar los repos fijados en GitHub: hoy el primero es un proyecto de 2022 |
| Baja | Completar las traducciones de portugués, francés, alemán e italiano |
| Baja | Rotar la clave de Gemini que quedó expuesta en un transcript de Virtual-Fit |
