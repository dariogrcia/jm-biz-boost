import { Link } from "@tanstack/react-router";
import { Phone, Smartphone, MapPin, Mail } from "lucide-react";
import { WhatsAppIconOutline } from "./WhatsAppIconOutline";
import logoBlanco from "@/assets/logo-blanco.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logoBlanco}
            alt="JM Asesores — Antequera (Málaga)"
            width={278}
            height={64}
            className="h-10 w-auto"
          />
          <p className="mt-5 max-w-sm text-sm text-primary-foreground/70 leading-relaxed">
            Asesoría fiscal, contable y laboral en Antequera (Málaga). Cerca de ti, contigo todo el año.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-brand-on-dark">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-brand-on-dark">Servicios</Link></li>
            <li><Link to="/sobre-nosotros" className="hover:text-brand-on-dark">Sobre nosotros</Link></li>
            <li><Link to="/blog" className="hover:text-brand-on-dark">Blog</Link></li>
            <li><Link to="/contacto" className="hover:text-brand-on-dark">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-primary-foreground/50 mt-0.5 shrink-0" />
              <a href="tel:+34952702214" className="hover:text-brand-on-dark">Telf. y Fax: 952 70 22 14</a>
            </li>
            <li className="flex items-start gap-2">
              <Smartphone className="h-4 w-4 text-primary-foreground/50 mt-0.5 shrink-0" />
              <a href="tel:+34696387037" className="hover:text-brand-on-dark">Móvil: 696 387 037</a>
            </li>
            <li className="flex items-start gap-2">
              <WhatsAppIconOutline className="h-4 w-4 text-primary-foreground/50 mt-0.5 shrink-0" />
              <a href="https://wa.me/34696387037" target="_blank" rel="noopener noreferrer" className="hover:text-brand-on-dark">
                WhatsApp: +34 696 387 037
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 text-primary-foreground/50 mt-0.5 shrink-0" />
              <a href="mailto:jm_asesores@hotmail.com" className="hover:text-brand-on-dark">jm_asesores@hotmail.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary-foreground/50 mt-0.5 shrink-0" />
              <span>Urb. Parquesol, bloque 9, bajo<br />29200 Antequera (Málaga)</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-primary-foreground/60 flex flex-col md:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} JM Asesores. Todos los derechos reservados.</p>
          <p>Hecho con dedicación en Antequera.</p>
        </div>
      </div>
    </footer>
  );
}
