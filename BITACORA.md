# Bitácora del proyecto

Registro de lo hecho, **por qué** se hizo así y qué queda pendiente. Pensado para
retomar el trabajo en otra sesión sin tener que reconstruir el contexto.

Para el funcionamiento del día a día (comandos, estructura, despliegue), ver
[`README.md`](README.md) y [`AGENTS.md`](AGENTS.md).

---

## Estado actual

|                         |                                                          |
| ----------------------- | -------------------------------------------------------- |
| **Producción**          | https://jmasesoresantequera.es                           |
| Hosting                 | Cloudflare Workers (assets estáticos, Worker sin código) |
| Registrador del dominio | IONOS · DNS delegado a Cloudflare                        |
| Repositorio             | `github.com/dariogrcia/jm-biz-boost`, rama `main`        |
| Último commit           | `37e2022`                                                |
| Toolchain               | Node + **npm** (ya no Bun)                               |
| Indexable en Google     | **Sí** (`INDEXABLE = true`)                              |

Verificado en producción: las 14 páginas responden 200, `/no-existe` da 404 real,
`www` redirige con 301 al dominio sin www, certificado TLS emitido para el apex y
`www`, y `workers.dev` ya no sirve (404) para no tener dos URLs públicas.

---

## Punto de partida

El proyecto venía generado y mantenido desde **Lovable**, que pusheaba
automáticamente al repositorio. Al empezar, `main` local estaba **17 commits por
detrás** del remoto: 71 de los 73 commits los había pusheado `gpt-engineer-app[bot]`
(la GitHub App de Lovable) y solo 1 era del propietario.

También existe un proyecto anterior de la misma web en
`~/jm-asesores/asesoria-moderna-web` (repo `ddarioso6/asesoria-moderna-web`,
último commit de sep-2025). **Está obsoleto**, pero conserva material útil: de su
carpeta `images/` salió el logotipo en alta resolución y los datos legales.

---

## Lo que se hizo, y por qué

### 1. Desconexión de Lovable (`91fbff2`)

El proyecto dependía de `@lovable.dev/vite-tanstack-config`, un wrapper que
envolvía toda la configuración de Vite. Se sustituyó por una configuración propia
que replica lo que hacía fuera de su sandbox (tailwind, tsconfig paths,
tanstackStart con `importProtection`, react, lightningcss, dedupe, optimizeDeps,
puerto 8080) y descarta lo que solo servía a Lovable: el `componentTagger`, el
bridge del dev server, el HMR gate y los loggers que reportaban errores a su
backend.

- Eliminados `.lovable/` y `src/lib/lovable-error-reporting.ts`.
- `nitro` fuera de las dependencias: solo se activaba dentro del sandbox de
  Lovable, y el despliegue es prerender estático.
- `lightningcss` pasa a dependencia directa; el wrapper lo traía de forma
  transitiva y el pipeline de CSS debía seguir igual.

> **Pendiente de confirmar:** la desconexión por el lado de Lovable la hizo el
> propietario desde su interfaz, y se retiró el acceso de la GitHub App al
> repositorio. Si algún día vuelven a aparecer commits de `gpt-engineer-app[bot]`,
> revisar https://github.com/settings/installations.

### 2. Crítica de diseño aplicada (`1b04ba4`, `e2edea1`)

Auditoría visual de las 6 rutas a 1440×900 y 390×844, midiendo contraste sobre el
DOM renderizado. Lo más grave que se encontró y corrigió:

- **Dos placeholders publicados**: `/servicios` mostraba «[número pendiente]» y
  «[correo pendiente]»; `/sobre-nosotros` un avatar gris con «Foto profesional ·
  próximamente» junto a la biografía.
- **Contraste**: el botón «Hablemos» daba **1,98:1** (blanco sobre verde
  WhatsApp). El naranja de marca `#D16022` da 3,88:1 sobre blanco, insuficiente
  para texto.
- **96 px de vacío** antes del footer en todas las páginas (un `mt-24` sobre el
  padding que ya traían las secciones).
- Los cuatro enlaces legales apuntaban a `href="#"`.
- El formulario de la home **no enviaba nada**: sin `onSubmit`, sin `action` y sin
  `name` en los campos, hacía un GET nativo que recargaba y tiraba el mensaje.

