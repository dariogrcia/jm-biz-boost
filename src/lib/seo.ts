import { INDEXABLE, urlAbsoluta } from "./sitio";
import { migasJsonLd } from "./estructurados";
import ogPorDefecto from "@/assets/og-default.jpg";

type Opciones = {
  /** Ruta del sitio, empezando por "/". */
  ruta: string;
  titulo: string;
  descripcion: string;
  /** Imagen para compartir. Debe ser la URL que Vite devuelve al importarla. */
  imagen?: string;
  /** "article" para las entradas del blog; el resto son "website". */
  tipo?: "website" | "article";
  /** Fecha de publicación en ISO, solo para artículos. */
  publicado?: string;
  /** Migas de pan, de la raíz a la página actual. */
  migas?: { nombre: string; ruta: string }[];
};

/**
 * Construye los meta y links de una página. Centralizado para que ninguna ruta
 * se quede sin canonical, sin og:url o con una og:image relativa — las redes
 * sociales descartan las imágenes que no son absolutas.
 */
export function seo({
  ruta,
  titulo,
  descripcion,
  imagen,
  tipo = "website",
  publicado,
  migas,
}: Opciones) {
  const url = urlAbsoluta(ruta);
  const img = urlAbsoluta(imagen ?? ogPorDefecto);

  return {
    meta: [
      { title: titulo },
      { name: "description", content: descripcion },
      {
        name: "robots",
        content: INDEXABLE ? "index, follow, max-image-preview:large" : "noindex, nofollow",
      },

      { property: "og:site_name", content: "JM Asesores" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:type", content: tipo },
      { property: "og:url", content: url },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descripcion },
      { property: "og:image", content: img },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: titulo },
      { name: "twitter:description", content: descripcion },
      { name: "twitter:image", content: img },

      ...(publicado ? [{ property: "article:published_time", content: publicado }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
    ...(migas ? { scripts: [jsonLd(migasJsonLd(migas))] } : {}),
  };
}

/** Inserta un bloque JSON-LD en el head. */
export function jsonLd(datos: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(datos) };
}
