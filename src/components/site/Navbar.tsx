import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-brand-foreground shadow-soft">
              <Sparkles className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-primary">
              JM <span className="text-foreground/70">Asesores</span>
            </span>
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
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/contacto">Hablemos</Link>
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
            <Button asChild className="mt-2 bg-primary text-primary-foreground">
              <Link to="/contacto" onClick={() => setOpen(false)}>Hablemos</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