**Decisión de color que conviene entender antes de tocar estilos:**

```
--brand         naranja de marca. SOLO decorativo: iconos, checks, degradados.
--brand-ink     texto naranja sobre fondo claro (5,48:1) Y fondo de botones
                sólidos con texto blanco encima (5,48:1).
--brand-on-dark texto naranja sobre el marrón de --primary (5,80:1).
```

Usar `--brand` para texto o para un botón con texto blanco **no cumple AA**. Y
`--brand-ink` sobre fondo oscuro da 2,69:1: peor que no hacer nada. Esa confusión
ya se cometió una vez y la detectó la revisión de código (`e2edea1`).

> La auditoría de contraste inicial medía solo estados en reposo y se le
> escaparon los `:hover`. La comprobación actual cruza cada clase
> `hover:text-brand-*` con la luminancia real de su fondo.

### 3. Bun → npm (`b93bf26`)

Bun no está instalado en la máquina de desarrollo, así que `bun.lock` no se podía
regenerar y seguía listando los paquetes de Lovable ya eliminados. Se eliminaron
`bun.lock` y `bunfig.toml`, entró `package-lock.json` y el workflow pasó a
`npm ci`. (Ese workflow se eliminó después, al dejar GitHub Pages.)

### 4. GitHub Pages → Cloudflare Workers (`bb92286`)

Se sirve como **assets estáticos desde un Worker sin código**: `wrangler.jsonc`
no declara `main`, solo `assets`. No se ejecuta nada en el edge, no hay cold
starts y las peticiones a ficheros no cuentan como invocaciones. No se
reintrodujo nitro.

Dos mejoras respecto a Pages:

- **404 real.** Pages obligaba a servir una copia de la home con estado 200 y
  dejar que el router lo resolviera en cliente. Ahora `scripts/prerender.mjs`
  renderiza una ruta inexistente y genera un `404.html` de verdad, que Cloudflare
  sirve con estado 404 (`not_found_handling: "404-page"`).
- Se sirve desde la raíz, no desde `/jm-biz-boost/`.

> `html_handling` es **`drop-trailing-slash`**, no `auto-trailing-slash`. El router
> genera los enlaces sin barra final; con `auto` cada navegación se comía un 307
> antes de llegar a la página.

### 5. Logo en alta resolución (`5fdceab`)

El logotipo se mostraba a 174×40 desde un PNG de 278×64 (1,6×). No había fuente
mejor en el repositorio, pero sí en los **membretes de la empresa**: el `.docx` de
`~/Downloads` lleva incrustada la hoja escaneada, y de ahí salió a 419×84.

- Los PNG originales **no tenían transparencia real** (solo 2,3 % de píxeles
  transparentes), lo que dibujaba un recuadro blanco alrededor del logo en la
  navbar al pasar sobre el hero. Se recortó el fondo por relleno desde las
  esquinas.
- La variante blanca del footer (`logo-blanco.png`) se deriva de la **cantidad de
  tinta**, no de la máscara de recorte: derivándola de la máscara se perdían las
  contraformas internas de la marca y el moteado del escaneo salía como puntos.

> Los membretes usan un lockup **sin** el lema «GESTIÓN DE EMPRESAS», algo más
> nítido. No se cambió porque es una decisión de marca, no de resolución. Sigue
> disponible si se quiere.
>
> **La solución definitiva es un SVG.** No hay herramienta de trazado instalada
> (`potrace`); haría falta instalarla o conseguir el vector original del
> diseñador.

### 6. Cero peticiones a terceros (`f2d0a2b`)

La web cargaba tres servicios externos en cada visita, y uno ponía cookies:

| Antes                                                                      | Ahora                                                                                                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Google Fonts en todas las páginas                                          | Inter autoalojada en `public/fonts` (variable 400–700; el español solo usa el subset `latin`, 47 KB)                           |
| Iframe de Google Maps en `/contacto` — **la única fuente real de cookies** | Plano estático generado desde OpenStreetMap (ODbL, atribución impresa en la imagen), enlazado a Google Maps solo al hacer clic |
| 3 fotos desde `images.unsplash.com`                                        | Descargadas al repositorio                                                                                                     |

Comprobado sobre el build servido: **todas las peticiones son al propio origen**.
Solo quedan enlaces salientes que activa el visitante (`wa.me` y «Cómo llegar»),
que no requieren consentimiento. Por eso la política de cookies puede decir que
no hay ninguna.

