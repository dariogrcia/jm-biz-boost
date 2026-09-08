// Configuración del sitio para SEO. Todo lo que cambia al mover el sitio de
// dominio vive aquí y en ningún otro sitio.

/**
 * URL pública, sin barra final. Alimenta las canonical, las og:url y el sitemap.
 * Al comprar el dominio propio, cambiar SOLO esta línea (y poner INDEXABLE a true).
 */
export const SITIO_URL = "https://jmasesoresantequera.es";

/**
 * Con el dominio propio en marcha, el sitio ya es indexable. Poner esto en false
 * solo tendría sentido para sacar el sitio de Google a propósito.
 */
export const INDEXABLE = true;

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
  // Horario de la oficina, confirmado por el propietario el 8-sep-2026.
  // Si cambia, cambiarlo también en /contacto, en la home y en el Perfil de
  // Empresa de Google, que publica este mismo dato.
  horario: [
    {
      dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      abre: "09:00",
      cierra: "14:00",
    },
  ],
  fundadora: "María Isabel Aguilera Orellana",
} as const;

/** Convierte una ruta relativa en URL absoluta para canonical, og:url y sitemap. */
export function urlAbsoluta(ruta: string): string {
  return SITIO_URL + (ruta === "/" ? "" : ruta.replace(/\/$/, ""));
}
