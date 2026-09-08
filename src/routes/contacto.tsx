import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Smartphone, MapPin, Clock, Send, Mail } from "lucide-react";
import { WhatsAppIconOutline } from "@/components/site/WhatsAppIconOutline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/site/Layout";
import mapaAntequera from "@/assets/mapa-antequera.png";
import { enviarConsultaPorWhatsApp } from "@/lib/consulta";
import heroAntequera from "@/assets/hero-contacto-antequera.jpg";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contacto")({
  head: () =>
    seo({
      ruta: "/contacto",
      titulo: "Contacto — JM Asesores Antequera",
      descripcion:
        "Visítanos en Antequera (Málaga) o escríbenos. Asesoría fiscal, contable y laboral. Te respondemos en menos de 24 horas.",
    }),
  component: Contacto,
});

function Contacto() {
  return (
    <SiteLayout>
      <section
        className="relative text-primary-foreground"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(38,25,15,0.86), rgba(20,12,6,0.66)), url(${heroAntequera})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-white/85 uppercase tracking-wider">
            Contacto
          </span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">
            Estamos en Antequera
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Atendemos a empresas y autónomos de la comarca de Antequera y toda la provincia de
            Málaga. Primera consulta gratuita.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10 shadow-soft">
            <h2 className="text-2xl font-semibold text-primary">Envíanos un mensaje</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Te respondemos en menos de 24 horas laborables.
            </p>
            <form onSubmit={enviarConsultaPorWhatsApp} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input id="nombre" name="nombre" required placeholder="Tu nombre" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="tu@correo.com" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  placeholder="+34 600 000 000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mensaje">Mensaje *</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={6}
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 justify-self-start"
              >
                Enviar mensaje <Send className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Al enviar se abre WhatsApp con tu mensaje para que lo revises antes de mandarlo.
                Esta web no almacena ningún dato: ver la{" "}
                <Link
                  to="/privacidad"
                  className="underline underline-offset-2 hover:text-brand-ink"
                >
                  política de privacidad
                </Link>
                .
              </p>
            </form>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 shadow-elegant">
            <h3 className="font-semibold text-lg">Información de contacto</h3>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary-foreground/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Dirección</div>
                  <div className="font-medium">
                    Urb. Parquesol, bloque 9, bajo
                    <br />
                    29200 Antequera (Málaga)
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary-foreground/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Teléfono y Fax</div>
                  <a href="tel:+34952702214" className="font-medium hover:text-brand-on-dark">
                    952 70 22 14
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-primary-foreground/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Móvil</div>
                  <a href="tel:+34696387037" className="font-medium hover:text-brand-on-dark">
                    696 387 037
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <WhatsAppIconOutline className="h-5 w-5 text-primary-foreground/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">WhatsApp</div>
                  <a
                    href="https://wa.me/34696387037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-brand-on-dark"
                  >
                    +34 696 387 037
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary-foreground/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Email</div>
                  <a
                    href="mailto:jm_asesores@hotmail.com"
                    className="font-medium hover:text-brand-on-dark"
                  >
                    jm_asesores@hotmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary-foreground/50 mt-0.5 shrink-0" />
                <div>
                  <div className="text-primary-foreground/60 text-xs">Horario</div>
                  <div className="font-medium">Lun – Vie · 9:00 – 14:00</div>
                </div>
              </li>
            </ul>

            <Button
              asChild
              variant="outline"
              className="mt-8 w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="https://wa.me/34696387037" target="_blank" rel="noopener noreferrer">
                <WhatsAppIconOutline className="mr-2 h-4 w-4" /> Chatear por WhatsApp
              </a>
            </Button>
          </div>

          {/* Mapa estático propio en lugar del iframe de Google Maps, que ponía
              cookies de terceros en cada visita a esta página. Cartografía de
              OpenStreetMap (ODbL); la atribución va impresa en la imagen. */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Urb.+Parquesol,+bloque+9,+bajo,+29200+Antequera,+M%C3%A1laga"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary"
          >
            <img
              src={mapaAntequera}
              alt="Plano de situación de JM Asesores en la Urbanización Parquesol, Antequera"
              loading="lazy"
              width={720}
              height={540}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-primary/85 px-4 py-3 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary">
              <MapPin className="h-4 w-4" /> Cómo llegar
            </span>
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
