import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/34696387037"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant ring-4 ring-[#25D366]/20 hover:scale-105 transition-transform"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
