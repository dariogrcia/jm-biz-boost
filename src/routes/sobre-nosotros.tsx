import { createFileRoute } from "@tanstack/react-router";
import { Heart, Lightbulb, Handshake, Target } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros — JM Asesores" },
      { name: "description", content: "Conoce a JM Asesores: nuestra historia, valores y equipo experto en digitalización empresarial." },
      { property: "og:title", content: "Sobre nosotros — JM Asesores" },
      { property: "og:description", content: "Más de 15 años ayudando a empresas a dar el salto digital." },
    ],
  }),
  component: SobreNosotros,
});

const valores = [
  { i: Heart, t: "Cercanía", d: "Trato directo y sin tecnicismos. Tu proyecto es nuestro proyecto." },
  { i: Lightbulb, t: "Innovación", d: "Aplicamos tecnología puntera con sentido común empresarial." },
  { i: Handshake, t: "Compromiso", d: "Acompañamos a largo plazo, no solo entregamos y nos vamos." },
  { i: Target, t: "Resultados", d: "Buscamos impacto medible: tiempo, costes y crecimiento." },
];

const equipo = [
  { n: "Javier Martín", r: "CEO & Fundador" },
  { n: "Marta Ruiz", r: "Directora de Software" },
  { n: "Carlos Vega", r: "Lead Web & SEO" },
  { n: "Lucía Soler", r: "Consultora ERP" },
];

function SobreNosotros() {
  return (
    <SiteLayout>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Sobre nosotros</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">Personas detrás de la tecnología</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            Somos un equipo multidisciplinar que cree en la digitalización como motor de crecimiento sostenible.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Nuestra historia</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Más de 15 años acompañando a empresas</h2>
          <div className="mt-6 space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              JM Asesores nació en 2010 con una idea sencilla: hacer accesible la transformación digital a pymes y empresas familiares que sentían que la tecnología les venía grande.
            </p>
            <p>
              Hoy somos un equipo de más de 20 profesionales que ha ayudado a digitalizar más de 150 negocios, desde talleres hasta cadenas de distribución.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { n: "2010", l: "Fundación" },
            { n: "+150", l: "Proyectos" },
            { n: "+20", l: "Profesionales" },
            { n: "12", l: "Sectores" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl bg-secondary/60 p-8 border border-border">
              <div className="text-4xl font-bold text-primary">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Valores */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Valores</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Lo que nos mueve cada día</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {valores.map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-2xl bg-card p-6 border border-border">
                <Icon className="h-8 w-8 text-brand" />
                <h3 className="mt-4 font-semibold text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Equipo</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Las personas que lo hacen posible</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipo.map((m) => (
            <div key={m.n} className="text-center">
              <div className="aspect-square rounded-2xl bg-brand-gradient flex items-center justify-center text-5xl font-bold text-brand-foreground shadow-soft">
                {m.n.split(" ").map((x) => x[0]).join("")}
              </div>
              <div className="mt-4 font-semibold text-primary">{m.n}</div>
              <div className="text-sm text-muted-foreground">{m.r}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
