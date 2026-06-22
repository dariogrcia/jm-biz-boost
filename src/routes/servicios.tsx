import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calculator,
  BookOpen,
  Users,
  Check,
  ArrowRight,
  Globe,
  Database,
  Workflow,
  Phone,
  Mail,
  LineChart,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";
import type { LucideIcon } from "lucide-react";
import digitalizacionImg from "@/assets/digitalizacion.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — JM Asesores Antequera" },
      { name: "description", content: "Asesoría fiscal, contable y laboral en Antequera. Además, transformación digital para empresas." },
      { property: "og:title", content: "Servicios — JM Asesores" },
      { property: "og:description", content: "Tres áreas de asesoría más servicios de transformación digital." },
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
];

function Servicios() {
  return (
    <SiteLayout>
      <section
        className="text-primary-foreground"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-brand uppercase tracking-[0.2em]">Servicios</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Asesoría integral para tu negocio</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            Tres áreas de especialización para acompañarte en todo lo que tu actividad necesita, desde Antequera para toda Málaga.
          </p>
        </div>
      </section>

      {/* Bloques asesoría */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {bloques.map(({ icon: Icon, titulo, intro, items }) => (
            <div
              key={titulo}
              className="rounded-2xl border border-border bg-card p-8 shadow-soft hover:shadow-elegant transition-shadow"
            >
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
            <Link to="/contacto">
              Solicitar información <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* DIGITALIZACIÓN — sección profesional */}
      <section className="bg-secondary/40 border-y border-border py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="relative order-2 md:order-1">
              <img
                src={digitalizacionImg}
                alt="Equipo desarrollando software a medida"
                loading="lazy"
                width={1024}
                height={1024}
                className="rounded-2xl shadow-elegant w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl bg-primary text-primary-foreground px-6 py-4 shadow-elegant">
                <Cpu className="h-6 w-6 text-brand" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand">Tecnología</div>
                  <div className="font-semibold">Software a medida</div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="text-sm font-semibold text-brand uppercase tracking-[0.2em]">
                Transformación digital
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold text-primary leading-tight">
                Digitalización<br />para empresas
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                Acompañamos a nuestros clientes en el proceso de modernización tecnológica de su negocio.
                Diseñamos y desarrollamos soluciones a medida orientadas a resultados: más eficiencia, mejor
                control y crecimiento sostenible.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { i: Globe, t: "Presencia digital corporativa", d: "Sitios web profesionales orientados a conversión, posicionamiento y reputación de marca." },
                  { i: Database, t: "ERP, CRM y software de gestión", d: "Implantación y desarrollo de sistemas adaptados a tus procesos reales de negocio." },
                  { i: Workflow, t: "Automatización de procesos", d: "Eliminamos tareas repetitivas y conectamos tus herramientas para que el equipo se centre en lo importante." },
                  { i: LineChart, t: "Análisis y reporting", d: "Cuadros de mando y métricas para tomar decisiones basadas en datos, no en intuiciones." },
                ].map(({ i: Icon, t, d }) => (
                  <div key={t} className="rounded-xl bg-card border border-border p-5">
                    <Icon className="h-5 w-5 text-brand" />
                    <h3 className="mt-3 font-semibold text-primary text-sm">{t}</h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-border bg-card p-5 space-y-2 text-sm text-muted-foreground">
                <p className="text-foreground font-medium flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand" /> Contacto para proyectos de digitalización
                </p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand" />
                  <span>Teléfono: <span className="text-foreground">[número pendiente]</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand" />
                  <span>Email: <span className="text-foreground">[correo pendiente]</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-brand uppercase tracking-[0.2em]">Cómo trabajamos</span>
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
