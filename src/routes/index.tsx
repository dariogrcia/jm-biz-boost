import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calculator,
  BookOpen,
  Users,
  ShieldCheck,
  MapPin,
  Clock,
  Award,
  Phone,
  Smartphone,
  Star,
  Quote,
  Send,
} from "lucide-react";
import { WhatsAppIconOutline } from "@/components/site/WhatsAppIconOutline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiteLayout } from "@/components/site/Layout";
import { enviarConsultaPorWhatsApp } from "@/lib/consulta";
import antequeraImg from "@/assets/antequera.jpg";
import heroHome from "@/assets/hero-home.jpg";
import officeImg from "@/assets/office-warm.jpg";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      ruta: "/",
      titulo: "JM Asesores — Asesoría Fiscal, Contable y Laboral en Antequera",
      descripcion:
        "Asesoría de confianza en Antequera (Málaga). Servicios fiscales, contables y laborales para autónomos y empresas. Primera consulta gratuita.",
    }),
  component: Home,
});

const servicios = [
  {
    i: Calculator,
    t: "Asesoría Fiscal",
    d: "Renta, IVA, Sociedades y planificación fiscal para autónomos y empresas.",
  },
  {
    i: BookOpen,
    t: "Asesoría Contable",
    d: "Contabilidad, cuentas anuales, balances y gestión financiera.",
  },
  {
    i: Users,
    t: "Asesoría Laboral",
    d: "Nóminas, contratos, Seguridad Social, ERTEs y gestión de RRHH.",
  },
];

const resenas = [
  {
    nombre: "Laura Jiménez",
    texto:
      "Llevan mi negocio desde hace años. Profesionales, cercanos y siempre disponibles cuando los necesito.",
    rol: "Autónoma · Antequera",
  },
  {
    nombre: "Carlos Romero",
    texto:
      "Pasamos a JM Asesores y notamos el cambio desde el primer mes. Por fin tengo la contabilidad clara.",
    rol: "Pyme · Málaga",
  },
  {
    nombre: "Ana Molina",
    texto:
      "Maribel y su equipo me han ayudado con la renta y el alta como autónoma. Todo fácil y sin estrés.",
    rol: "Cliente desde 2022",
  },
  {
    nombre: "David Pérez",
    texto:
      "Trato excelente y respuesta rapidísima. Recomendados al 100% para cualquier empresa de la zona.",
    rol: "Comercio local",
  },
];

