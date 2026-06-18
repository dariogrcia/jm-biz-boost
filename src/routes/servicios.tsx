import { createFileRoute, Link } from "@tanstack/react-router";
import { Code2, Globe, Database, Workflow, BarChart3, Users, ShoppingCart, Search, Smartphone, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — JM Asesores" },
      { name: "description", content: "Software a medida, ERP, CRM, desarrollo web y SEO. Servicios de digitalización para empresas." },
      { property: "og:title", content: "Servicios — JM Asesores" },
      { property: "og:description", content: "Software de gestión a medida y presencia online profesional." },
    ],
  }),
  component: Servicios,
});

function Servicios() {
  return (
    <SiteLayout>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Servicios</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight">Soluciones que transforman tu negocio</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">Dos áreas de especialización, una metodología clara: entender, diseñar e implantar.</p>
        </div>
      </section>

      {/* Bloque 1: ERP / CRM */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-soft">
              <Code2 className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-primary">Software a medida · ERP & CRM</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Implantación y desarrollo de software de gestión empresarial personalizado. Integramos tus procesos, automatizamos tareas repetitivas y conectamos los datos de toda tu organización en un único sistema.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Análisis y consultoría de procesos",
                "Implantación de ERP (Odoo, SAP B1, Holded)",
                "CRM adaptado a tu ciclo de ventas",
                "Migración y limpieza de datos",
                "Formación a equipos y soporte continuo",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-brand">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{i}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contacto">Pedir presupuesto <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { i: Database, t: "Gestión de datos" },
              { i: Workflow, t: "Automatización" },
              { i: BarChart3, t: "Reporting" },
              { i: Users, t: "CRM" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
                <Icon className="h-8 w-8 text-brand" />
                <div className="mt-4 font-semibold text-primary">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloque 2: Web / SEO */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            {[
              { i: Globe, t: "Webs corporativas" },
              { i: ShoppingCart, t: "E-commerce" },
              { i: Search, t: "SEO" },
              { i: Smartphone, t: "Mobile-first" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
                <Icon className="h-8 w-8 text-brand" />
                <div className="mt-4 font-semibold text-primary">{t}</div>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground shadow-soft">
              <Globe className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-primary">Presencia online · Web</h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Creación de webs corporativas, tiendas online y estrategias de posicionamiento SEO. Tu marca, visible donde te buscan tus clientes.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Webs corporativas y landing pages que convierten",
                "Tiendas online (WooCommerce, Shopify, headless)",
                "Posicionamiento SEO técnico y de contenidos",
                "Diseño UX/UI mobile-first",
                "Mantenimiento, hosting y métricas",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-brand">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-foreground">{i}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contacto">Pedir presupuesto <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Metodología</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Cómo trabajamos</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Diagnóstico", d: "Auditamos tus procesos y objetivos." },
            { n: "02", t: "Propuesta", d: "Diseñamos la solución y el roadmap." },
            { n: "03", t: "Implantación", d: "Desarrollamos e integramos por fases." },
            { n: "04", t: "Soporte", d: "Acompañamiento y evolución continua." },
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
