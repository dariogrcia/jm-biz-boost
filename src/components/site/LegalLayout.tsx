import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SiteLayout } from "./Layout";
import { DATOS_LEGALES } from "@/lib/datos-legales";

/**
 * Envoltorio de las páginas legales. Son documentos para leer, no páginas de
 * venta: sin foto de cabecera, una sola columna a ancho de lectura y la misma
 * jerarquía tipográfica que el resto del sitio.
 */
export function LegalLayout({
  titulo,
  entradilla,
  children,
}: {
  titulo: string;
  entradilla: string;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-brand-ink">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span>Legal</span>
          </nav>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-5xl">
            {titulo}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {entradilla}
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            Última actualización: {DATOS_LEGALES.actualizado}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="space-y-10 leading-relaxed text-muted-foreground [&_a]:text-brand-ink [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-primary [&_li]:mb-2 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </section>
    </SiteLayout>
  );
}

/** Ficha de identificación, idéntica en las tres páginas. */
export function FichaTitular() {
  const d = DATOS_LEGALES;
  return (
    <dl className="grid gap-x-8 gap-y-3 rounded-2xl border border-border bg-card p-6 text-sm sm:grid-cols-[max-content_1fr]">
      {[
        ["Titular", d.titular],
        ["Nombre comercial", d.nombreComercial],
        ["NIF", d.nif],
        ["Actividad", d.actividad],
        ["Oficina", d.oficina],
        ["Domicilio fiscal", d.domicilioFiscal],
      ].map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-semibold text-foreground">{k}</dt>
          <dd className="text-muted-foreground">{v}</dd>
        </div>
      ))}
      <dt className="font-semibold text-foreground">Contacto</dt>
      <dd className="text-muted-foreground">
        <a href={`mailto:${d.email}`} className="text-brand-ink underline underline-offset-2">
          {d.email}
        </a>
        {" · "}
        <a href="tel:+34696387037" className="text-brand-ink underline underline-offset-2">
          {d.telefono}
        </a>
      </dd>
    </dl>
  );
}
