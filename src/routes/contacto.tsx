import { createFileRoute } from "@tanstack/react-router";
import { Phone, Smartphone, MapPin, Clock, Send, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/site/Layout";
import heroAntequera from "@/assets/hero-contacto-antequera.jpg";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — JM Asesores Antequera" },
      { name: "description", content: "Visítanos en Antequera (Málaga) o escríbenos. Asesoría fiscal, contable y laboral." },
      { property: "og:title", content: "Contacto — JM Asesores Antequera" },
      { property: "og:description", content: "Estamos en Antequera. Te respondemos en menos de 24 horas." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nombre = String(fd.get("nombre") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const telefono = String(fd.get("telefono") ?? "").trim();
    const mensaje = String(fd.get("mensaje") ?? "").trim();
    if (!nombre || !telefono || !mensaje) return;
    const text = `Hola, soy ${nombre}. Teléfono: ${telefono}. Email: ${email}. Mensaje: ${mensaje}`;
    const url = `https://wa.me/34696387037?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  }

  return (
    <SiteLayout>
      <section
        className="relative text-primary-foreground"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(38,25,15,0.78), rgba(20,12,6,0.6)), url(${heroAntequera})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Contacto</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Estamos en Antequera</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Atendemos a empresas y autónomos de la comarca de Antequera y toda la provincia de Málaga. Primera consulta gratuita.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-primary">Envíanos un mensaje</h2>
            <p className="mt-2 text-sm text-muted-foreground">Te respondemos en menos de 24 horas laborables.</p>
            <form onSubmit={onSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input id="nombre" name="nombre" required placeholder="Tu nombre" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type=" ...
              <p className="text-xs text-muted-foreground">Al enviar aceptas nuestra política de privacidad.</p>
            </form>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 shadow-elegant">
            <h3 className="font-semibold text-lg">Información de contacto</h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Dirección</div>
                  <div className="font-medium">Urb. Parquesol, bloque 9, bajo<br />29200 Antequera (Málaga)</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Teléfono y Fax</div>
                  <a href="tel:+34952702214" className="font-medium hover:text-brand">952 70 22 14</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Móvil</div>
                  <a href="tel:+34696387037" className="font-medium hover:text-brand">696 387 037</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">WhatsApp</div>
                  <a href="https://wa.me/34696387037" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand">
                    +34 696 387 037
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Horario</div>
                  <div className="font-medium">Lun – Vie · 9:00 – 14:00 y 16:00 – 19:00</div>
                </div>
              </li>
            </ul>

            <Button asChild className="mt-8 w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white">
              <a href="https://wa.me/34696387037" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Chatear por WhatsApp
              </a>
            </Button>
          </div>

          {/* Map placeholder */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-secondary">
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-brand mx-auto" />
                <div className="mt-3 font-semibold text-primary">Antequera, Málaga</div>
                <div className="text-xs text-muted-foreground mt-1">Urb. Parquesol, bloque 9, bajo</div>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(oklch(0.26 0.04 50 / 0.06) 1px, transparent 1px), linear-gradient(90deg, oklch(0.26 0.04 50 / 0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
