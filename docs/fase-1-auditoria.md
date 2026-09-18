# FASE 1 — Auditoría del material real (Portfolio Fabricio Carol)

Fecha: 2026-09-18. Objetivo: separar lo **confirmado por evidencia** de lo que falta o contradice,
antes de escribir una sola línea de copy o código.

## 1. Fuentes analizadas

| Fuente | Qué aportó |
|---|---|
| `cv_Fabricio-Carol.pdf_2026_6_18.pdf` (Downloads) | CV más reciente, ya orientado a "Desarrollador Backend / Full Stack". Es la base. |
| `IT-cv-Fabricio-Carol.pdf_2026_1_17.pdf` (Documents) | Versión enero 2026 orientada a IT/soporte. |
| `Asesor-cv-Fabricio_Carol.pdf_2026_1_17.pdf` (Downloads) | Versión enero 2026 orientada a ventas/asesor. Contiene la experiencia comercial (Movilmar). |
| Perfil GitHub `Fabry01000011` + README de perfil + 13 repos públicos | Stack declarado, proyectos públicos, repos pinneados, contacto. |
| Demo pública https://micropasajes.netlify.app/ + repo `micropasajes-portfolio` (docs/) | Proyecto 05 (pasajes). |
| Repo local `D:\codebase\Claudio\virtual-fit` (CLAUDE.md, docs/PROJECT.md, git log, código) | Proyecto 02 (Virtual-Fit) con detalle técnico verificable. |
| `D:\codebase\first-proyect\` (Virtual-3d-try-on, Virtual-fit multi-tenant spec) | Iteraciones anteriores del mismo concepto. |
| `D:\codebase\PaPx2-main\` (Puerta a Puerta X) | App de delivery. Autoría **sin confirmar**. |

No se encontró en ningún lado: material de **AgroCordS**, de **Agile / More Agile**, ni de **ÆON** más
allá de un footer.

## 2. Perfil confirmado (publicable)

- **Nombre:** Fabricio Leonel Carol. Ubicación actual: Córdoba Capital, Argentina. Origen/estudios: Santiago del Estero.
- **Formación:** Técnico Superior en Desarrollo de Software, Instituto Tecnológico de Santiago del Estero (ITSE), 2023–2025, graduado.
- **Idiomas:** español nativo, inglés intermedio (B1/B2), portugués intermedio.
- **Experiencia (fechas según CV jun-2026):**
  - **Analista de Sistemas y Soporte Técnico Operativo — Tarjeta Cencosud / Cencopay** (ene 2026–actualidad). Plataforma Engage5® Business Solution 5, productos financieros y tarjetas. Análisis de incidencias, validación de datos, verificación de reglas de negocio en procesos transaccionales, pruebas funcionales, documentación técnica, consultas a bases de datos.
  - **Pasantía Desarrollo de Software — Gobierno de Santiago del Estero** (feb 2024–dic 2025). Dirección de la Juventud: sistema de gestión de programas, actividades y beneficiarios. Dirección de Tránsito Municipal: actualización y optimización del sistema de gestión de taxis y habilitaciones; mantenimiento de módulos administrativos.
  - **Desarrollador de Software Freelance** (2020–actualidad). Workana, Upwork, clientes directos. Apps web, APIs REST, sistemas administrativos, mantenimiento evolutivo.
  - **Vendedor y Asesor de Productos Tecnológicos — Movilmar, CABA** (feb 2021–feb 2023). Venta consultiva, MercadoShops, control de stock, reparación básica de celulares. *(Solo aparece en el CV "Asesor".)*
- **Contacto confirmado en ≥2 fuentes:** fabricioleonelcarol@gmail.com · linkedin.com/in/fabricio-carol · github.com/Fabry01000011.

## 3. Stack: evidencia real vs. declaración

Leyenda: **✅ código real** · **📄 solo CV** · **❓ solo en el prompt** · **✖ no aparece en ningún lado**

| Grupo | Tecnología | Evidencia |
|---|---|---|
| Lenguajes | JavaScript | ✅ todos los repos |
| | TypeScript | ✅ virtual-fit (monorepo completo en TS) |
| | SQL | ✅ (mysql2 crudo en DireccionJuventud, Prisma en virtual-fit, migraciones SQL en PaPx2 si es tuyo) |
| | Python, Java, PHP | 📄 CV. Sin repos. |
| Backend | Node.js, Express | ✅ dirtrans (Express 5), DireccionJuventud (Express 5 + JWT + bcrypt), PaPx2 |
| | NestJS | ✅ virtual-fit (no está en el CV; conviene agregarlo) |
| | REST APIs | ✅ |
| | Spring Boot, FastAPI, Django | 📄 CV jun-2026. Sin evidencia. |
| Bases de datos | MySQL | ✅ DireccionJuventud (`mysql2/promise`, DB `juventud_sde`) |
| | PostgreSQL | ✅ virtual-fit (Prisma 6) + PaPx2 (Supabase) |
| | Redis | ✅ virtual-fit (BullMQ, sesiones admin) |
| | Prisma / Sequelize | ✅ Prisma · 📄 Sequelize |
| | SQL Server, Oracle | 📄 CV. Sin evidencia. Cencopay puede justificarlo: **confirmar motor real**. |
| | MongoDB | 📄 CV + descripción del repo `direccion-de-la-juventud-sde` (que solo tiene LICENSE). Débil. |
| | T-SQL | ✖ no aparece ni en el CV. **No publicar salvo que lo confirmes.** |
| Frontend | React | ✅ probable (frontend de DireccionJuventud tiene package.json/src) · Next.js 15 en virtual-fit admin |
| | Preact | ✅ virtual-fit widget (24 KB, shadow DOM) |
| | React Native / Expo | 📄 CV. Sin repos. |
| | HTML/CSS/Tailwind | ✅ |
| Infra | Docker | ✅ virtual-fit (compose + Dockerfile) |
| | Linux/Debian, PM2, Tailscale | ❓ solo en el prompt (deploy de Juventud). Plausible, sin evidencia. |
| | GitHub Actions | ✅ PaPx2 (si es tuyo) · 📄 CV |
| | Vercel / Netlify / Railway / Supabase | ✅ Netlify (micropasajes, Virtual-3d), Vercel+Railway+Supabase (PaPx2) |
| Testing | Jest, Supertest | ✅ virtual-fit (4 suites e2e, 32 `it()`) · 📄 JUnit |
| IA | Gemini API | ✅ sounds-of-the-city (chatbot) + adaptador virtual-fit (implementado, sin cuota) |
| Metodologías | Scrum, Kanban | 📄 CV |
| Diseño | Figma, Canva | 📄 CV |
| Redes | LAN/WAN, cableado | 📄 CV IT. **Recomiendo no incluirlo:** diluye la identidad de developer. |

**Recomendación:** publicar como "stack principal" solo ✅ y las 📄 que puedas defender en entrevista
(Python/Java/PHP como "también trabajé con"). Sacar T-SQL, redes, y bajar Django/FastAPI/Spring Boot/Oracle a
"familiaridad" o eliminarlos hasta tener un proyecto que los respalde.

## 4. Proyectos: estado de evidencia

### 01 — AgroCordS / Ventana de Aplicación · ⛔ SIN MATERIAL
No existe nada en GitHub ni en disco. Para que sea "protagonista visual" necesito, como mínimo:
repo o link (aunque sea privado), 3–6 capturas, stack real, nombre/fecha de la hackathon, equipo y tu rol,
qué fuente de datos meteorológicos y satelitales se usó (Sentinel-2 vía qué API), si hubo backend propio.

### 02 — Virtual-Fit · ✅ EVIDENCIA FUERTE (repo privado)
Repo `Fabry01000011/virtual-fit` existe (remote) y **no aparece en la lista pública → es privado**. Correcto
presentarlo como "Private repository · código disponible bajo pedido".
Verificable en código: NestJS 11 + Prisma 6 + PostgreSQL, Redis + BullMQ (worker embebido, máquina de estados
queued→processing→succeeded|failed con retry), Next.js 15 admin, widget Preact 24 KB en shadow DOM, 8 adaptadores
de proveedores (Gemini, OpenAI, Stability, Replicate, fal, HF Space Leffa, LightX, mock), keys cifradas
AES-256-GCM, guard SSRF, rate limiting, cron de retención, logging pino, docker compose, tests e2e.
Dos proveedores verificados con imagen real: **Leffa (HF Space)** y **LightX**.

**Contradicciones con el prompt (no publicar así):**
- "segmentación, pose detection, garment warping": la spec (§2) los **excluye explícitamente**; la composición
  la hace el proveedor de IA. Publicarlos sería inventar capacidades.
- "Gemini API": implementado pero nunca produjo una imagen (cuota 0 sin billing). Los que funcionan son Leffa y LightX.
- "SaaS": la edición construida es **single-store por diseño**. Existe una spec multi-tenant anterior
  (`first-proyect/Virtual-fit`) solo como documentos. Se puede contar como "evolución del producto", no como hecho.
- Falta material visual: no hay capturas del widget/admin. Se pueden generar desde la demo local.
- Repo público `dressing-room` ("probador de ropa virtual") está **vacío**: borrarlo o usarlo como showcase.
- `Virtual-3d-try-on` (Three.js, Netlify) es un experimento previo: opcional como "antecedente".

### 03 — Dirección de la Juventud · ⚠️ EVIDENCIA PARCIAL Y DISPERSA
Hay **tres repos públicos** para el mismo proyecto:
- `DireccionJuventud`: backend Express 5 + `mysql2` + JWT + bcrypt (DB `juventud_sde`) y frontend con package.json (React probable). 1 commit. **Tiene `.env` y `node_modules` commiteados** (backend y frontend).
- `Direccion-de-la-Juventud`: formulario estático de inscripción a eventos (HTML/JS/CSS) con export CSV.
- `direccion-de-la-juventud-sde`: solo LICENSE (MIT, © 2025 Fabricio Leonel Carol). Su descripción dice React + Node + **MongoDB**, lo que contradice MySQL.
Debian / PM2 / Tailscale: solo en el prompt. El CV habla de "programas, actividades y beneficiarios".
Necesito: cuál repo es el canónico, capturas, si llegó a producción y para quién, lista de módulos, equipo y tu rol.
**Acción de higiene urgente:** quitar `.env` del historial (y rotar lo que haya adentro) y borrar `node_modules` del repo.

### 04 — Dirección de Tránsito y Transporte · ⚠️ EL REPO PÚBLICO ES UN PROTOTIPO
`dirtrans`: dashboard HTML ("Dirección de Tránsito y Transporte Urbano") con secciones **Cargar Datos**
(expediente, permiso, tiquera; propietario; vehículo; chofer), **Prórrogas**, **Consultas**, **Historial de Permisos**,
y un `server.js` Express con login hardcodeado (admin/1234) y **sin base de datos**. Es un mock de UI, no el sistema.
El sistema real (según CV) existía y vos lo actualizaste/optimizaste. Necesito: stack real del sistema heredado
(lenguaje, motor de BD), qué cambiaste concretamente, si puedo mostrar capturas anonimizadas. El repo `dirtrans` no
debe linkearse como "el sistema".

### 05 — Sistema de venta de pasajes · ✅ DEMO PÚBLICA, con salvedades
Demo viva en micropasajes.netlify.app ("PatyBus", Santiago del Estero ↔ Buenos Aires), repo `micropasajes-portfolio`
con docs (ARCHITECTURE, TECHNICAL, CODE-EXAMPLES). Bus de **58 asientos (28 planta alta + 30 baja)**, estados
disponible/reservado/vendido, seña o pago total, panel admin, historial de acciones, export/import JSON.
Stack real: **vanilla JS modular, sin backend, persistencia en LocalStorage**; Mercado Pago aparece como
**links de pago**, no como integración de pasarela.
**No publicar:** las métricas del README ("95% menos errores", "200+ pasajeros/mes", "10 → 2 min") no tienen respaldo
verificable. Las capturas del repo son **placeholders**. El README está firmado por "AEON Software Solutions ·
contacto@aeonsoft.com · www.aeonsoft.com" (ver §6). Confirmar si hubo cliente real (PatyBus) y si el sistema se usó.

### 06 — Agile / More Agile · ⛔ SIN MATERIAL
Nada en GitHub ni en disco. Lo más cercano es `devflow` (gestor de tareas para devs, vanilla JS + LocalStorage,
"sugerencias IA"). ¿Es el mismo proyecto, un antecesor o algo distinto? Necesito repo, capturas, stack, estado.

### Candidato no mencionado — Puerta a Puerta X (`D:\codebase\PaPx2-main`)
Delivery multi-rol (cliente/comercio/cadete/embajador/admin), Node 22 + Express 5, Supabase (PostgreSQL + RLS +
Realtime), Mercado Pago con webhook HMAC, push VAPID/FCM, Capacitor, Railway + Vercel, GitHub Actions, tests unitarios,
matching de cadetes, tarifas por clima. **Si es tuyo o de ÆON, es el segundo proyecto backend/data más fuerte que
tenés** y encaja exacto en "lógica de negocio + datos + pagos". No hay `.git` ni autoría en los archivos: confirmá.

### Otros repos públicos (para decidir visibilidad)
`sounds-of-the-city` (sitio de festival con chatbot Gemini), `IONI-store` (una landing HTML), `devflow`,
`portfolio` (2022, "mi primer proyecto"), `the-first-time-using-github`, `pyMessenger` (fork).
**Los repos pinneados hoy incluyen `portfolio` y `the-first-time-using-github`**: un recruiter que llega desde la web
ve primero ejercicios de 2022. Conviene re-pinnear (micropasajes, DireccionJuventud saneado, devflow, sounds-of-the-city).

## 5. Inconsistencias que tenés que resolver

1. **Teléfono/WhatsApp:** el prompt dice `3855976756`; CV y GitHub dicen `+54 385 502-2830`. Son números distintos.
2. **Cencosud:** el prompt lo ubica como experiencia comercial ("Cencosud/Acceda y Cencopay"); el CV lo tiene como
   *Analista de Sistemas y Soporte Técnico Operativo* (ene 2026–hoy). "Acceda" no aparece en ningún CV.
   ¿Hubo un rol de ventas anterior y después el de analista? ¿Qué es Acceda? Importa mucho: el rol de analista es
   el mejor respaldo para el objetivo "Analista Funcional" y para DBA/Data.
3. **Virtual-Fit:** ver contradicciones en §4.02 (segmentación/pose/warping, Gemini, SaaS).
4. **Juventud:** MySQL (código) vs MongoDB (descripción del repo); tres repos.
5. **Tránsito:** el repo público es un mock sin BD; el sistema real no está documentado.
6. **Métricas de Micropasajes:** sin respaldo.
7. **Nombre de la marca:** prompt "ÆON", README "AEON". Definir grafía oficial y si el dominio `aeonsoft.com` es tuyo.
8. **Ubicación:** prompt lista Córdoba y Santiago del Estero; CV dice Córdoba Capital. Propuesta: "Córdoba, Argentina"
   como base y Santiago del Estero como origen (ayuda al SEO local en ambas).
9. **Tres CVs con tres identidades** (IT / Asesor / Backend). Para la web va solo el de Backend, en ES y EN.

## 6. ÆON Software Solutions: qué hay
Única evidencia: footer de la demo de pasajes ("© 2025 AEON Software Solutions") y README ("contacto@aeonsoft.com",
"www.aeonsoft.com"). **El dominio aeonsoft.com está en venta (parking de GoDaddy), no es de ÆON:** ese email y esa web del README no son reales y hay que sacarlos. No hay logo en disco, no hay lista de servicios, no hay socios nombrados, no hay web verificada.
Necesito: grafía y logo, email/canal real de contacto, servicios que efectivamente ofrecen hoy, si nombro a los socios,
y si Micropasajes / PaPx2 se presentan como trabajos de ÆON.

## 7. Información que NO debe publicarse
- **El número de DNI y la fecha de nacimiento** (están en los tres PDFs). El CV descargable de la web tiene que salir sin eso.
- **`.env` commiteados** en `DireccionJuventud` (backend y frontend). Aunque sean credenciales locales, van al historial.
- La key de Gemini expuesta en un transcript (ya anotado en el CLAUDE.md de virtual-fit): rotar.
- Credenciales de demo (admin/admin123) pueden quedar en la demo, pero no en la web del portfolio.
- Sección "Redes / cableado UTP" y el rol de help desk como identidad: no aportan al posicionamiento.

## 8. Fortalezas reales (con qué se construye la narrativa)
- Dos sistemas para **organismos públicos** con dominio de negocio concreto (permisos/habilitaciones, programas/beneficiarios).
- Un proyecto de **arquitectura seria y verificable** (Virtual-Fit): colas, workers, cifrado, SSRF, tests, docker.
- Un rol actual de **analista sobre una plataforma financiera transaccional** (Cencopay): reglas de negocio + datos.
- Una **demo pública funcionando** (Micropasajes) con lógica de negocio real (asientos, señas, rutas).
- **Postgres + MySQL + Redis** con código real, no solo logos.
- Iniciativa propia (ÆON) y experiencia comercial verificable (Movilmar). Eso sostiene el diferenciador
  "tecnología + negocio + ventas" sin inventar nada.

## 9. Lo que necesito de vos para pasar a Fase 2
Respondé lo que puedas; lo demás queda como placeholder marcado.

1. WhatsApp definitivo.
2. Cencosud: rol(es), fechas, qué es "Acceda", qué motor de BD consultás.
3. AgroCordS: repo/link, capturas, stack, hackathon (nombre, fecha, equipo, rol), fuentes de datos.
4. Agile / More Agile: repo, capturas, stack, estado. ¿`devflow` está relacionado?
5. Puerta a Puerta X: ¿es tuyo / de ÆON? ¿Se puede mostrar? ¿Está en producción?
6. Juventud: repo canónico, capturas, producción sí/no, módulos, deploy (Debian/PM2/Tailscale confirmado?).
7. Tránsito: stack real del sistema heredado, qué modificaste, capturas anonimizadas sí/no.
8. Micropasajes: ¿cliente real? ¿Se usa? ¿Mantengo la marca ÆON en él?
9. ÆON: grafía, logo, contacto, servicios reales, socios, dominio.
10. Virtual-Fit: ¿lo presento como single-store con roadmap SaaS? ¿Puedo generar capturas desde la demo local?
11. CV final en ES y EN (sin DNI ni fecha de nacimiento). Si querés, lo genero a partir del de junio 2026.
12. Foto profesional para el hero (opcional) y fotos/capturas de cada proyecto.

---

## 10. Respuestas del usuario (2026-09-18) — cierran la auditoría

- **GitHub:** ignorar el estado actual; va a borrar/subir repos a mano. Los links a repos quedan como campos editables.
- **Contenido faltante de proyectos:** autorizado a redactar contenido plausible como **borrador marcado** (flag `draft`/"revisar") que él corrige después. Regla interna: se inventa descripción y features, **nunca métricas, clientes ni resultados**.
- **Nuevo proyecto importante: Puerta a Puerta X** (delivery multi-rol; material en `D:\codebase\PaPx2-main`).
- **Cencosud / Cencopay:** Analista de Sistemas y Soporte Técnico Operativo sobre la plataforma financiera transaccional **Engage5**, tareas de soporte IT. **Enero 2026 – agosto 2026.** Ignorar "Acceda".
- **WhatsApp:** personal `+54 385 502-2830` (perfil) · ÆON `+54 385 597-6756` (sección ÆON).
- **Medios:** dejar espacios para capturas, logo de proyecto y links de demo que él sube a mano. Sección "Quién soy" con imágenes. **Requisito nuevo: panel admin para subir imágenes** (impacta el stack: ver Fase 5).
- **Micropasajes:** cliente real **PatyBus / El Delfín Turismo**, en uso. Mantener marca ÆON. Versión GitHub = demo en LocalStorage; versión real = a medida por cliente, con backend y base de datos, no pública.
- **Sistemas municipales (Juventud, Tránsito):** los repos públicos son demos; los sistemas reales están implementados y en uso por el gobierno en sus servidores. Nunca estarán en GitHub → "Private / institutional deployment".
