// Configuración del sitio para SEO. Todo lo que cambia al mover el sitio de
// dominio vive aquí y en ningún otro sitio.

/**
 * URL pública, sin barra final. Alimenta las canonical, las og:url y el sitemap.
 * Al comprar el dominio propio, cambiar SOLO esta línea (y poner INDEXABLE a true).
 */
export const SITIO_URL = "https://jm-asesores.dariojesusgarcia6.workers.dev";

/**
 * ⚠️ MIENTRAS ESTÉ EN false, EL SITIO NO SE INDEXA EN GOOGLE.
 *
 * Está así a propósito: la URL actual es provisional (un subdominio
 * workers.dev). Si Google indexa estas direcciones, al estrenar el dominio
 * definitivo habría que migrar URLs ya indexadas y arrastrar duplicados, a
 * cambio de una visibilidad hoy prácticamente nula.
 *
 * AL COMPRAR EL DOMINIO: cambiar SITIO_URL arriba y poner esto en true.
 */
export const INDEXABLE = false;

export const NEGOCIO = {
  nombre: "JM Asesores",
  descripcion:
    "Asesoría fiscal, contable y laboral para autónomos y empresas de Antequera y la provincia de Málaga.",
  calle: "Urb. Parquesol, bloque 9, bajo",
  localidad: "Antequera",
  provincia: "Málaga",
  codigoPostal: "29200",
  pais: "ES",
  // Coordenadas de la oficina (Urb. Parquesol), vía Nominatim/OpenStreetMap.
  latitud: 37.0225572,
  longitud: -4.5705576,
  telefono: "+34952702214",
  movil: "+34696387037",
  email: "jm_asesores@hotmail.com",
  // Horario de la oficina. Si cambia, cambiarlo también en /contacto y en la home.
  horario: [
    {
      dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      abre: "09:00",
      cierra: "14:00",
    },
    {
      dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      abre: "16:00",
      cierra: "19:00",
    },
  ],
  fundadora: "María Isabel Aguilera Orellana",
} as const;

/** Convierte una ruta relativa en URL absoluta para canonical, og:url y sitemap. */
export function urlAbsoluta(ruta: string): string {
  return SITIO_URL + (ruta === "/" ? "" : ruta.replace(/\/$/, ""));
}
