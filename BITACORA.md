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
Desde el 16-sep-2026, **HTTP redirige a HTTPS** («Usar siempre HTTPS» de Cloudflare,
§15); antes el sitio respondía 200 en los dos esquemas.

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

### 15. HTTPS forzado y diagnóstico de indexación (16-sep-2026)

Search Console avisó por correo de un motivo nuevo: «Página alternativa con etiqueta
canónica adecuada». Es **benigno** —afecta solo a `http://jmasesoresantequera.es/`, y
significa que Google no la indexa porque su canónica apunta a la versión HTTPS, que es
justo lo que debe pasar—. Pero al abrir el informe apareció el dato que el correo no
contaba: **2 páginas indexadas frente a 14 sin indexar**.

| Motivo                                            | Páginas                  |
| ------------------------------------------------- | ------------------------ |
| Página alternativa con etiqueta canónica adecuada | 1 (la home por HTTP)     |
| Descubierta: actualmente sin indexar              | 12                       |
| Rastreada: actualmente sin indexar                | 1 (`/blog`)              |

Las 12 «Descubierta» tenían **último rastreo N/D**: Google nunca las había visitado.
Incluyen `/servicios`, `/sobre-nosotros`, `/contacto` y los 6 artículos del blog.

#### Lo que se verificó que está bien

Comprobado con la prueba en vivo de Search Console (el dominio no cargaba en local por
los bloqueos de LaLiga, ver «Cosas que pueden morder»):

- canonical autorreferencial correcto en `/`, `/servicios` y `/blog`;
- `<meta name="robots" content="index, follow, max-image-preview:large">`;
- la navegación interna viene **en el HTML servido**, no inyectada por JS: el
  prerender hace su trabajo;
- sitemap leído el 15-sep, 14 URLs, todas en `https://`;
- **cero** enlaces `http://` en el HTML ni en el sitemap;
- `/blog` fue rastreada el 14-sep a las 16:33 por Googlebot para smartphones, con
  obtención de página «Correcto».

#### La causa raíz

En Cloudflare, _SSL/TLS → Certificados de perímetro_, la opción **«Usar siempre
HTTPS» estaba desactivada**. El sitio respondía **200 OK por HTTP**, sirviendo el
contenido duplicado en los dos esquemas. De ahí que Google clasificara la home HTTP
como «página alternativa con canónica» y no como «página con redirección»: nunca hubo
un 301.

Y aquí está el efecto secundario que importa: los enlaces internos son **relativos**
(`/servicios`, `/blog/...`), que es lo correcto, pero **heredan el esquema de la
página que los contiene**. Una sola entrada por HTTP propagaba HTTP por todo el sitio.
Se ve en la página de referencia que Search Console registró para `/blog`:
`http://jmasesoresantequera.es/blog`.

Se activó «Usar siempre HTTPS». Verificado: navegando a `http://jmasesoresantequera.es/`
el navegador acaba en `https://`. El modo de cifrado ya estaba en **«Completo»**, así
que no había riesgo de bucle de redirecciones, y la prueba en vivo de Google sobre la
URL HTTP sigue respondiendo sin error.

Se solicitó además indexación manual de `/servicios`, `/sobre-nosotros`, `/contacto` y
`/blog`. Las cuatro confirmadas por Google en «cola de rastreo prioritaria».

#### Conclusión

**No hay ningún fallo técnico que explique las 12 páginas sin rastrear.** El cuello de
botella es la **autoridad del dominio**: el sitemap se envió el 8-sep, ocho días antes.
«Descubierta: actualmente sin indexar» en un dominio nuevo sin enlaces entrantes es la
cola de rastreo de Google, no un error de configuración. Lo que mueve la aguja son
enlaces entrantes, no más ajustes técnicos.

### 16. Auditoría de seguridad y endurecimiento (16-sep-2026)

