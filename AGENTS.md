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

## Cosas que conviene saber

- **El sitio se despliega como HTML estático.** `vite build` genera el cliente y un
  handler SSR; `scripts/prerender.mjs` lo ejecuta en proceso, rastrea los enlaces
  internos y vuelca el HTML en `dist/client/`. Cualquier página nueva se descubre
  sola si hay un enlace interno que llegue a ella — si no, no se prerenderiza.
- **Base path.** En GitHub Pages el sitio cuelga de `/jm-biz-boost/`. El workflow
  define `BASE_PATH`, que alimenta tanto el `base` de Vite como el `basepath` del
  router (`src/router.tsx`).
- **El idioma del sitio es el español.** Textos de UI, errores y páginas 404
  incluidas.
- **Color de marca.** `--brand` (naranja) es para fondos, iconos y CTA. Para texto
  usa `--brand-ink` sobre claro y `--brand-on-dark` sobre el marrón: el naranja de
  marca no llega a contraste AA como texto. Ver `src/styles.css`.
- **Contraste.** Todo texto nuevo debe cumplir WCAG AA (4.5:1 normal, 3:1 grande).
