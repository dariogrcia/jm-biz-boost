# JM Asesores — notas para agentes

Web corporativa de JM Asesores (asesoría fiscal, contable y laboral en Antequera,
Málaga). TanStack Start + Vite + Tailwind 4 + shadcn/ui. Todo el contenido es
estático y vive en el código: no hay backend ni base de datos.

## Comandos

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # build de producción
npm run prerender  # HTML estático a partir del build (necesita build antes)
npm run lint
npm run format
```

> Historial de decisiones, por qué se hizo cada cosa y qué queda pendiente:
> [`BITACORA.md`](BITACORA.md). Léela antes de tocar dominio, SEO o colores.

## Cosas que conviene saber

- **El sitio se despliega como HTML estático en Cloudflare Workers.** `npm run
deploy` encadena build + prerender + `wrangler deploy`. `scripts/prerender.mjs`
  ejecuta el handler SSR en proceso, rastrea los enlaces internos y vuelca el HTML
  en `dist/client/`. Una página nueva se descubre sola si hay un enlace interno
  que llegue a ella — si no, no se prerenderiza.
- **El Worker no tiene código**: `wrangler.jsonc` solo declara `assets`. No añadas
  un `main` salvo que el sitio necesite de verdad lógica en el servidor.
- **Base path.** El sitio se sirve desde la raíz. El mecanismo de `BASE_PATH`
  sigue en `vite.config.ts` y `src/router.tsx` por si vuelve a hacer falta, pero
  no se define en ningún sitio.
- **El idioma del sitio es el español.** Textos de UI, errores y páginas 404
  incluidas.
- **Color de marca.** `--brand` (naranja) es para fondos, iconos y CTA. Para texto
  usa `--brand-ink` sobre claro y `--brand-on-dark` sobre el marrón: el naranja de
  marca no llega a contraste AA como texto. Ver `src/styles.css`.
- **Contraste.** Todo texto nuevo debe cumplir WCAG AA (4.5:1 normal, 3:1 grande).
