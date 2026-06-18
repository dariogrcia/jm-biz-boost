import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Facebook, Instagram, Sparkles, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-brand-foreground">
              <Sparkles className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-semibold">JM Asesores</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Asesoría especializada en digitalización de empresas. Software a medida y presencia online.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-brand">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-brand">Servicios</Link></li>
            <li><Link to="/sobre-nosotros" className="hover:text-brand">Sobre nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-brand">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><a href="#" className="hover:text-brand">Aviso legal</a></li>
            <li><a href="#" className="hover:text-brand">Política de privacidad</a></li>
            <li><a href="#" className="hover:text-brand">Cookies</a></li>
            <li><a href="#" className="hover:text-brand">Condiciones</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand" /> hola@jmasesores.es</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand" /> +34 900 123 456</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-brand mt-0.5" /> Calle Mayor 12, Madrid</li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-brand hover:text-brand-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-primary-foreground/60 flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} JM Asesores. Todos los derechos reservados.</p>
          <p>Hecho con dedicación en España.</p>
        </div>
      </div>
    </footer>
  );
}
