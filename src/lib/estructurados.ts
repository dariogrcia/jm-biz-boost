import { NEGOCIO, SITIO_URL, urlAbsoluta } from "./sitio";
import { DATOS_LEGALES } from "./datos-legales";
import type { Post } from "./blog-posts";
import ogPorDefecto from "@/assets/og-default.jpg";

// Datos estructurados (JSON-LD). Para un negocio local es lo que permite a Google
// entender que hay una oficina física en Antequera, con qué horario y a quién
// atiende, en vez de tener que deducirlo del texto.

const ID_NEGOCIO = `${SITIO_URL}/#negocio`;

/**
 * AccountingService es el tipo específico de schema.org para una asesoría;
 * hereda de LocalBusiness, así que sirve igual para la ficha local.
 */
export function negocioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": ID_NEGOCIO,
    name: NEGOCIO.nombre,
    legalName: DATOS_LEGALES.titular,
    vatID: DATOS_LEGALES.nif,
    description: NEGOCIO.descripcion,
    url: SITIO_URL,
    image: urlAbsoluta(ogPorDefecto),
    logo: urlAbsoluta(ogPorDefecto),
    telephone: NEGOCIO.telefono,
    email: NEGOCIO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: NEGOCIO.calle,
      addressLocality: NEGOCIO.localidad,
      addressRegion: NEGOCIO.provincia,
      postalCode: NEGOCIO.codigoPostal,
      addressCountry: NEGOCIO.pais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NEGOCIO.latitud,
      longitude: NEGOCIO.longitud,
    },
    openingHoursSpecification: NEGOCIO.horario.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    })),
    areaServed: [
      { "@type": "City", name: "Antequera" },
      { "@type": "AdministrativeArea", name: "Provincia de Málaga" },
    ],
    founder: { "@type": "Person", name: NEGOCIO.fundadora },
    priceRange: "€€",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de asesoría",
      itemListElement: [
        [
          "Asesoría fiscal",
          "Renta, IVA, Sociedades y planificación fiscal para autónomos y empresas.",
        ],
        ["Asesoría contable", "Contabilidad, cuentas anuales, balances y gestión financiera."],
        ["Asesoría laboral", "Nóminas, contratos, Seguridad Social, ERTEs y gestión de RRHH."],
      ].map(([nombre, descripcion]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: nombre, description: descripcion },
      })),
    },
  };
}

export function sitioWebJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITIO_URL}/#web`,
    url: SITIO_URL,
    name: NEGOCIO.nombre,
    inLanguage: "es-ES",
    publisher: { "@id": ID_NEGOCIO },
  };
}

/** Migas de pan. Google las usa para mostrar la jerarquía en los resultados. */
export function migasJsonLd(migas: { nombre: string; ruta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: migas.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: urlAbsoluta(m.ruta),
    })),
  };
}

export function articuloJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.extracto,
    image: urlAbsoluta(post.imagen),
    datePublished: post.fechaISO,
    dateModified: post.fechaISO,
    articleSection: post.categoria,
    inLanguage: "es-ES",
    author: { "@type": "Organization", name: NEGOCIO.nombre, "@id": ID_NEGOCIO },
    publisher: { "@id": ID_NEGOCIO },
    mainEntityOfPage: { "@type": "WebPage", "@id": urlAbsoluta(`/blog/${post.slug}`) },
  };
}
