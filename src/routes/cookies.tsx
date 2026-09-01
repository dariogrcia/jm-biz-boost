import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies — JM Asesores" },
      {
        name: "description",
        content:
          "Esta web no utiliza cookies ni ningún otro sistema de seguimiento. Aquí se explica por qué y qué implica.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalLayout
      titulo="Política de cookies"
      entradilla="Esta web no usa cookies. Ni propias, ni de terceros, ni de análisis."
    >
      <div className="rounded-2xl border-l-4 border-brand bg-secondary/50 p-6">
        <p className="text-foreground">
          <strong>No hay banner de cookies porque no hay cookies.</strong> No instalamos ningún
          archivo en tu dispositivo, no usamos almacenamiento local ni identificadores, y no hay
          nada que aceptar o rechazar.
        </p>
      </div>

      <div>
        <h2>Por qué no hay cookies</h2>
        <p>
          Este sitio es estático: son páginas HTML servidas tal cual, sin sesión de usuario, sin
          carrito y sin área privada. Nada de eso necesita cookies.
        </p>
        <p>
          Tampoco usamos herramientas de analítica ni píxeles de publicidad, así que no sabemos
          cuánta gente entra, de dónde viene ni qué mira. Es una decisión deliberada.
        </p>
      </div>

      <div>
        <h2>Sin peticiones a terceros</h2>
        <p>
          Muchas webs sin cookies propias sí cargan recursos externos que las ponen por su cuenta:
          tipografías de Google, mapas incrustados, imágenes alojadas fuera. Aquí no ocurre:
        </p>
        <ul>
          <li>
            <strong>Tipografía.</strong> Se sirve desde este mismo dominio, no desde Google Fonts.
          </li>
          <li>
            <strong>Mapa de la oficina.</strong> Es una imagen estática alojada aquí, generada a
            partir de cartografía de OpenStreetMap. No es un mapa incrustado de Google.
          </li>
          <li>
            <strong>Fotografías.</strong> Todas están alojadas en este dominio.
          </li>
        </ul>
        <p>
          Al cargar cualquier página de esta web, tu navegador no se conecta a ningún servidor
          ajeno.
        </p>
      </div>

      <div>
        <h2>Enlaces que sí salen fuera</h2>
        <p>
          Hay dos botones que te llevan a servicios de terceros, y solo se activan{" "}
          <strong>si haces clic</strong>:
        </p>
        <ul>
          <li>
            <strong>WhatsApp</strong>, para escribirnos. Al pulsarlo entras en WhatsApp, con sus
            propias condiciones y cookies.
          </li>
          <li>
            <strong>«Cómo llegar»</strong>, que abre Google Maps para darte la ruta. Igual: a partir
            de ahí se aplican las condiciones de Google.
          </li>
        </ul>
        <p>Mientras no los pulses, ninguno de los dos recibe información tuya desde esta web.</p>
      </div>

      <div>
        <h2>Si esto cambiara</h2>
        <p>
          Si en el futuro se añadiera alguna herramienta que requiera cookies, actualizaríamos esta
          página y pediríamos tu consentimiento antes de instalarlas, como exige la normativa.
        </p>
        <p>
          Para el resto de cuestiones sobre datos personales, consulta la{" "}
          <Link to="/privacidad">política de privacidad</Link>.
        </p>
      </div>
    </LegalLayout>
  );
}
