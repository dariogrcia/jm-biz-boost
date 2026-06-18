import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Globe, ShieldCheck, Zap, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JM Asesores — Digitalización de empresas" },
      { name: "description", content: "Asesoría especializada en digitalización: software a medida, ERP, CRM y presencia online para impulsar tu negocio." },
      { property: "og:title", content: "JM Asesores — Digitalización de empresas" },
      { property: "og:description", content: "Software a medida y presencia online para empresas que quieren crecer." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.74 0.16 200 / 0.5), transparent 40%), radial-gradient(circle at 80% 80%, oklch(0.6 0.18 230 / 0.4), transparent 40%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Consultoría tecnológica desde 2010
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Digitaliza tu empresa.<br />
              <span className="text-brand">Multiplica resultados.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
              Diseñamos e implantamos software de gestión a medida y construimos tu presencia online para que dediques tu tiempo a lo que importa: hacer crecer tu negocio.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90 shadow-elegant">
                <Link to="/contacto">
                  Solicita una consulta gratis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-primary-foreground hover:bg-white/10">
                <Link to="/servicios">Ver servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "+150", l: "Empresas digitalizadas" },
            { n: "+15", l: "Años de experiencia" },
            { n: "98%", l: "Clientes recurrentes" },
            { n: "24/7", l: "Soporte técnico" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-bold text-primary">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-primary">Dos áreas, un solo objetivo</h2>
          <p className="mt-4 text-muted-foreground text-lg">Tecnología a medida y visibilidad digital para empresas que no se conforman.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-primary">Software a medida · ERP & CRM</h3>
            <p className="mt-3 text-muted-foreground">Implantación y desarrollo de soluciones de gestión empresarial adaptadas 100% a tus procesos.</p>
            <Link to="/servicios" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-brand transition-colors">
              Saber más <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="group rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-brand-foreground">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-primary">Presencia online · Web & SEO</h3>
            <p className="mt-3 text-muted-foreground">Webs corporativas, tiendas online y estrategias SEO que atraen tráfico cualificado.</p>
            <Link to="/servicios" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-brand transition-colors">
              Saber más <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Por qué nosotros</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">El partner tecnológico que tu empresa necesita</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { i: ShieldCheck, t: "Fiabilidad", d: "Procesos auditados y soporte continuo para que duermas tranquilo." },
              { i: Zap, t: "Velocidad", d: "Implantación ágil con metodologías probadas que reducen tiempos." },
              { i: TrendingUp, t: "Resultados", d: "Medimos el ROI de cada proyecto. Si no aporta valor, no lo hacemos." },
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

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 md:p-16 text-primary-foreground shadow-elegant">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <Users className="h-10 w-10 text-brand" />
            <h2 className="mt-4 text-3xl md:text-5xl font-bold">¿Hablamos de tu proyecto?</h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">Cuéntanos qué quieres digitalizar. La primera consulta es gratuita y sin compromiso.</p>
            <Button asChild size="lg" className="mt-8 bg-brand text-brand-foreground hover:bg-brand/90">
              <Link to="/contacto">Contactar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
