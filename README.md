# JM Asesores — Sitio web

Web corporativa de **JM Asesores**, asesoría fiscal, contable y laboral en
Antequera (Málaga). Incluye páginas de servicios, sobre nosotros, contacto y un
blog con artículos sobre fiscalidad, contabilidad y finanzas.

🔗 **En producción:** https://jmasesoresantequera.es

---

## Stack

| Capa               | Tecnología                                                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Framework          | [TanStack Start](https://tanstack.com/start) (React 19) + [TanStack Router](https://tanstack.com/router) (file-based routing) |
| Build              | [Vite 8](https://vitejs.dev/)                                                                                                 |
| Estilos            | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)                                   |
| Datos              | [TanStack Query](https://tanstack.com/query)                                                                                  |
| Gestor de paquetes | npm (lockfile `package-lock.json`)                                                                                            |

El contenido (servicios, textos, artículos del blog) es **estático** y vive en
el propio código — no hay backend ni base de datos.

El desarrollo se hace en local con Claude Code; el proyecto ya no está conectado
a ninguna plataforma de generación externa.

---

## Desarrollo local

Requisitos: **Node 22+** (algunas dependencias lo exigen).

```bash
npm ci             # instalar dependencias exactas del lockfile
npm run dev        # servidor de desarrollo (http://localhost:8080)
npm run build      # build de producción
npm run prerender  # HTML estático (requiere build antes)
npm run lint       # eslint
npm run format     # prettier
```

### Estructura

```
src/
├── routes/              # rutas (file-based routing de TanStack Router)
│   ├── __root.tsx       # shell de la app (<html>, <head>, layout raíz)
│   ├── index.tsx        # /
│   ├── servicios.tsx    # /servicios
│   ├── sobre-nosotros.tsx
│   ├── contacto.tsx
│   ├── blog.index.tsx   # /blog
│   └── blog.$slug.tsx   # /blog/:slug (artículo)
├── components/
│   ├── site/            # Navbar, Footer, Layout, BlogSidebar, WhatsAppFloat
│   └── ui/              # componentes shadcn/ui
├── lib/
│   └── blog-posts.ts    # contenido de los artículos del blog
├── hooks/               # hooks reutilizables
├── assets/              # imágenes (logos, fotos, imágenes del blog)
├── router.tsx           # configuración del router (incl. basepath)
├── server.ts            # entry SSR (wrapper de errores)
└── start.ts             # configuración de TanStack Start
```

---

## Despliegue — Netlify

El sitio se publica con un solo comando:

```bash
npm run deploy      # build + prerender + subida a Netlify
```

Requiere estar autenticado en Netlify una vez (`npx netlify login`).

**Por qué Netlify y no Cloudflare** (17-sep-2026): los bloqueos de IPs de LaLiga
tumbaban la web desde España en días de partido, porque afectaban a las IPs
compartidas de Cloudflare. Ver `BITACORA.md` §18–§20.

La configuración de Cloudflare Pages sigue en el repo por si hay que volver atrás:

```bash
npm run deploy:cloudflare   # mismo dist/, a Cloudflare Pages
```

### Por qué hay un paso de "prerender"

TanStack Start es **SSR**: `vite build` produce los assets de cliente
(`dist/client`) **más** un handler de servidor (`dist/server/server.js`), pero
**no genera HTML estático**.

Como todo el contenido del sitio es estático y no hay funciones de servidor,
[`scripts/prerender.mjs`](scripts/prerender.mjs) convierte la app a HTML: ejecuta
el handler ya compilado en proceso, **rastrea los enlaces internos** empezando
por la home (descubriendo solo las páginas y cada artículo del blog) y vuelca el
resultado en `dist/client/<ruta>/index.html`. Genera además un **`404.html`**
real, renderizando una ruta inexistente, no una copia de la home.

> Una página nueva se prerenderiza sola si hay algún enlace interno que llegue a
> ella. Si no lo hay, no se genera.

### Qué se despliega

Se sube `dist/client` tal cual, ya generado en local: en Netlify no hay build.
Dos ficheros que produce el prerender mandan sobre el comportamiento, y los leen
igual Netlify y Cloudflare Pages:

- **`_headers`** — CSP con los hashes de los scripts inline de cada build, más el
  resto de cabeceras de seguridad.
- **`_redirects`** — cada `ruta.html` redirige con 301 a `/ruta`. Sin esto, la
  misma página estaría en dos URLs.

Y dos detalles del propio prerender:

- **HTML plano** (`servicios.html`, no `servicios/index.html`): así `/servicios`
  es la URL canónica y `/servicios/` redirige a ella. Con `index.html` pasaría al
  revés y cambiarían todas las URLs ya indexadas.
- **`404.html` real**, renderizando una ruta inexistente: Netlify lo sirve con
  estado 404 (en GitHub Pages había que devolver la home con 200, lo que confunde
  a los buscadores).

### Base path

El sitio se sirve desde la raíz `/`, así que no hace falta configurar nada. El
mecanismo de `BASE_PATH` sigue en [`vite.config.ts`](vite.config.ts) y
[`src/router.tsx`](src/router.tsx) por si algún día vuelve a servirse desde un
subdirectorio, pero no se define.

### Dominio propio

`jmasesoresantequera.es` y `www` están dados de alta en el proyecto de Netlify, y
en Cloudflare son sendos CNAME a `jm-asesores.netlify.app` en modo **«Solo DNS»**
(sin el proxy naranja): esa es justo la parte que esquiva los bloqueos de LaLiga.
El certificado lo emite Netlify con Let's Encrypt.

---

## Flujo de despliegue (resumen)

```
npm run deploy
   ├─ vite build                   → dist/client (assets) + dist/server (SSR)
   ├─ node scripts/prerender.mjs   → HTML estático + 404.html
   └─ netlify deploy --prod        → https://jmasesoresantequera.es
```
