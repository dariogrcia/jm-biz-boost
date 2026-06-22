import { Link } from "@tanstack/react-router";
import { Phone, Smartphone, MapPin, MessageCircle } from "lucide-react";
import logoFooter from "@/assets/logo-footer.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="inline-block rounded-lg bg-white p-4 shadow-soft">
            <img
              src={logoFooter}
              alt="JM Asesores — Antequera (Málaga)"
              className="h-auto w-full max-w-[220px]"
            />
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
            Asesoría fiscal, contable y laboral en Antequera (Málaga). Cerca de ti, contigo todo el año.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/" className="hover:text-brand">Inicio</Link></li>
            <li><Link to="/servicios" className="hover:text-brand">Servicios</Link></li>
            <li><Link to="/sobre-nosotros" className="hover:text-brand">Sobre nosotros</Link></li>
            <li><Link to="/blog" className="hover:text-brand">Blog</Link></li>
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
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 text-brand mt-0.5 shrink-0" />
              <a href="tel:+34952702214" className="hover:text-brand">Telf. y Fax: 952 70 22 14</a>
            </li>
            <li className="flex items-start gap-2">
              <Smartphone className="h-4 w-4 text-brand mt-0.5 shrink-0" />
              <a href="tel:+34696387037" className="hover:text-brand">Móvil: 696 387 037</a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="h-4 w-4 text-brand mt-0.5 shrink-0" />
              <a href="https://wa.me/34696387037" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                WhatsApp: +34 696 387 037
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-brand mt-0.5 shrink-0" />
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
