import { createFileRoute } from "@tanstack/react-router";
import { Heart, Lightbulb, Handshake, Target, MapPin, UserCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros — JM Asesores Antequera" },
      { name: "description", content: "JM Asesores: más de 20 años como asesoría fiscal, contable, laboral y jurídica de referencia en Antequera (Málaga)." },
      { property: "og:title", content: "Sobre nosotros — JM Asesores" },
      { property: "og:description", content: "Asesoría de confianza para empresas y autónomos en la comarca de Antequera." },
    ],
  }),
  component: SobreNosotros,
});

const valores = [
  { i: Heart, t: "Cercanía", d: "Trato directo y humano. Te atiende siempre la misma persona, no un call center." },
  { i: Handshake, t: "Confianza", d: "Tu información, tus cuentas y tu tranquilidad están en manos profesionales." },
  { i: Target, t: "Rigor", d: "Cumplimiento estricto de plazos y normativa. Sin sorpresas." },
  { i: Lightbulb, t: "Innovación", d: "Combinamos asesoría tradicional con herramientas digitales modernas." },
];

function SobreNosotros() {
  return (
    <SiteLayout>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Sobre nosotros</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">La asesoría de referencia en Antequera</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
            Un equipo cercano y multidisciplinar al servicio de empresas y autónomos de la comarca de Antequera y toda la provincia de Málaga.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-center lg:items-start">
          <div className="aspect-[3/4] w-full max-w-sm rounded-2xl bg-secondary flex flex-col items-center justify-center border border-border">
            <UserCircle2 className="h-24 w-24 text-muted-foreground/40" />
            <p className="mt-4 text-xs text-muted-foreground">Foto profesional · próximamente</p>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Nuestra historia</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Maribel Aguilera Orellana</h2>
          <p className="mt-2 text-sm text-muted-foreground">Asesora Fiscal, Contable y Laboral · Fundadora de JM Asesores</p>
          <div className="mt-6 space-y-4 text-muted-foreground text-lg leading-relaxed">
            <p>
              Graduada en Administración y Dirección de Empresas por la Universidad de Málaga, Maribel inició su trayectoria profesional en el ámbito de la asesoría fiscal y contable hace más de 15 años, especializándose en el acompañamiento a autónomos y pequeñas empresas en toda la comarca de Antequera.
            </p>
            <p>
              Fundó JM Asesores con el objetivo de ofrecer un servicio cercano, riguroso y personalizado, alejado del trato impersonal de las grandes gestorías. Su formación continuada en normativa fiscal, laboral y contable le permite ofrecer una asesoría actualizada y de confianza.
            </p>
            <p>
              Especialidades: Declaración de la Renta · IVA · Impuesto de Sociedades · Nóminas y Seguridad Social · Contabilidad oficial · Constitución de empresas.
            </p>
            <p className="text-sm text-muted-foreground/70 italic">
              [Texto provisional — será actualizado con la información real de Maribel]
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-brand pt-2">
              <MapPin className="h-4 w-4" /> Calle Infante Don Fernando, Antequera (Málaga)
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Valores</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-primary">Cómo entendemos la asesoría</h2>
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
    </SiteLayout>
  );
}
