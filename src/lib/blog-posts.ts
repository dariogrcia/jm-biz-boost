import autonomoSl from "@/assets/blog/autonomo-sl.jpg";
import cartaHacienda from "@/assets/blog/carta-hacienda.jpg";
import novedadesFiscales from "@/assets/blog/novedades-fiscales.jpg";
import nominasPyme from "@/assets/blog/nominas-pyme.jpg";
import kitDigital from "@/assets/blog/kit-digital.jpg";
import cuentasAnuales from "@/assets/blog/cuentas-anuales.jpg";

export type Categoria =
  | "Asesoramiento Contable"
  | "Asesoramiento Financiero"
  | "Asesoramiento Fiscal"
  | "Asesoramiento Laboral";

export const CATEGORIAS: Categoria[] = [
  "Asesoramiento Contable",
  "Asesoramiento Financiero",
  "Asesoramiento Fiscal",
  "Asesoramiento Laboral",
];

export type Post = {
  slug: string;
  titulo: string;
  fecha: string;
  fechaISO: string;
  autor: string;
  categoria: Categoria;
  imagen: string;
  extracto: string;
  contenido: { tipo: "p" | "h2" | "ul"; texto?: string; items?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "autonomo-o-sociedad-limitada",
    titulo: "¿Autónomo o Sociedad Limitada? Cómo elegir la mejor forma jurídica",
    fecha: "12 de junio, 2026",
    fechaISO: "2026-06-12",
    autor: "Maribel Aguilera",
    categoria: "Asesoramiento Fiscal",
    imagen: autonomoSl,
    extracto:
      "Una de las primeras dudas al emprender es si darse de alta como autónomo o constituir una sociedad. Te explicamos las diferencias clave.",
    contenido: [
      { tipo: "p", texto: "Una de las decisiones más importantes al iniciar una actividad económica en España es elegir entre darse de alta como autónomo o constituir una sociedad limitada. Cada opción tiene implicaciones fiscales, contables y de responsabilidad muy distintas." },
      { tipo: "h2", texto: "Cuándo conviene ser autónomo" },
      { tipo: "p", texto: "El régimen de autónomo es más sencillo y económico de poner en marcha. Es la opción habitual cuando los ingresos son moderados o el negocio está en fase inicial." },
      { tipo: "h2", texto: "Cuándo conviene constituir una S.L." },
      { tipo: "p", texto: "A partir de cierto nivel de facturación, la sociedad limitada empieza a ser ventajosa fiscalmente y, además, separa el patrimonio personal del empresarial." },
      { tipo: "ul", items: ["Limita la responsabilidad al capital aportado.", "Tributa por Impuesto de Sociedades (tipo fijo).", "Aporta mayor imagen profesional frente a clientes y proveedores."] },
      { tipo: "p", texto: "En JM Asesores analizamos tu caso concreto y te recomendamos la forma jurídica que mejor se ajusta a tu actividad y previsión de ingresos." },
    ],
  },
  {
    slug: "que-hacer-carta-hacienda",
    titulo: "¿Qué hacer si recibes una carta de Hacienda?",
    fecha: "30 de mayo, 2026",
    fechaISO: "2026-05-30",
    autor: "Maribel Aguilera",
    categoria: "Asesoramiento Fiscal",
    imagen: cartaHacienda,
    extracto:
      "Recibir una notificación de la AEAT no siempre es motivo de alarma, pero sí requiere actuar rápido. Te contamos los pasos a seguir.",
    contenido: [
      { tipo: "p", texto: "Una notificación de la Agencia Tributaria suele asustar, pero la mayoría de las veces se trata de simples requerimientos de información o pequeñas discrepancias fáciles de resolver." },
      { tipo: "h2", texto: "Primer paso: leer con calma" },
      { tipo: "p", texto: "Identifica de qué tipo de comunicación se trata, el plazo para responder y el órgano que la emite. No ignores nunca una carta de Hacienda: los plazos son muy estrictos." },
      { tipo: "h2", texto: "Segundo paso: contactar con tu asesor" },
      { tipo: "p", texto: "Antes de responder por tu cuenta, consulta con un profesional. Una respuesta mal redactada puede complicar mucho el procedimiento." },
      { tipo: "ul", items: ["Conserva todos los documentos relacionados.", "No firmes ni aceptes nada sin asesoramiento.", "Cumple siempre los plazos: suelen ser de 10 días hábiles."] },
    ],
  },
  {
    slug: "novedades-fiscales-2026",
    titulo: "Principales novedades fiscales para autónomos y pymes en 2026",
    fecha: "15 de mayo, 2026",
    fechaISO: "2026-05-15",
    autor: "Equipo JM Asesores",
    categoria: "Asesoramiento Fiscal",
    imagen: novedadesFiscales,
    extracto:
      "Repasamos los cambios normativos más relevantes de este año en IRPF, IVA, cotizaciones de autónomos y obligaciones digitales.",
    contenido: [
      { tipo: "p", texto: "El nuevo ejercicio ha traído cambios significativos en materia tributaria que afectan tanto a autónomos como a pequeñas y medianas empresas." },
      { tipo: "h2", texto: "Cotizaciones por ingresos reales" },
      { tipo: "p", texto: "Se consolida el sistema de cotización en función de los rendimientos netos del autónomo, con nuevos tramos y obligación de regularización anual." },
      { tipo: "h2", texto: "Factura electrónica obligatoria" },
      { tipo: "p", texto: "Se acerca la obligatoriedad de la facturación electrónica B2B para empresas y autónomos. Conviene preparar los sistemas con tiempo." },
      { tipo: "ul", items: ["Nuevos tramos de cotización RETA.", "Avance del despliegue de Verifactu.", "Cambios en deducciones por maternidad e inversión."] },
    ],
  },
  {
    slug: "optimizar-nominas-pyme",
    titulo: "Cómo optimizar la gestión de nóminas en tu pyme",
    fecha: "28 de abril, 2026",
    fechaISO: "2026-04-28",
    autor: "Equipo JM Asesores",
    categoria: "Asesoramiento Laboral",
    imagen: nominasPyme,
    extracto:
      "Una buena gestión de nóminas evita errores, sanciones y mejora la relación con la plantilla. Estas son nuestras recomendaciones.",
    contenido: [
      { tipo: "p", texto: "Las nóminas son uno de los procesos más sensibles dentro de cualquier empresa: cualquier error puede generar problemas con los trabajadores o con la Seguridad Social." },
      { tipo: "h2", texto: "Centraliza y digitaliza" },
      { tipo: "p", texto: "Disponer de un software laboral conectado con el calendario, contratos y partes de variables reduce drásticamente los errores y el tiempo dedicado." },
      { tipo: "h2", texto: "Revisa convenios y categorías" },
      { tipo: "p", texto: "Una revisión periódica del convenio aplicable y de las categorías profesionales evita reclamaciones y posibles sanciones." },
      { tipo: "ul", items: ["Audita las cotizaciones cada trimestre.", "Automatiza las comunicaciones con la SS.", "Forma a tu equipo en las novedades laborales."] },
    ],
  },
  {
    slug: "kit-digital-pymes",
    titulo: "Kit Digital y digitalización: cómo aprovechar las ayudas",
    fecha: "10 de abril, 2026",
    fechaISO: "2026-04-10",
    autor: "Maribel Aguilera",
    categoria: "Asesoramiento Financiero",
    imagen: kitDigital,
    extracto:
      "El programa Kit Digital sigue activo. Te explicamos cómo solicitarlo y qué soluciones tecnológicas puedes implantar con la subvención.",
    contenido: [
      { tipo: "p", texto: "El Kit Digital es una ayuda pública orientada a la digitalización de autónomos y pymes. Cubre soluciones como página web, comercio electrónico, gestión de clientes o ciberseguridad." },
      { tipo: "h2", texto: "¿Quién puede solicitarlo?" },
      { tipo: "p", texto: "Pueden acceder autónomos, microempresas y pymes que cumplan los requisitos del programa y que realicen el test de madurez digital." },
      { tipo: "h2", texto: "Soluciones más demandadas" },
      { tipo: "ul", items: ["Sitio web y presencia básica en internet.", "Gestión de clientes (CRM).", "Gestión de procesos y facturación electrónica.", "Ciberseguridad y puesto de trabajo seguro."] },
      { tipo: "p", texto: "En JM Asesores te acompañamos tanto en la tramitación de la ayuda como en la implantación de la solución tecnológica más adecuada para tu negocio." },
    ],
  },
  {
    slug: "cuentas-anuales-paso-a-paso",
    titulo: "Cuentas anuales: qué son y por qué son tan importantes",
    fecha: "22 de marzo, 2026",
    fechaISO: "2026-03-22",
    autor: "Equipo JM Asesores",
    categoria: "Asesoramiento Contable",
    imagen: cuentasAnuales,
    extracto:
      "Las cuentas anuales son la radiografía económica de tu empresa. Te explicamos qué incluyen y los plazos clave para su presentación.",
    contenido: [
      { tipo: "p", texto: "Las cuentas anuales son el reflejo fiel de la situación económica, financiera y patrimonial de una sociedad al cierre del ejercicio." },
      { tipo: "h2", texto: "Qué documentos las componen" },
      { tipo: "ul", items: ["Balance de situación.", "Cuenta de pérdidas y ganancias.", "Memoria económica.", "Estado de cambios en el patrimonio neto (cuando aplica)."] },
      { tipo: "h2", texto: "Plazos importantes" },
      { tipo: "p", texto: "Tras el cierre del ejercicio, las cuentas deben formularse, aprobarse en junta y depositarse en el Registro Mercantil dentro de los plazos legales. Incumplir estos pasos puede acarrear sanciones y el cierre registral." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function recentPosts(limit = 5) {
  return [...posts]
    .sort((a, b) => (a.fechaISO < b.fechaISO ? 1 : -1))
    .slice(0, limit);
}
