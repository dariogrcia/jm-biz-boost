import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout, FichaTitular } from "@/components/site/LegalLayout";
import { DATOS_LEGALES } from "@/lib/datos-legales";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () =>
    seo({
      ruta: "/aviso-legal",
      titulo: "Aviso legal — JM Asesores",
      descripcion:
        "Datos identificativos del titular, condiciones de uso del sitio y régimen de responsabilidad.",
    }),
  component: AvisoLegal,
});

function AvisoLegal() {
  const d = DATOS_LEGALES;
  return (
    <LegalLayout
      titulo="Aviso legal"
      entradilla="Quién está detrás de esta web y en qué condiciones puedes usarla."
    >
      <div>
        <h2>1. Titular del sitio</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la
          información y de comercio electrónico (LSSI-CE), se hacen constar los datos
          identificativos del titular:
        </p>
        <div className="mt-5">
          <FichaTitular />
        </div>
      </div>

      <div>
        <h2>2. Objeto</h2>
        <p>
          Este sitio web es informativo. Presenta los servicios de asesoría fiscal, contable y
          laboral que {d.nombreComercial} presta a autónomos y empresas de Antequera y la provincia
          de Málaga, y facilita vías de contacto.
        </p>
        <p>
          No es una tienda: aquí no se contrata ni se paga nada. Cualquier servicio se acuerda
          después, de forma individual y por los cauces habituales.
        </p>
      </div>

      <div>
        <h2>3. Condiciones de uso</h2>
        <p>
          Navegar por este sitio te convierte en usuario e implica que aceptas estas condiciones. Te
          comprometes a hacer un uso lícito del sitio y a no realizar acciones que puedan dañarlo,
          sobrecargarlo o impedir su normal funcionamiento.
        </p>
      </div>

      <div>
        <h2>4. Contenidos y responsabilidad</h2>
        <p>
          Los contenidos —incluidos los artículos del blog— son{" "}
          <strong>información general, no asesoramiento profesional</strong>. La normativa fiscal,
          contable y laboral cambia con frecuencia y cada situación tiene sus particularidades: no
          tomes decisiones basándote solo en lo que leas aquí.
        </p>
        <p>
          Para un caso concreto, <Link to="/contacto">consúltanos directamente</Link>. El titular no
          responde de las decisiones tomadas a partir de la información publicada sin una consulta
          previa.
        </p>
        <p>
          Se procura que la información esté actualizada y sea correcta, pero no se garantiza la
          ausencia de errores ni la disponibilidad ininterrumpida del sitio.
        </p>
      </div>

      <div>
        <h2>5. Propiedad intelectual e industrial</h2>
        <p>
          Los textos, el logotipo, el diseño y la estructura de este sitio son titularidad de{" "}
          {d.titular} o se usan con autorización. Su reproducción, distribución o transformación sin
          consentimiento expreso no está permitida.
        </p>
        <p>
          La cartografía del plano de situación procede de{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>
          , publicada bajo licencia ODbL por sus colaboradores.
        </p>
      </div>

      <div>
        <h2>6. Enlaces a otros sitios</h2>
        <p>
          Esta web incluye enlaces que llevan a servicios de terceros, como WhatsApp o Google Maps.
          Solo se activan si haces clic en ellos, y a partir de ahí se aplican las condiciones y
          políticas de privacidad de cada uno, sobre las que el titular no tiene control.
        </p>
      </div>

      <div>
        <h2>7. Protección de datos y cookies</h2>
        <p>
          El tratamiento de datos personales se detalla en la{" "}
          <Link to="/privacidad">política de privacidad</Link>. Sobre cookies: este sitio{" "}
          <strong>no utiliza ninguna</strong>, como se explica en la{" "}
          <Link to="/cookies">política de cookies</Link>.
        </p>
      </div>

      <div>
        <h2>8. Legislación aplicable</h2>
        <p>
          Estas condiciones se rigen por la legislación española. Para cualquier controversia, las
          partes se someten a los juzgados y tribunales que correspondan conforme a derecho.
        </p>
      </div>
    </LegalLayout>
  );
}