> Si en el futuro se añade analítica, un chat o un mapa incrustado, **vuelve a
> hacer falta banner de consentimiento** y hay que reescribir `/cookies`.

### 7. Páginas legales (`fa8c544`)

Tres rutas nuevas: `/aviso-legal`, `/privacidad`, `/cookies`, enlazadas desde el
footer y desde el aviso de los dos formularios.

Los datos identificativos que exige la LSSI **no están inventados**: salen de la
cabecera de facturas de la empresa (`~/jm-asesores/asesoria-moderna-web/images/cabecera_jmasesores.png`).
Viven en [`src/lib/datos-legales.ts`](src/lib/datos-legales.ts) para que las tres
páginas y el footer no puedan contradecirse.

Dos datos que conviene tener presentes:

- El nombre legal es **María Isabel** Aguilera Orellana; «Maribel» es el
  diminutivo que usa el resto de la web.
- El **domicilio fiscal** (C/ Juan Quirós de los Ríos, 39) es **distinto** del de
  la oficina (Urb. Parquesol, bloque 9, bajo). Ambos figuran en el aviso legal.

La política de privacidad describe lo que de verdad ocurre, no una plantilla: el
sitio es estático, sin base de datos ni analítica, y los formularios componen un
mensaje de WhatsApp en el dispositivo del visitante sin enviar nada a ningún
servidor propio. Advierte de que WhatsApp implica a Meta y ofrece correo y
teléfono como alternativa.

> **Los textos no los ha revisado un profesional.** Son correctos en los hechos,
> pero el criterio legal es del propietario (que además es asesor).

### 8. SEO técnico (`5935cde`)

La base estaba bien (contenido en el HTML inicial, un `h1` por página, títulos y
descripciones únicos, `alt` en todas las imágenes). No existía nada de esto:

- **Canonical** y **`og:url`** en las 14 páginas, absolutas.
- **`og:image`**: solo la tenían los artículos, **y era relativa** — las redes
  sociales descartan las que no son absolutas, así que compartir un artículo salía
  sin miniatura. Se generó además una imagen 1200×630 por defecto
  (`og-default.jpg`) para las páginas sin foto.
- **JSON-LD**: `AccountingService` con dirección, coordenadas reales de la
  oficina, horario, área servida y catálogo de servicios; `WebSite`;
  `BreadcrumbList`; `BlogPosting`.
- **`robots.txt`** y **`sitemap.xml`**, generados por el prerender a partir de las
  rutas realmente renderizadas, así que no se pueden desincronizar.

También se corrigieron saltos de nivel en los encabezados (los `h4` del footer
iban tras un `h2`; en la home se pasaba de `h1` a `h3`) y una **incoherencia de
horario**: la home decía «L–V · 9:00–18:00» y `/contacto` «9:00–14:00 y
16:00–19:00». Se unificó al segundo, más específico.

> ⚠️ **CONFIRMAR EL HORARIO CON EL PROPIETARIO.** Ahora también va en los datos
> estructurados, así que un error ahí lo publica Google.

### 9. Dominio propio (`37e2022`)

Todo lo que cambia al mudarse de dominio vive en
[`src/lib/sitio.ts`](src/lib/sitio.ts): `SITIO_URL`, `INDEXABLE`, el NAP, las
coordenadas y el horario. Cambiar de dominio otra vez son **dos líneas**.

El proceso, por si hay que repetirlo:

1. Zona creada en Cloudflare (el alta falla con «importar DNS automático» si el
   dominio aún no resuelve).
2. En IONOS hubo que **desactivar el Domain Guard**, que bloquea cualquier cambio
   de DNS —era lo que impedía también activar el SSL que se había comprado—. La
   desactivación exige **confirmación por correo**.
3. Nameservers a `cosmin.ns.cloudflare.com` e `isabel.ns.cloudflare.com`; Domain
   Guard reactivado después.
4. Despliegue **en dos pasos**: primero añadir los dominios propios manteniendo
   `workers.dev` vivo, verificar que sirven, y solo entonces poner
   `"workers_dev": false`. La zona estuvo un rato en estado _pendiente_ en
   Cloudflare; desplegando de golpe la web habría estado caída ese rato.
