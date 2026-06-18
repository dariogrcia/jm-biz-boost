import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, BookOpen, Users, Scale, Check, ArrowRight, Monitor, Globe, Database, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — JM Asesores Antequera" },
      { name: "description", content: "Asesoría fiscal, contable, laboral y jurídica en Antequera. Además, servicios de digitalización para empresas." },
      { property: "og:title", content: "Servicios — JM Asesores" },
      { property: "og:description", content: "Cuatro áreas de asesoría más servicios de digitalización." },
    ],
  }),
  component: Servicios,
});

type Bloque = {
  icon: LucideIcon;
  titulo: string;
  intro: string;
  items: string[];
};

const bloques: Bloque[] = [
  {
    icon: Calculator,
    titulo: "Asesoría Fiscal",
    intro: "Planificación y cumplimiento fiscal para autónomos, pymes y sociedades. Sin sustos en Hacienda.",
    items: [
      "Declaración de la Renta (IRPF) y patrimonio",
      "IVA trimestral y modelos informativos",
      "Impuesto de Sociedades",
      "Planificación fiscal y optimización tributaria",
      "Atención a requerimientos e inspecciones",
    ],
  },
  {
    icon: BookOpen,
    titulo: "Asesoría Contable",
    intro: "Contabilidad rigurosa y al día para tomar decisiones con datos reales.",
    items: [
      "Contabilidad oficial de empresas",
      "Cuentas anuales y depósito en Registro",
      "Balances y cuenta de resultados",
      "Gestión financiera y de tesorería",
      "Análisis económico-financiero",
    ],
  },
  {
    icon: Users,
    titulo: "Asesoría Laboral",
    intro: "Todo lo relativo a tu plantilla, con la tranquilidad de tener cada papel en regla.",
    items: [
      "Confección de nóminas y seguros sociales",
      "Contratos de trabajo y altas/bajas en SS",
      "ERTEs, despidos y conciliaciones",
      "Gestión integral de RRHH",
      "Auditoría laboral y planes de igualdad",
    ],
  },
  {
    icon: Scale,
    titulo: "Asesoría Jurídica",
    intro: "Asesoramiento legal especializado en derecho mercantil y de empresa.",
    items: [
      "Constitución de sociedades y autónomos",
      "Contratos mercantiles y civiles",
      "Reclamación de impagos",
      "Protección de datos (LOPD/RGPD)",
      "Asesoramiento legal continuado",
    ],
  },
];

function Servicios() {
  return (
    <SiteLayout>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Asesoría integral para tu negocio</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            Cuatro áreas de especialización para acompañarte en todo lo que tu actividad necesita, desde Antequera para toda Málaga.
          </p>
        </div>
      </section>

      {/* Bloques asesoría */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {bloques.map(({ icon: Icon, titulo, intro, items }) => (
            <div key={titulo} className="rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-elegant transition-shadow">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-soft">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-primary">{titulo}</h2>
              <p className="mt-3 text-muted-foreground">{intro}</p>
              <ul className="mt-5 space-y-2.5">
                {items.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-foreground">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/contacto">Solicitar información <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Sección secundaria: Digitalización */}
      <section className="bg-secondary/50 border-y border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5 text-brand" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Servicios complementarios</span>
          </div>
          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-primary max-w-2xl">Digitalización para empresas</h2>
            <p className="text-muted-foreground max-w-md text-sm">Además de la asesoría, ayudamos a nuestros clientes a dar el salto digital.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { i: Globe, t: "Páginas web corporativas", d: "Diseño y desarrollo de webs profesionales para presentar tu empresa." },
              { i: Database, t: "CRM y software de gestión", d: "Implantación de CRM y herramientas de gestión empresarial." },
              { i: Workflow, t: "Digitalización de procesos", d: "Automatización de tareas internas para ganar tiempo y eficiencia." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="rounded-xl bg-card p-6 border border-border">
                <Icon className="h-6 w-6 text-brand" />
                <h3 className="mt-4 font-semibold text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Cómo trabajamos</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Sencillo, transparente, contigo</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Primera cita", d: "Nos reunimos contigo para entender tu situación." },
            { n: "02", t: "Propuesta", d: "Te presentamos un plan de servicios y honorarios claros." },
            { n: "03", t: "Gestión", d: "Nos encargamos de todo: plazos, modelos y trámites." },
            { n: "04", t: "Acompañamiento", d: "Contacto directo durante todo el año, no solo en campañas." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
              <div className="text-3xl font-bold text-brand">{s.n}</div>
              <div className="mt-3 font-semibold text-primary">{s.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
