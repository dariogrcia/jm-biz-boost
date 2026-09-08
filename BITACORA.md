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

### 11. Google Search Console (8-sep-2026)

Propiedad de **tipo Dominio** (`sc-domain:jmasesoresantequera.es`), no de prefijo
de URL: cubre el apex, `www`, cualquier subdominio futuro y ambos protocolos con
una sola propiedad.

Verificada por **registro TXT en la raíz**, no con el flujo automático que ofrece
Google. Ese flujo pide autorización OAuth para que Google acceda a la cuenta de
Cloudflare entera; el TXT consigue lo mismo sin conceder ningún acceso.

Sitemap `https://jmasesoresantequera.es/sitemap.xml` enviado y leído el mismo
día: estado **Correcto**, 14 páginas descubiertas.

> ⚠️ **No borrar el registro TXT de la zona.** Es lo que sostiene la
> verificación: si desaparece, Google acaba revocando la propiedad y se pierden
> los datos históricos. Es el registro `TXT @` con contenido
> `google-site-verification=…`, en «Solo DNS» (sin proxear, como debe estar).
>
> Para mayor seguridad, Search Console recomienda añadir un segundo método de
> verificación en _Ajustes → Verificación de la propiedad_. No se hizo.

**Qué esperar:** la indexación no es inmediata. Google suele tardar de días a un
par de semanas en rastrear y mostrar las páginas. En _Indexación → Páginas_ se ve
el progreso. Si urge una URL concreta, «Inspección de URLs» permite solicitar
indexación individual.

### 12. Perfil de Empresa de Google y corrección del horario (8-sep-2026)

Para búsquedas locales tipo «asesoría en Antequera», lo que aparece arriba es el
_local pack_ (el mapa con tres negocios), y eso lo controla el Perfil de Empresa,
no la web. Por eso era la acción de mayor impacto pendiente.

Antes de crearlo se comprobó que **no existía ficha previa** que reclamar (hay
«JM Asesores» en Alcorcón, Almendralejo, Murcia y Burgos, ninguno en Antequera).
Crear un duplicado sobre una ficha existente perjudica el posicionamiento.

Configuración aplicada:

- Nombre **«JM Asesores»** exacto, sin añadir la ciudad: meter la localidad en el
  nombre va contra las directrices de Google y puede acarrear suspensión.
- Categoría principal _Asesor fiscal_.
- Dirección de la **oficina** (Urb. Parquesol), no el domicilio fiscal, con el
  NAP idéntico al de la web y del JSON-LD.
- Zona de servicio: Antequera. Se dejó solo la localidad; añadir provincias
  enteras diluye la relevancia local.
- Cinco servicios, todos respaldados por lo que la web dice que hace.
- Descripción de 555 caracteres basada en los textos de la web.

Se **saltaron** a propósito: las fotos (piden imágenes reales del local y todas
las del repositorio son de stock o generadas, y una foto falsa impide reconocer
el sitio al llegar), el crédito de 400 € de Google Ads (implica compromiso de
gasto) y la prueba de Google Workspace (de pago al terminar).

> **Estado: verificada y visible en Google Maps** (confirmado el 8-sep-2026, con
> URL de lugar propia). Durante el onboarding apareció un «ficha verificada» que
> era prematuro — el panel estuvo un tiempo en «NO ES VISIBLE PÚBLICAMENTE»
> mientras Google procesaba la verificación.

> ⚠️ **La dirección sale recortada en la ficha.** Se introdujo «Urb. Parquesol,
> bloque 9, bajo», pero Google la normalizó a **«bloque 9, bajo, 29200
> Antequera, Málaga»**, sin la urbanización — probablemente porque no la
> reconoce como vía del callejero. Así no se puede localizar el sitio, y rompe
> la coherencia NAP con la web y el JSON-LD, que sí dicen «Urb. Parquesol».
>
> El marcador está además a ~107 m de donde Nominatim sitúa la urbanización
> (ficha: 37.0225954, -4.5717641 · web: 37.0225572, -4.5705576).
>
> **No se corrigió al detectarlo**: editar la dirección de una ficha recién
> verificada puede disparar una nueva verificación y volver a ocultarla varios
> días. Conviene dejar que se asiente y ajustar después, moviendo primero el
> marcador al punto exacto.

**Corrección del horario.** Al pedir confirmación para el perfil, el propietario
aclaró que el horario real es **L–V 9:00–14:00**, solo mañanas. La web publicaba
«9:00–14:00 y 16:00–19:00», que era el dato que quedó marcado como pendiente de
confirmar en §8. Corregido en los tres sitios donde vivía: `/contacto`, la home y
`openingHoursSpecification` de los datos estructurados.

