import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPrincipal from "@/assets/logo-principal.png.asset.json";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
] as const;

const WHATSAPP_URL = "https://wa.me/34696387037";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center group shrink-0" aria-label="JM Asesores — Inicio">
            <img
              src={logoPrincipal.url}
              alt="JM Asesores — Gestión de Empresas"
              className="h-9 md:h-10 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-primary" }}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#1ebe5a] text-white">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4" /> Hablemos
              </a>
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="px-4 py-3 text-sm font-medium rounded-md"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 bg-[#25D366] hover:bg-[#1ebe5a] text-white">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                <MessageCircle className="mr-1.5 h-4 w-4" /> Hablemos por WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