5. Regla de redirección `www` → apex (301) desde el panel de Cloudflare.

> El registro `.es` tardó horas en publicar la delegación y devolvía `NXDOMAIN`
> incluso con los nameservers de IONOS, desde antes de tocar nada. Al comprobar
> propagación, **exigir registros NS reales**: un `dig` que falla o expira no
> devuelve nada y `! grep -q NXDOMAIN` da un falso positivo (pasó dos veces).
>
> El `.es` tiene un **TTL de caché negativa de 24 h**, así que tras propagar un
> resolver puede seguir diciendo que el dominio no existe durante horas.

### 10. Ajustes de contenido (`c1dbf26`, `44a09f8`, `ab90d65`)

- Botón flotante de WhatsApp al color de marca. El glifo anterior dejaba un 16 %
  de aire por lado dentro del viewBox y se veía diminuto; se cambió por el oficial.
- **Reseñas eliminadas** de la home (incluido el «4.9 / 5 · valoraciones reales»).
  La home se quedó sin prueba social: si algún día hay reseñas reales de Google,
  merece la pena traerlas con enlace a la ficha.
- **Vertex Studio** (`vertexstudiolab.es`, del propietario) aparece como socio
  tecnológico: sección en la home entre «Sobre nosotros» y «Por qué JM Asesores»,
  atribución en el bloque de digitalización de `/servicios` y crédito de autoría
  en el footer.
- El contacto de proyectos de digitalización es el de **Vertex Studio**
  (675 17 23 71 · dariojesusgarcia6@gmail.com), no el de la asesoría. El de la
  asesoría sigue intacto en el footer, `/contacto`, el formulario y el JSON-LD.

---

## Pendiente

### Necesita material del propietario

1. **Fotos del blog.** Siguen siendo stock en inglés y alemán («Payroll»,
   «TAXI-10») en artículos sobre IRPF y Seguridad Social española. Chirría.
2. **Logo en vector o alta resolución.** Lo actual (419×84) da 2,1× y cumple para
   retina, pero un SVG lo resolvería para siempre.
3. **Retrato de Maribel.** `/sobre-nosotros` funciona sin él (se quitó el marco
   vacío), pero una foto real reforzaría la página que existe para poner cara al
   negocio.

### Decisiones abiertas

4. **Confirmar el horario** (ver §8). Va en los datos estructurados.
5. **Reembolso del SSL wildcard de IONOS.** No hace falta: Cloudflare emite
   Universal SSL gratis para el apex y los subdominios, ya verificado en
   producción. El certificado de IONOS además no serviría, porque el sitio no está
   alojado allí.
6. **Revisión legal de los textos** de `/aviso-legal`, `/privacidad` y `/cookies`.

### Mejoras propuestas y no hechas

7. **Google Search Console**: dar de alta el sitio y enviar el sitemap para
   acelerar la indexación. Se puede verificar con un registro TXT en Cloudflare.
8. **Actions del workflow desactualizadas** — ya no aplica, el workflow se
   eliminó al dejar GitHub Pages. Mencionado por si se reintroduce CI.
9. Los 6 warnings de `react-refresh` que quedan en `npm run lint` son de
   componentes de shadcn/ui, propios de la librería.

---

## Cosas que pueden morder

- **`INDEXABLE` en `src/lib/sitio.ts`**: si se pone en `false`, el `robots.txt`
  pasa a `Disallow: /` y la web desaparece de Google. Estuvo así a propósito
  mientras el sitio vivía en una URL provisional.
- **Cloudflare inyecta su propio bloque en `robots.txt`** por encima del nuestro:
  permite buscadores y bloquea crawlers de entrenamiento de IA (GPTBot,
  ClaudeBot, Google-Extended…). Se configura en _AI Crawl Control_, no en el
  repositorio.
- **El prerender descubre las páginas siguiendo enlaces internos** desde la home.
  Una ruta nueva sin ningún enlace que llegue a ella **no se genera** y no entra
  en el sitemap.
- **`grep` con acentos** falló varias veces al verificar contenido servido
  (dando falsos «FALTA»). Para comprobar textos en español, usar Python con
  `encoding="utf-8"`.
- El remote de git tenía un **token de GitHub en texto plano**; se limpió y ahora
  autentica por el keychain vía `gh`.
