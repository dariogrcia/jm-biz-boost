# JM Asesores — Sitio web

Web corporativa de **JM Asesores**, asesoría fiscal, contable y laboral en
Antequera (Málaga). Incluye páginas de servicios, sobre nosotros, contacto y un
blog con artículos sobre fiscalidad, contabilidad y finanzas.

🔗 **En producción:** https://dariogrcia.github.io/jm-biz-boost/

---

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19) + [TanStack Router](https://tanstack.com/router) (file-based routing) |
| Build | [Vite 8](https://vitejs.dev/) |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI) |
| Datos | [TanStack Query](https://tanstack.com/query) |
| Gestor de paquetes | [Bun](https://bun.sh/) (lockfile `bun.lock`) |
| Origen | Generado y editable en [Lovable](https://lovable.dev/) |

El contenido (servicios, textos, artículos del blog) es **estático** y vive en
el propio código — no hay backend ni base de datos.

---

## Desarrollo local

Requisitos: **Node 22+** (algunas dependencias lo exigen) y **Bun** (o npm).

```bash
bun install        # instalar dependencias
bun run dev        # servidor de desarrollo (http://localhost:3000)
bun run build      # build de producción
bun run lint       # eslint
bun run format     # prettier
```

> Con npm: `npm install && npm run dev`.

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

## Despliegue — GitHub Pages

El sitio se publica automáticamente en **GitHub Pages** en cada push a `main`,
mediante el workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Por qué hay un paso de "prerender"

TanStack Start es **SSR (renderizado en servidor)**: `vite build` produce los
assets de cliente (`dist/client`) **más** un handler de servidor
(`dist/server/server.js`), pero **no genera HTML estático**. GitHub Pages, en
cambio, solo sirve ficheros estáticos.

Como todo el contenido del sitio es estático y no hay funciones de servidor,
convertimos la app a HTML estático (**SSG**) con
[`scripts/prerender.mjs`](scripts/prerender.mjs): ejecuta el handler de servidor
ya compilado en proceso, **rastrea los enlaces internos** empezando por la home
(descubriendo automáticamente las páginas y cada artículo del blog) y vuelca el
HTML resultante en `dist/client/<ruta>/index.html`. Además genera:

- **`404.html`** — copia de la home; sirve de *fallback* SPA: GitHub Pages lo
  devuelve para rutas desconocidas y el router de cliente renderiza la ruta
  correcta.
- **`.nojekyll`** — desactiva Jekyll para que se publiquen tal cual los ficheros.

### Base path

Al ser un *project site*, la web se sirve desde un subdirectorio
(`/jm-biz-boost/`). El workflow define `BASE_PATH=/<nombre-del-repo>/`, que:

- Vite usa como `base` (prefijo de todos los assets) — ver `vite.config.ts`.
- El router usa como `basepath` — ver `src/router.tsx` (lee `import.meta.env.BASE_URL`).

En desarrollo local `BASE_PATH` no está definido, así que el `base` es `/`.

### Reproducir el build de Pages en local

```bash
BASE_PATH=/jm-biz-boost/ bun run build
BASE_PATH=/jm-biz-boost/ bun run prerender
# salida estática lista para servir en: dist/client/
```

### Configuración del repositorio (una sola vez)

En **Settings → Pages**, *Source* debe estar en **GitHub Actions** (no en una
rama). El workflow se encarga del resto.

### Dominio propio (opcional)

Para usar un dominio propio (p. ej. `www.jmasesores.es`) en lugar del subpath:

1. En **Settings → Pages → Custom domain**, añade el dominio y configura el DNS.
2. Como el sitio pasaría a servirse desde la raíz `/`, ajusta el workflow para
   usar `BASE_PATH=/` (o elimina la variable `BASE_PATH`).

---

## Flujo de despliegue (resumen)

```
push a main
   └─► GitHub Actions (.github/workflows/deploy.yml)
        ├─ bun install
        ├─ vite build            → dist/client (assets) + dist/server (SSR)
        ├─ node scripts/prerender.mjs  → HTML estático + 404.html + .nojekyll
        ├─ upload-pages-artifact (dist/client)
        └─ deploy-pages          → https://dariogrcia.github.io/jm-biz-boost/
```
