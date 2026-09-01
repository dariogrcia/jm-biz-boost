// El sitio es estático (GitHub Pages, sin backend), así que los formularios no
// se envían a ningún endpoint: se convierten en un mensaje de WhatsApp que el
// visitante revisa antes de mandar. Lo usan tanto el formulario de la home como
// el de /contacto, para que ambos se comporten igual.

const WHATSAPP_NUMERO = "34696387037";

export function enviarConsultaPorWhatsApp(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const nombre = String(fd.get("nombre") ?? "").trim();
  const email = String(fd.get("email") ?? "").trim();
  const telefono = String(fd.get("telefono") ?? "").trim();
  const mensaje = String(fd.get("mensaje") ?? "").trim();

  if (!nombre || !telefono || !mensaje) return;

  const lineas = [
    `Hola, soy ${nombre}.`,
    `Teléfono: ${telefono}`,
    email ? `Email: ${email}` : null,
    "",
    mensaje,
  ].filter((l) => l !== null);

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(lineas.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
