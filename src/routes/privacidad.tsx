import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout, FichaTitular } from "@/components/site/LegalLayout";
import { DATOS_LEGALES } from "@/lib/datos-legales";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacidad")({
  head: () =>
    seo({
      ruta: "/privacidad",
      titulo: "Política de privacidad — JM Asesores",
      descripcion:
        "Qué datos personales trata JM Asesores cuando contactas a través de esta web, con qué finalidad y cómo ejercer tus derechos.",
    }),
  component: Privacidad,
});

function Privacidad() {
  const d = DATOS_LEGALES;
  return (
    <LegalLayout
      titulo="Política de privacidad"
      entradilla="Qué pasa con tus datos si nos escribes desde esta web. Resumen: la web no guarda nada."
    >
      <div className="rounded-2xl border-l-4 border-brand bg-secondary/50 p-6">
        <p className="text-foreground">
          <strong>Lo importante, en corto.</strong> Esta web es un sitio estático: no tiene base de
          datos, ni registro de usuarios, ni analítica, ni cookies. Los formularios{" "}
          <strong>no envían nada a ningún servidor nuestro</strong>: preparan un mensaje de WhatsApp
          que tú revisas y decides si mandar. Solo tratamos tus datos a partir del momento en que
          decides contactarnos.
        </p>
      </div>

      <div>
        <h2>1. Responsable del tratamiento</h2>
        <FichaTitular />
      </div>

      <div>
        <h2>2. Qué datos tratamos y de dónde salen</h2>
        <p>Únicamente los que tú nos facilitas al ponerte en contacto:</p>
        <ul>
          <li>
            <strong>Formularios de la web.</strong> Nombre, teléfono, correo electrónico (opcional)
            y el mensaje que escribas. Estos campos no se envían a esta web: se usan para componer
            un mensaje de WhatsApp que se abre en tu dispositivo. Si no lo envías, no llega a
            ninguna parte.
          </li>
          <li>
            <strong>WhatsApp, correo o teléfono.</strong> Los datos que aparezcan en tu mensaje o
            llamada: tu número, tu dirección de correo, tu nombre y lo que nos cuentes.
          </li>
        </ul>
        <p>
          No recogemos datos de navegación, no hay cookies ni identificadores, y no compramos ni
          recibimos datos tuyos de terceros.
        </p>
      </div>

      <div>
        <h2>3. Para qué los usamos y con qué base legal</h2>
        <ul>
          <li>
            <strong>Atender tu consulta y darte presupuesto.</strong> Base jurídica: aplicación de
            medidas precontractuales a petición tuya y tu propio consentimiento al escribirnos (art.
            6.1.b y 6.1.a del RGPD).
          </li>
          <li>
            <strong>Prestarte el servicio</strong>, si finalmente nos contratas. Base jurídica:
            ejecución del contrato (art. 6.1.b), además de las obligaciones legales propias de una
            asesoría (art. 6.1.c).
          </li>
        </ul>
        <p>
          No usamos tus datos para enviarte publicidad ni te incluimos en ninguna lista de correo.
        </p>
      </div>

      <div>
        <h2>4. Cuánto tiempo los conservamos</h2>
        <p>
          Si tu consulta no acaba en una relación profesional, conservamos el mensaje mientras sea
          útil para atenderte y lo eliminamos después. Si llegamos a trabajar juntos, se aplican los
          plazos legales de conservación que correspondan a la documentación fiscal, contable y
          laboral.
        </p>
      </div>

      <div>
        <h2>5. Con quién se comparten</h2>
        <p>
          No cedemos tus datos a terceros, salvo obligación legal (por ejemplo, a la Administración
          tributaria cuando la normativa lo exija).
        </p>
        <p>
          Ten en cuenta una cosa: si eliges contactarnos por <strong>WhatsApp</strong>, la
          conversación pasa por los sistemas de <strong>WhatsApp Ireland Limited</strong> (grupo
          Meta) y se rige por sus propias condiciones y política de privacidad, que no controlamos.
          Si prefieres evitarlo, escríbenos a <a href={`mailto:${d.email}`}>{d.email}</a> o llámanos
          al <a href="tel:+34696387037">{d.telefono}</a>.
        </p>
      </div>

      <div>
        <h2>6. Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento los derechos de <strong>acceso</strong>,{" "}
          <strong>rectificación</strong>, <strong>supresión</strong>, <strong>oposición</strong>,{" "}
          <strong>limitación del tratamiento</strong> y <strong>portabilidad</strong>, así como
          retirar tu consentimiento.
        </p>
        <p>
          Escribe a <a href={`mailto:${d.email}`}>{d.email}</a> indicando qué derecho quieres
          ejercer, o acércate a la oficina: {d.oficina}. Responderemos en el plazo legal de un mes.
        </p>
        <p>
          Si consideras que no hemos atendido tu solicitud correctamente, puedes reclamar ante la{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            Agencia Española de Protección de Datos
          </a>
          .
        </p>
      </div>

      <div>
        <h2>7. Seguridad</h2>
        <p>
          Aplicamos medidas razonables para proteger la información que nos confías. Al ser una
          asesoría, tratamos a diario documentación sensible de clientes y trabajamos con esa
          exigencia.
        </p>
      </div>

      <div>
        <h2>8. Cambios en esta política</h2>
        <p>
          Si cambia la forma en que tratamos los datos, actualizaremos esta página y su fecha. Para
          lo relativo a cookies, consulta la <Link to="/cookies">política de cookies</Link>.
        </p>
      </div>
    </LegalLayout>
  );
}
