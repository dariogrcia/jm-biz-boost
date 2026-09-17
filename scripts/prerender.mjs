// Static prerender for GitHub Pages.
//
// TanStack Start is SSR-first: `vite build` emits a client bundle (dist/client)
// plus a server fetch handler (dist/server/server.js) but no static HTML. Since
// this site has no backend (all content is bundled), we render every route to
// static HTML by running the built server handler in-process and crawling
// internal links starting from the base path. Output is written into
// dist/client so it can be published as-is to GitHub Pages.

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { dirname, join, relative, resolve, isAbsolute } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = resolve(import.meta.dirname, "..");
const OUT_DIR = join(ROOT, "dist", "client");
const SERVER_ENTRY = join(ROOT, "dist", "server", "server.js");
const ORIGIN = "http://localhost";

// Base path desde el que se sirve el sitio. En Cloudflare es la raíz, así que
// BASE_PATH ya no se define; la variable se queda por si vuelve a hacer falta.
// Normalize to always start and end with a single slash.
const BASE = `/${(process.env.BASE_PATH || "/").replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");

if (!existsSync(SERVER_ENTRY)) {
  console.error(`✗ Missing ${SERVER_ENTRY}. Run \`vite build\` first.`);
  process.exit(1);
}

const { default: server } = await import(pathToFileURL(SERVER_ENTRY).href);

// Strip the base prefix to map a URL path to a route-relative output path.
const toRelative = (urlPath) => urlPath.slice(BASE.length).replace(/^\/+|\/+$/g, "");

// Internal page links only: same base, no file extension, no hash/query.
const isPageLink = (href) => {
  if (!href.startsWith(BASE)) return false;
  const rest = href.slice(BASE.length);
  if (rest.includes("#") || rest.includes("?")) return false;
  const last = rest.split("/").filter(Boolean).pop() ?? "";
  return !last.includes("."); // skip /assets/*.js, *.css, images, etc.
};

const extractLinks = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

