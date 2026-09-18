/**
 * Spanish — source of truth for every UI string.
 * Other locales are typed against this object, so a missing key is a build error.
 */
export const es = {
  meta: {
    homeTitle: 'Fabricio Carol — Software Developer | Backend, APIs y Bases de Datos',
    homeDescription:
      'Software Developer argentino especializado en backend, APIs REST y bases de datos. Sistemas web para organismos públicos, empresas y proyectos propios.',
    projectsTitle: 'Proyectos',
    projectsDescription:
      'Sistemas y productos que construí: arquitectura, tecnologías, mi rol y el problema que resolvían.',
    aboutTitle: 'Sobre mí',
    aboutDescription:
      'Técnico Superior en Desarrollo de Software. Backend, APIs y bases de datos, con experiencia en sector público, privado y proyectos propios.',
    experienceTitle: 'Experiencia',
    experienceDescription:
      'Trayectoria profesional, formación e idiomas de Fabricio Carol, Software Developer.',
    aeonTitle: 'ÆON Software Solutions',
    aeonDescription:
      'Desarrollo de software a medida para empresas: sistemas de gestión, e-commerce, aplicaciones e integraciones.',
    contactTitle: 'Contacto',
    contactDescription:
      'Escribime por email, WhatsApp o LinkedIn. Disponible para roles Backend / Full Stack y proyectos freelance.',
    notFoundTitle: 'Página no encontrada',
  },

  nav: {
    projects: 'Proyectos',
    about: 'Sobre mí',
    experience: 'Experiencia',
    aeon: 'ÆON',
    contact: 'Contacto',
    home: 'Inicio',
    menu: 'Menú',
    close: 'Cerrar',
    openMenu: 'Abrir menú',
    skipToContent: 'Saltar al contenido',
    toggleTheme: 'Cambiar tema',
    language: 'Idioma',
  },

  hero: {
    eyebrow: 'Software Developer — Backend, APIs & Databases',
    title: 'Construyo productos digitales prácticos.',
    subtitle:
      'Backend · APIs · Bases de datos · Full Stack. Sistemas web, integraciones y lógica de negocio para organismos públicos, empresas y proyectos propios.',
    available: 'Disponible para roles Backend / Full Stack y proyectos con ÆON',
    ctaProjects: 'Ver proyectos',
    ctaCv: 'Descargar CV',
    ctaContact: 'Contactar',
    cvEs: 'CV en español',
    cvEn: 'CV in English',
    scroll: 'Desplazá para ver más',
  },

  proof: {
    since: 'Desarrollando software',
    sinceValue: 'desde 2020',
    sectors: 'Proyectos en',
    sectorsValue: 'sector público, privado y propio',
    focus: 'Foco',
    focusValue: 'Backend, datos y lógica de negocio',
  },

  projects: {
    sectionTitle: 'Proyectos',
    sectionLead:
      'Sistemas reales, con su problema, su arquitectura y mi participación. No son ejercicios.',
    viewAll: 'Ver todos los proyectos',
    viewProject: 'Ver proyecto',
    allCategories: 'Todos',
    filterLabel: 'Filtrar por categoría',
    empty: 'No hay proyectos en esta categoría todavía.',
    draftNotice: 'Ficha en preparación: los detalles de este proyecto se están completando.',
    indexLead:
      'Cada ficha explica qué problema resolvía el sistema, cómo está construido y qué hice yo.',
  },

  project: {
    problem: 'El problema',
    solution: 'La solución',
    role: 'Mi participación',
    architecture: 'Arquitectura',
    technologies: 'Tecnologías',
    features: 'Funcionalidades',
    results: 'Resultados',
    gallery: 'Galería',
    highlights: 'Decisiones técnicas',
    repository: 'Repositorio',
    links: 'Enlaces',
    liveDemo: 'Ver demo',
    viewCode: 'Ver código',
    previous: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    backToProjects: 'Volver a proyectos',
    year: 'Año',
    client: 'Cliente',
    status: 'Estado',
    team: 'Equipo',
    myRole: 'Rol',
    repoPublic: 'Repositorio público',
    repoPrivate: 'Repositorio privado',
    repoPrivateNote: 'Código disponible a pedido.',
    repoInstitutional: 'Despliegue institucional',
    repoInstitutionalNote:
      'El sistema está implementado en servidores del organismo y no es público.',
    repoClient: 'Proyecto de cliente',
    repoClientNote: 'Desarrollo a medida. El código pertenece al cliente y no es público.',
    galleryPending: 'Capturas en preparación.',
    galleryPendingNote: 'Las imágenes de este proyecto se publicarán próximamente.',
    imageOf: 'Imagen de',
    openImage: 'Ampliar imagen',
    closeImage: 'Cerrar imagen',
  },

  approach: {
    sectionTitle: 'Cómo trabajo',
    sectionLead:
      'Tres cosas que hago en todo proyecto, sea un sistema de gobierno o el producto de un cliente.',
    step1Title: 'Entender el problema',
    step1Body:
      'Antes del código: quién lo va a usar, qué necesita resolver y qué restricciones hay. Vengo de analizar requerimientos en sistemas de gestión y de trabajar cara a cara con clientes, así que traduzco lo que alguien necesita a algo construible.',
    step2Title: 'Diseñar los datos',
    step2Body:
      'El modelo de datos decide qué tan lejos llega un sistema. Trabajo con PostgreSQL, MySQL y Redis, pensando consultas, integridad y crecimiento desde el principio, no cuando ya duele.',
    step3Title: 'Construir y sostener',
    step3Body:
      'API, interfaz, despliegue y mantenimiento. Varios de los sistemas en los que trabajé siguen funcionando y recibiendo mejoras, que es la única prueba real de que están bien hechos.',
  },

  about: {
    sectionTitle: 'Sobre mí',
    readMore: 'Conocer más',
    galleryTitle: 'En imágenes',
    galleryPending: 'Fotos en preparación.',
  },

  experience: {
    sectionTitle: 'Experiencia',
    lead: 'Dónde trabajé y qué construí en cada lugar.',
    viewAll: 'Ver experiencia completa',
    current: 'Actualidad',
    education: 'Formación',
    languages: 'Idiomas',
    downloadCv: 'Descargar CV',
    highlights: 'Responsabilidades',
    tech: 'Tecnologías',
  },

  aeon: {
    sectionTitle: 'ÆON Software Solutions',
    teaserLead:
      'Además de trabajar como developer, desarrollo software para clientes junto a mis socios en ÆON.',
    servicesTitle: 'Qué hacemos',
    processTitle: 'Cómo trabajamos',
    ctaTitle: '¿Tenés un proyecto en mente?',
    ctaBody:
      'Contame qué necesita tu negocio y te digo si puedo ayudarte, con qué alcance y en qué plazo.',
    cta: 'Trabajar con ÆON',
    ctaWhatsapp: 'Escribir por WhatsApp',
    whatsappMessage: 'Hola ÆON, quiero consultar por un proyecto de software.',
    casesTitle: 'Proyectos de ÆON',
  },

  contact: {
    sectionTitle: 'Contacto',
    lead: 'Estoy abierto a posiciones Backend / Full Stack y a proyectos freelance.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    whatsappPersonal: 'WhatsApp personal',
    whatsappAeon: 'WhatsApp ÆON',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    instagramLabel: 'Instagram',
    locationLabel: 'Ubicación',
    responseNote: 'Respondo por email o WhatsApp, normalmente dentro de las 24 horas.',
    copyEmail: 'Copiar email',
    copied: 'Copiado',
    whatsappMessage: 'Hola Fabricio, vi tu portfolio y quería contactarte.',
  },

  footer: {
    tagline: 'Software Developer — Backend, APIs y Bases de Datos',
    rights: 'Todos los derechos reservados.',
    builtWith: 'Construido con Astro.',
  },

  notFound: {
    title: 'Esta página no existe',
    body: 'El enlace puede estar roto o la página fue movida.',
    cta: 'Volver al inicio',
  },

  langNotice: {
    partial: 'Esta traducción está en preparación. Algunos textos se muestran en español.',
  },
};

export type Dictionary = typeof es;