### 13. Animación de entrada al hacer scroll (8-sep-2026)

Petición inicial: usar **HyperFrames** (github.com/heygen-com/hyperframes) para
«hacer la web más atractiva al navegar». HyperFrames renderiza **vídeos MP4** a
partir de HTML, con Chrome headless y ffmpeg — no es una librería de interfaz y
no puede ejecutarse en Cloudflare Workers. Un MP4 no responde al scroll ni al
hover, pesa megas y habría hundido el rendimiento. **No se instaló**; el
objetivo real se resolvió con CSS.

Implementado con **animaciones dirigidas por scroll de CSS**
(`animation-timeline: view()`): cero JavaScript, cero dependencias, cero peso.
Dos utilidades en `src/styles.css`:

- `.reveal` — la sección entra con un desvanecido y una subida de 1,25 rem.
- `.reveal-hijos` — escalona los hijos de una rejilla para que las tarjetas no
  aparezcan todas a la vez.

Aplicado a 7 bloques de la home, las tarjetas de `/servicios` y el listado del
blog. **El hero no se anima a propósito**: es lo primero que se ve y animar lo
que ya está en pantalla al cargar es el error clásico de estos efectos.

> ⚠️ **El orden de las guardas importa.** La `opacity: 0` vive únicamente dentro
> de `@supports (animation-timeline: view())`, anidado a su vez en
> `@media (prefers-reduced-motion: no-preference)`. Si esa opacidad estuviera
> fuera, un navegador sin soporte (Firefox, a día de hoy) dejaría el contenido
> **invisible para siempre**. Verificado sobre el CSS compilado: 2 reglas
> `.reveal` dentro de la guarda, 0 fuera.

### 14. Teléfono único: fuera el fijo (8-sep-2026)

Se retira el fijo **952 70 22 14** y queda solo el móvil **696 387 037**, que ya
era el de WhatsApp. Con él desaparece también el **fax**, que compartía número.

Cambiado en los nueve sitios donde vivía: `sitio.ts` (que alimenta el JSON-LD),
`datos-legales.ts` (aviso legal y privacidad), footer, home —bloque de contacto
y tarjeta «Visítanos»—, `/contacto`, los artículos del blog y `LegalLayout`.
El campo `movil` de ambos ficheros se elimina: era código muerto, no lo leía
nadie, y mantener dos campos para un solo número invita a que se desincronicen.

Las etiquetas pasan de «Teléfono y Fax» / «Móvil» a simplemente **«Teléfono»**:
con un único número, distinguirlo del fijo ya no significa nada.

> El **NAP debe seguir coincidiendo** en web, JSON-LD y Perfil de Empresa de
> Google. El teléfono se actualizó también en la ficha de Google el mismo día.

---

## Pendiente

### Necesita material del propietario

0. **Fotos reales del despacho** para el Perfil de Empresa de Google: fachada
   (para que los clientes reconozcan el sitio) e interior. Hechas con el móvil
   valen. Es de lo que más pesa en el _local pack_.

1. **Fotos del blog.** Siguen siendo stock en inglés y alemán («Payroll»,
   «TAXI-10») en artículos sobre IRPF y Seguridad Social española. Chirría.
2. **Logo en vector o alta resolución.** Lo actual (419×84) da 2,1× y cumple para
   retina, pero un SVG lo resolvería para siempre.
3. **Retrato de Maribel.** `/sobre-nosotros` funciona sin él (se quitó el marco
   vacío), pero una foto real reforzaría la página que existe para poner cara al
   negocio.

### Decisiones abiertas

0. **Ajustar la dirección de la ficha de Google** cuando se haya asentado (ver
   §12): falta «Urb. Parquesol» y el marcador está a ~107 m. Hacerlo con
   cuidado: puede disparar una nueva verificación.

1. ~~Confirmar el horario~~ — **hecho**: es L–V 9:00–14:00, ver §12.
2. **Reembolso del SSL wildcard de IONOS.** No hace falta: Cloudflare emite
   Universal SSL gratis para el apex y los subdominios, ya verificado en
   producción. El certificado de IONOS además no serviría, porque el sitio no está
   alojado allí.
3. **Revisión legal de los textos** de `/aviso-legal`, `/privacidad` y `/cookies`.

### Mejoras propuestas y no hechas

7. ~~Google Search Console~~ — **hecho** el 8-sep-2026, ver §11.
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
- **El registro `TXT @` con `google-site-verification=`** sostiene la propiedad de
  Search Console. Borrarlo revoca la verificación (ver §11).