const logos = ["AEAT", "S. Social", "Reg. Mercantil", "C. Comercio", "ATA", "CEA"];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section
        className="relative flex min-h-[640px] items-center justify-center overflow-hidden text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${heroHome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium text-white/90">
            <MapPin className="h-3 w-3" /> Antequera · Málaga
          </span>
          <p className="mt-6 text-xl font-bold tracking-[0.3em] uppercase text-white/90">
            JM Asesores
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Tu negocio,
            <br />
            en <span className="text-brand italic">buenas manos.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Asesoría fiscal, contable y laboral para autónomos y empresas de Antequera y toda
            Málaga.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-brand-ink text-brand-foreground hover:bg-brand-ink/90 shadow-elegant"
            >
              <Link to="/contacto">
                Consulta gratuita <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICE CARDS — overlap hero */}
      <section
        aria-labelledby="titulo-servicios"
        className="relative -mt-20 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* La sección no lleva titular visible por diseño (las tarjetas se montan
            sobre el hero), pero sin él se saltaba de h1 a h3. */}
        <h2 id="titulo-servicios" className="sr-only">
          Nuestros servicios
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {servicios.map(({ i: Icon, t, d }) => (
            <div
              key={t}
              className="group rounded-2xl border border-border bg-card p-8 shadow-elegant hover:-translate-y-1 transition-all"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <Link
                to="/servicios"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink"
              >
                Más información <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS — image + text */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative">
            <img
              src={officeImg}
              alt="Despacho de JM Asesores en Antequera"
              loading="lazy"
              width={1024}
              height={1024}
              className="rounded-2xl shadow-elegant w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block rounded-2xl bg-brand-ink text-brand-foreground p-6 shadow-elegant max-w-[200px]">
              <div className="text-4xl font-bold">+20</div>
              <div className="text-xs uppercase tracking-wider mt-1">años de experiencia</div>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
              Sobre nosotros
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-primary leading-tight">
              Una asesoría
              <br />
              con nombre propio.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Somos JM Asesores, una asesoría familiar en el corazón de Antequera. Acompañamos a
              autónomos y pymes en su día a día con un servicio cercano, riguroso y de verdad
              personal.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Detrás de cada cliente hay una historia, y por eso trabajamos con calma, claridad y
              total transparencia. Sin sorpresas, sin tecnicismos innecesarios.
            </p>
            <p className="mt-8 flex items-center gap-3 text-sm">
              <span className="h-px w-8 shrink-0 bg-border" />
              <span>
                <span className="font-semibold text-primary">Maribel Aguilera Orellana</span>
                <span className="text-muted-foreground"> · Fundadora</span>
              </span>
            </p>
            <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/sobre-nosotros">
                Conoce al equipo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
              Reseñas Google
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-primary">
              Lo que dicen nuestros clientes
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1 text-brand">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                4.9 / 5 · valoraciones reales
              </span>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {resenas.map((r) => (
              <article
                key={r.nombre}
                className="rounded-2xl bg-card p-6 border border-border shadow-soft flex flex-col"
              >
                <Quote className="h-7 w-7 text-brand/40" />
                <p className="mt-4 text-sm text-foreground leading-relaxed flex-1">"{r.texto}"</p>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="font-semibold text-primary text-sm">{r.nombre}</div>
                  <div className="text-xs text-muted-foreground">{r.rol}</div>
                  <div className="mt-1 flex text-brand">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-[0.2em]">
            Por qué JM Asesores
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-primary">
            Cercanía local, rigor profesional
          </h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            {
              i: ShieldCheck,
              t: "Confianza",
              d: "Más de dos décadas asesorando a empresas y autónomos de Antequera.",
            },
            {
              i: Award,
              t: "Experiencia",
              d: "Equipo titulado y en formación continua en normativa fiscal y laboral.",
            },
            {
              i: Clock,
              t: "Atención directa",
              d: "Respuesta ágil, sin intermediarios. Una persona responsable de tu cuenta.",
            },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-card p-8 border border-border">
              <Icon className="h-7 w-7 text-brand" />
              <h3 className="mt-4 text-lg font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONSULTA GRATUITA — form */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-14 shadow-elegant grid md:grid-cols-2 gap-10 md:items-center">
          <div>
            <span className="text-sm font-semibold text-primary-foreground/70 uppercase tracking-[0.2em]">
              Primera consulta
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Consulta gratuita y sin compromiso
            </h2>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed">
              Cuéntanos brevemente qué necesitas y te llamamos para una primera valoración sin
              coste. Te respondemos en menos de 24 horas laborables.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary-foreground/50" />
                <a href="tel:+34952702214" className="hover:text-brand-on-dark">
                  952 70 22 14 (Telf. y Fax)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="h-4 w-4 text-primary-foreground/50" />
                <a href="tel:+34696387037" className="hover:text-brand-on-dark">
                  696 387 037 (Móvil)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <WhatsAppIconOutline className="h-4 w-4 text-primary-foreground/50" />
                <a
                  href="https://wa.me/34696387037"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-on-dark"
                >
                  WhatsApp: +34 696 387 037
                </a>
              </div>
            </div>
          </div>
          <form
            onSubmit={enviarConsultaPorWhatsApp}
            className="rounded-2xl bg-background text-foreground p-6 md:p-8 shadow-elegant space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input name="nombre" placeholder="Nombre" required aria-label="Nombre" />
              <Input
                name="telefono"
                placeholder="Teléfono"
                type="tel"
                required
                aria-label="Teléfono"
              />
            </div>
            <Input name="email" placeholder="Email" type="email" aria-label="Email" />
            <Textarea
              name="mensaje"
              placeholder="¿En qué podemos ayudarte?"
              rows={4}
              required
              aria-label="Mensaje"
            />
            <Button
              type="submit"
              className="w-full bg-brand-ink text-brand-foreground hover:bg-brand-ink/90"
            >
              Enviar consulta <Send className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Al enviar se abre WhatsApp con tu mensaje para que lo revises antes de mandarlo. Esta
              web no almacena ningún dato: ver la{" "}
              <Link to="/privacidad" className="underline underline-offset-2 hover:text-brand-ink">
                política de privacidad
              </Link>
              .
            </p>
          </form>
        </div>
      </section>

      {/* LOGOS / ORGANISMOS */}
      <section className="border-y border-border bg-secondary/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.3em]">
            Tramitamos con organismos oficiales
          </p>
          <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {logos.map((l) => (
              <div
                key={l}
                className="text-center text-primary/60 font-bold text-sm md:text-base tracking-wider hover:text-brand-ink transition-colors"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANTEQUERA — con imagen de fondo */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(38,25,15,0.86), rgba(20,12,6,0.66)), url(${antequeraImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 uppercase tracking-[0.2em]">
                <MapPin className="h-4 w-4" /> Visítanos
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">
                Estamos en Antequera.
                <br />
                Hablamos.
              </h2>
              <p className="mt-5 text-white/80 text-lg max-w-md leading-relaxed">
                Nuestro despacho está en pleno centro de Antequera. Pasa a vernos, tómate un café
                con nosotros y descubre por qué somos la asesoría de referencia de la comarca.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-8 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Dirección</div>
                <div className="mt-1 font-semibold">Urb. Parquesol, bloque 9, bajo</div>
                <div className="text-white/70 text-sm">29200 Antequera (Málaga)</div>
              </div>
              <div className="h-px bg-white/15" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60">Teléfono</div>
                  <div className="mt-1 font-semibold">952 70 22 14</div>
                  <div className="text-white/70 text-xs">Móvil 696 387 037</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60">Horario</div>
                  <div className="mt-1 font-semibold text-sm">L–V · 9–14 y 16–19</div>
                </div>
              </div>
              <Button
                asChild
                className="w-full bg-brand-ink text-brand-foreground hover:bg-brand-ink/90 mt-2"
              >
                <Link to="/contacto">
                  Cómo llegar <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
