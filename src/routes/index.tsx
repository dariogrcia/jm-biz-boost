import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, BookOpen, Users, Scale, ShieldCheck, MapPin, Clock, Award, Monitor, Wrench, Plug, Database, GraduationCap, Server, Lightbulb, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JM Asesores — Asesoría Fiscal, Contable, Laboral y Jurídica en Antequera" },
      { name: "description", content: "Asesoría de confianza en Antequera (Málaga). Servicios fiscales, contables, laborales y jurídicos para autónomos y empresas." },
      { property: "og:title", content: "JM Asesores — Asesoría en Antequera" },
      { property: "og:description", content: "Asesoría fiscal, contable, laboral y jurídica en Antequera (Málaga)." },
    ],
  }),
  component: Home,
});

const servicios = [
  { i: Calculator, t: "Asesoría Fiscal", d: "Renta, IVA, Sociedades y planificación fiscal para autónomos y empresas." },
  { i: BookOpen, t: "Asesoría Contable", d: "Contabilidad, cuentas anuales, balances y gestión financiera." },
  { i: Users, t: "Asesoría Laboral", d: "Nóminas, contratos, Seguridad Social, ERTEs y gestión de RRHH." },
  { i: Scale, t: "Asesoría Jurídica", d: "Constitución de sociedades, contratos mercantiles y asesoramiento legal." },
];

const complementarios = [
  { i: Wrench, t: "Mantenimiento y soporte técnico", d: "Resolución de incidencias, actualizaciones y vigilancia continua de tus sistemas y aplicaciones." },
  { i: Plug, t: "Integraciones de APIs", d: "Conectamos tus herramientas: ERP, CRM, plataformas de pago, correo, redes sociales y más." },
  { i: Database, t: "Migración de datos", d: "Trasladamos tus datos de forma segura entre sistemas, sin pérdidas ni interrupciones." },
  { i: GraduationCap, t: "Formación a usuarios", d: "Capacitamos a tu equipo para sacar el máximo partido a las herramientas implantadas." },
  { i: Server, t: "Hosting y dominios", d: "Gestión de alojamiento web, dominios, certificados SSL y copias de seguridad." },
  { i: Lightbulb, t: "Consultoría tecnológica", d: "Te ayudamos a elegir las mejores soluciones tecnológicas para las necesidades reales de tu negocio." },
];

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden text-white"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.55), rgba(0,0,0,0.40)), url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium text-brand">
            <MapPin className="h-3 w-3" /> Antequera · Málaga
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Tu negocio,<br/>
            en <span className="text-brand">buenas manos.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Asesoría fiscal, contable y laboral para autónomos y empresas de Antequera y toda Málaga. Y si también necesitas una web, un CRM o software a medida, también te cubrimos.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-elegant">
              <Link to="/contacto">
                Pide cita gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10">
              <Link to="/servicios">Ver servicios</Link>
            </Button>
          </div>
          <div className="mt-12 text-center">
            <p className="text-white font-semibold">Maribel Aguilera Orellana</p>
            <div className="mx-auto my-2 h-px w-16 bg-white/30" />
            <p className="text-xs text-brand">Fundadora & CEO</p>
          </div>
        </div>
      </section>


      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-primary">Cuatro áreas, un único equipo</h2>
          <p className="mt-4 text-muted-foreground text-lg">Todo lo que tu empresa o actividad como autónomo necesita, bajo el mismo techo.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map(({ i: Icon, t, d }) => (
            <div key={t} className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <Link to="/servicios" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Más info <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Por qué JM Asesores</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Cercanía local, rigor profesional</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { i: ShieldCheck, t: "Confianza", d: "Más de dos décadas asesorando a empresas y autónomos de Antequera." },
              { i: Award, t: "Experiencia", d: "Equipo titulado y en formación continua en normativa fiscal y laboral." },
              { i: Clock, t: "Atención directa", d: "Respuesta ágil, sin intermediarios. Una persona responsable de tu cuenta." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl bg-card p-8 border border-border">
                <Icon className="h-7 w-7 text-brand" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS COMPLEMENTARIOS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios Complementarios</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Amplía las capacidades de tu empresa</h2>
          <p className="mt-4 text-muted-foreground text-lg">Soluciones técnicas que complementan nuestros servicios principales y mantienen tu negocio siempre operativo y conectado.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {complementarios.map(({ i: Icon, t, d }) => (
            <div key={t} className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIGITALIZACIÓN — secundaria */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row gap-8 md:items-center">
          <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
            <Monitor className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">También en JM Asesores</span>
            <h3 className="mt-1 text-2xl font-bold text-primary">Servicios de digitalización para empresas</h3>
            <p className="mt-2 text-muted-foreground">Webs corporativas, CRM, software de gestión y digitalización de procesos. Un complemento a nuestra asesoría para que tu negocio crezca con buenas bases tecnológicas.</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Para más información sobre nuestros servicios de digitalización, puedes contactar con nosotros directamente:</p>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <span>Teléfono 1: <span className="text-foreground">[número pendiente]</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <span>Teléfono 2: <span className="text-foreground">[número pendiente]</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                <span>Email: <span className="text-foreground">[correo pendiente]</span></span>
              </div>
            </div>
          </div>
          <Button asChild variant="outline" className="border-brand text-brand hover:bg-brand hover:text-brand-foreground">
            <Link to="/servicios">Saber más</Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 md:p-16 text-primary-foreground shadow-elegant">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <MapPin className="h-10 w-10 text-brand" />
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">Estamos en Antequera. ¿Hablamos?</h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">Primera consulta sin compromiso. Ven a vernos o llámanos.</p>
            <Button asChild size="lg" className="mt-8 bg-brand text-brand-foreground hover:bg-brand/90">
              <Link to="/contacto">Pedir cita <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
