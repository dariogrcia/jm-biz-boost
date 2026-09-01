# JM Asesores — Sitio web

Web corporativa de **JM Asesores**, asesoría fiscal, contable y laboral en
Antequera (Málaga). Incluye páginas de servicios, sobre nosotros, contacto y un
blog con artículos sobre fiscalidad, contabilidad y finanzas.

🔗 **En producción:** https://jm-asesores.dariojesusgarcia6.workers.dev

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
npm install        # instalar dependencias
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

## Despliegue — Cloudflare Workers

El sitio se publica con un solo comando:

```bash
npm run deploy      # build + prerender + wrangler deploy
```

Requiere estar autenticado en Cloudflare una vez (`npx wrangler login`).

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

[`wrangler.jsonc`](wrangler.jsonc) define un Worker **sin código**: no hay
`main`, solo `assets`. Cloudflare sirve `dist/client` directamente desde el edge,
así que no hay cold starts y las peticiones a ficheros estáticos no cuentan como
invocaciones del Worker.

Dos ajustes que importan:

- `not_found_handling: "404-page"` — una URL que no existe devuelve `404.html`
  con **estado 404**. (En GitHub Pages había que servir la home con un 200 y
  dejar que el router de cliente lo resolviera, lo que confunde a los
  buscadores.)
- `html_handling: "drop-trailing-slash"` — el router genera los enlaces sin barra
  final, así que `/servicios` es la URL canónica y se sirve directamente;
  `/servicios/` redirige a ella.

### Base path

El sitio se sirve desde la raíz `/`, así que no hace falta configurar nada. El
mecanismo de `BASE_PATH` sigue en [`vite.config.ts`](vite.config.ts) y
[`src/router.tsx`](src/router.tsx) por si algún día vuelve a servirse desde un
subdirectorio, pero no se define.

### Dominio propio

Para usar un dominio propio (p. ej. `www.jmasesores.es`), añade el dominio a la
zona en Cloudflare y una ruta al Worker `jm-asesores` desde el panel, o declara
`routes` en `wrangler.jsonc`.

---

## Flujo de despliegue (resumen)

```
npm run deploy
   ├─ vite build                   → dist/client (assets) + dist/server (SSR)
   ├─ node scripts/prerender.mjs   → HTML estático + 404.html
   └─ wrangler deploy              → https://jm-asesores.dariojesusgarcia6.workers.dev
```