Se pasó la skill **security-audit** de Cloudflare
([`cloudflare/security-audit-skill`](https://github.com/cloudflare/security-audit-skill),
instalada en `~/.claude/skills/security-audit`) sobre el commit `87fc5a2`, en perfil
**`quick`** y **solo lectura de código**: el Mac no puede montar el sandbox que exige la
skill para ejecutar el proyecto, así que no se ejecutó nada ni se tocó producción. El
informe completo queda **fuera del repo**, en
`~/security-audit-skill/jm-biz-boost/run-1/REPORT.md`.

**Resultado: ninguna vulnerabilidad.** 10 unidades de cobertura cerradas, crítico final
sin huecos. Es lo esperable: en producción no se ejecuta código (Worker sin `main`), no
hay login, cookies, base de datos ni secretos, y el formulario solo abre un enlace de
`wa.me` sin enviar nada a ningún servidor. Tampoco hay secretos en el historial de git.

#### Endurecimiento aplicado

| Cambio | Por qué |
| --- | --- |
| `package-lock.json`: añadidos `resolved` + `integrity` a **380 de 502** entradas | Venían sin hash desde la migración Bun → npm (§3). Se tomaron del registro de npm **para las mismas versiones exactas** (ninguna dependencia cambia) y se verificó con `npm ci`, que comprueba cada hash contra el tarball. |
| README y AGENTS: `npm install` → **`npm ci`** | Instala exactamente lo que fija el lockfile y falla si hay deriva. |
| `jsonLd()` (`src/lib/seo.ts`) escapa `<`, `>`, `&`, U+2028 y U+2029 | El JSON-LD va sin escapar dentro de `<script>`. Hoy los datos son constantes, pero si el blog llegara a venir de un CMS, un `</script>` en un título inyectaría HTML. Los 43 bloques generados siguen siendo JSON válido. |
| `.gitignore`: `.env` y `.env.*` (salvo `.env.example`) | No existía ninguno, pero no estaban cubiertos. |
| `vite.config.ts`: servidor de desarrollo en `localhost` en vez de `::` | Antes era accesible desde cualquier equipo de la red (wifi pública incluida). Para probar desde el móvil: `npm run dev -- --host`. |
| `scripts/prerender.mjs`: descarta rutas que salgan de `dist/client` | Un enlace con `..` podía escribir fuera de la carpeta de salida. Solo el propio contenido alimenta el rastreo, así que era defensa en profundidad. |
| Eliminados `src/components/ui/sidebar.tsx` y `src/hooks/use-mobile.tsx` | Sin uso. El sidebar escribía una cookie `sidebar_state`, lo que contradecía «esta web no usa cookies» si algún día se importaba. `npm run lint` pasa de 6 a 5 warnings. |

Verificado: `tsc --noEmit` limpio, `npm run build` y `npm run prerender` generan las
mismas **14 páginas** y el sitemap con 14 URLs.

Commit `78d51f5`. **Desplegado el mismo día** con `npm run deploy` (versión del Worker
`89752efc-d4cc-4a69-bda7-62aa860f6dcd`; 36 assets, 21 ya subidos). Verificado en
producción: `/` y `/blog/novedades-fiscales-2026` responden 200 y `/no-existe` 404, y
las tres respuestas son **idénticas byte a byte** al build local. A las 23:57 el
bloqueo de LaLiga ya se había levantado y la web cargaba desde la conexión local.

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

0. **Activar HSTS en Cloudflare** (_SSL/TLS → Certificados de perímetro_), una vez
   confirmado que la redirección va fina. Comprobar antes en Search Console que la
   página de referencia de `/blog` ya aparece con `https://` y no con `http://`.
   Acordado: **max-age 6 meses, sin `includeSubDomains`, sin preload**. Se dejó para
   más adelante a propósito: HSTS **no se puede desactivar**, vive en el navegador de
   cada visitante durante todo el max-age (ver §15 y «Cosas que pueden morder»).

   **Revisión programada el 23-sep-2026 a las 10:00** con una rutina de Claude
   Code en la nube (`trig_014kxUHBkD4KLPs55sPna4mx`, ejecución única,
   https://claude.ai/code/routines/trig_014kxUHBkD4KLPs55sPna4mx). Lee esta
   bitácora y crea en Claude Docs una checklist para revisar en Search Console:
   si `/servicios`, `/sobre-nosotros`, `/contacto` y `/blog` ya están indexadas,
   la evolución del informe «Páginas» y si la página de referencia de `/blog` ya
   aparece con `https://`. La rutina no entra en Search Console ni toca el repo:
   la revisión la hace el propietario.

1. **Ajustar la dirección de la ficha de Google** cuando se haya asentado (ver
   §12): falta «Urb. Parquesol» y el marcador está a ~107 m. Hacerlo con
   cuidado: puede disparar una nueva verificación.

2. ~~Confirmar el horario~~ — **hecho**: es L–V 9:00–14:00, ver §12.
3. **Reembolso del SSL wildcard de IONOS.** No hace falta: Cloudflare emite
   Universal SSL gratis para el apex y los subdominios, ya verificado en
   producción. El certificado de IONOS además no serviría, porque el sitio no está
   alojado allí.
4. **Revisión legal de los textos** de `/aviso-legal`, `/privacidad` y `/cookies`.
5. **Confirmar que el token de GitHub que estuvo en claro en el remoto está revocado**
   en GitHub (_Settings → Developer settings_), no solo quitado de `.git/config`
   (ver «Cosas que pueden morder» y §16).
6. **¿Gmail personal publicado a propósito?** `src/routes/servicios.tsx:253` enlaza a
   un correo personal de Gmail. No es un secreto, pero conviene confirmar que debe
   ser público o cambiarlo por un correo del despacho (§16).

### Mejoras propuestas y no hechas

7. ~~Google Search Console~~ — **hecho** el 8-sep-2026, ver §11.
8. **Actions del workflow desactualizadas** — ya no aplica, el workflow se
   eliminó al dejar GitHub Pages. Mencionado por si se reintroduce CI.
9. Los 5 warnings de `react-refresh` que quedan en `npm run lint` son de
   componentes de shadcn/ui, propios de la librería (eran 6 hasta quitar el
   sidebar, §16).
10. **Cabeceras de seguridad versionadas** con un `public/_headers`: CSP,
    `frame-ancestors`, `Referrer-Policy`, `X-Content-Type-Options`. Hoy solo existen
    en el panel de Cloudflare (o no existen). No hay fallo explotable (ninguna
    página tiene acciones sensibles), pero tenerlas en el repo las deja revisables.
    Coordinar con la activación de HSTS. Propuesta de la auditoría (§16).

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
- **HSTS es irreversible durante su `max-age`.** Una vez que un navegador recibe la
  cabecera, fuerza HTTPS aunque se desactive en Cloudflare: la instrucción vive en el
  cliente, no en el servidor. `includeSubDomains` deja inaccesible cualquier
  subdominio sin HTTPS válido, y `preload` mete el dominio en una lista compilada
  dentro de Chrome, Firefox y Safari de la que salir tarda meses.
- **«Usar siempre HTTPS» en Cloudflare debe seguir activado** (§15). Si se desactiva,
  el sitio vuelve a responder 200 por HTTP y, al ser relativos los enlaces internos,
  la versión insegura se propaga sola por todo el sitio.
- **Los bloqueos de LaLiga dejan la web inaccesible desde España** durante las
  jornadas de fútbol. Diagnosticado el 16-sep-2026 (antes figuraba aquí como «el
  dominio no carga en el Chrome del propietario, sin diagnosticar»). El dominio
  resuelve a las IPs compartidas de Cloudflare `188.114.96.5` y `188.114.97.5`, que
  los operadores bloquean por orden judicial mientras hay partidos. Ese día el DNS
  respondía bien, pero la conexión al 443 de esas dos IPs no contestaba (otras IPs de
  Cloudflare y el resto de internet, sí). [hayahora.futbol](https://hayahora.futbol/)
  las daba como bloqueadas en **Movistar, Vodafone, Orange, DIGI y MásMóvil** desde
  las ~18:40 hora peninsular.
  - Afecta a **cualquier visitante con conexión española** mientras dure el
    bloqueo, clientes incluidos; pasar a datos móviles no sirve.
  - **No afecta al SEO**: Googlebot rastrea desde fuera de España.
  - Se levanta solo al acabar la jornada. Para ver la web durante un bloqueo: VPN o
    la app 1.1.1.1 (WARP) de Cloudflare.
  - Antes de dar el sitio por caído, consultar hayahora.futbol. Mientras tanto, el
    HTML servido se verifica con la prueba en vivo de Search Console.
  - No hay ajuste de Cloudflare que lo evite con garantías: las IPs son compartidas.
    La única salida segura sería no servir la web detrás de Cloudflare, con sus
    propios costes.