const seen = new Set();
const queue = [BASE];
const rendered = [];
const htmls = [];

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  const res = await server.fetch(new Request(ORIGIN + path));
  if (res.status !== 200) {
    console.warn(`! ${res.status} ${path} (skipped)`);
    continue;
  }

  const html = await res.text();
  const rel = toRelative(path);
  // `servicios.html` y no `servicios/index.html`: con index.html, Cloudflare Pages
  // redirige /servicios → /servicios/ (308) y cambiaría la forma canónica de todas
  // las URLs, que Google ya tiene indexadas sin barra final. Con el fichero plano,
  // tanto Pages como Workers sirven /servicios directamente (17-sep-2026).
  const file = rel === "" ? join(OUT_DIR, "index.html") : join(OUT_DIR, `${rel}.html`);
  // Un enlace con «..» no puede escribir fuera de dist/client.
  const dentro = relative(OUT_DIR, file);
  if (dentro.startsWith("..") || isAbsolute(dentro)) {
    console.warn(`! ${path} sale de ${OUT_DIR} (skipped)`);
    continue;
  }
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  htmls.push(html);
  rendered.push(rel === "" ? "/" : `/${rel}`);

  for (const href of extractLinks(html)) {
    const clean = href.replace(/[#?].*$/, "");
    if (isPageLink(clean) && !seen.has(clean)) queue.push(clean);
  }
}

// Página 404 real. Todas las rutas del sitio quedan prerenderizadas, así que una
// URL desconocida no es una ruta pendiente de resolver en cliente: es un 404.
// Cloudflare la sirve con estado 404 (not_found_handling: "404-page"), en vez de
// devolver la home con un 200 y dejar que el router de cliente lo arregle.
// robots.txt y sitemap.xml, generados a partir de las rutas realmente
// renderizadas: si una página deja de existir, desaparece sola del sitemap.
const { SITIO_URL, INDEXABLE } = await import("../src/lib/sitio.ts").catch(() => ({}));
const BASE_URL = process.env.SITE_URL || SITIO_URL || "";
const INDEXAR = process.env.SITE_INDEXABLE
  ? process.env.SITE_INDEXABLE === "true"
  : Boolean(INDEXABLE);

const hoy = new Date().toISOString().slice(0, 10);
const urls = rendered
  .map(
    (r) => `  <url>
    <loc>${BASE_URL}${r === "/" ? "" : r}</loc>
    <lastmod>${hoy}</lastmod>
  </url>`,
  )
  .join("\n");
await writeFile(
  join(OUT_DIR, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);

// Con INDEXABLE en false el sitio es provisional (subdominio workers.dev) y no
// debe indexarse: ver el porqué en src/lib/sitio.ts.
await writeFile(
  join(OUT_DIR, "robots.txt"),
  INDEXAR
    ? `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`
    : `# Sitio en una URL provisional: no indexar todavía.
# Al estrenar el dominio definitivo, poner INDEXABLE = true en src/lib/sitio.ts.
User-agent: *
Disallow: /
`,
);

// _redirects: Netlify sirve también /servicios.html (el fichero real) y eso sería
// contenido duplicado de /servicios. Se manda cada .html a su URL limpia con 301,
// y www al dominio sin www. Cloudflare Pages usa el mismo formato de fichero.
const redirecciones = rendered
  .filter((r) => r !== "/")
  .map((r) => `${r}.html ${r} 301!`)
  .join("\n");
await writeFile(
  join(OUT_DIR, "_redirects"),
  `# Generado por scripts/prerender.mjs: no editar a mano.
${redirecciones}
`,
);

const notFoundRes = await server.fetch(new Request(`${ORIGIN}${BASE}__404__`));
const notFoundHtml = (await notFoundRes.text()).replace(
  "</head>",
  '<meta name="robots" content="noindex, follow"/></head>',
);
await writeFile(join(OUT_DIR, "404.html"), notFoundHtml);
htmls.push(notFoundHtml);

// CSP con hashes: la plantilla public/_headers trae __CSP_SCRIPT_HASHES__ y aquí
// se sustituye por el sha256 de cada <script> inline ejecutable del HTML generado,
// escribiendo el resultado en dist/client/_headers. Se lee siempre de public/ para
// que repetir el prerender funcione. Los JSON-LD no se ejecutan y la CSP no los afecta.
const PLANTILLA_HEADERS = join(ROOT, "public", "_headers");
const HEADERS_FILE = join(OUT_DIR, "_headers");
const MARCADOR = "__CSP_SCRIPT_HASHES__";
const plantilla = await readFile(PLANTILLA_HEADERS, "utf8");
if (!/^\s*Content-Security-Policy:.*__CSP_SCRIPT_HASHES__/m.test(plantilla)) {
  console.error(`✗ ${PLANTILLA_HEADERS} no contiene ${MARCADOR}.`);
  process.exit(1);
}
const hashes = new Set();
for (const html of htmls) {
  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\ssrc=/.test(attrs) || /type="application\/ld\+json"/.test(attrs) || !body) continue;
    // El navegador calcula el hash sobre el texto ya analizado como HTML: los
    // saltos CR/CRLF pasan a LF y U+0000 a U+FFFD. TanStack mete U+0000 en los ids
    // de ruta del script de hidratación; sin esta normalización su hash no coincide,
    // la CSP lo bloquea y la página queda en blanco.
    const texto = body.replace(/\r\n?/g, "\n").replaceAll("\0", "�");
    hashes.add(`'sha256-${createHash("sha256").update(texto).digest("base64")}'`);
  }
}
const cabeceras = plantilla.replaceAll(MARCADOR, [...hashes].sort().join(" "));
if (cabeceras.includes(MARCADOR) || hashes.size === 0) {
  console.error("✗ No se pudieron calcular los hashes de la CSP.");
  process.exit(1);
}
// Cloudflare ignora líneas de más de 2000 caracteres en _headers.
const larga = cabeceras.split("\n").find((l) => l.length > 2000);
if (larga) {
  console.error(`✗ Una línea de _headers supera 2000 caracteres (${larga.length}).`);
  process.exit(1);
}
await writeFile(HEADERS_FILE, cabeceras);

console.log(
  `✓ Prerendered ${rendered.length} pages (base "${BASE}") · robots.txt: ${INDEXAR ? "indexable" : "NOINDEX"} · sitemap.xml · CSP: ${hashes.size} hashes`,
);
for (const p of rendered.sort()) console.log(`    ${p}`);
