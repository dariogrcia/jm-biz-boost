import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/34696387037"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      // Color de marca, no el verde de WhatsApp: es el mismo naranja de los CTA
      // del sitio. El halo lo despega del fondo cuando cae sobre una foto.
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-ink text-white shadow-elegant ring-4 ring-brand-ink/25 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
