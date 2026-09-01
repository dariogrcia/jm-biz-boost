import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calendar, Folder, User, ChevronRight, ArrowRight, Phone, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { BlogSidebar } from "@/components/site/BlogSidebar";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/blog-posts";
import { seo, jsonLd } from "@/lib/seo";
import { articuloJsonLd } from "@/lib/estructurados";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Artículo — JM Asesores" }] };

    const base = seo({
      ruta: `/blog/${post.slug}`,
      titulo: `${post.titulo} — JM Asesores`,
      descripcion: post.extracto,
      imagen: post.imagen,
      tipo: "article",
      publicado: post.fechaISO,
      migas: [
        { nombre: "Inicio", ruta: "/" },
        { nombre: "Blog", ruta: "/blog" },
        { nombre: post.titulo, ruta: `/blog/${post.slug}` },
      ],
    });

    return { ...base, scripts: [...(base.scripts ?? []), jsonLd(articuloJsonLd(post))] };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-primary">Artículo no encontrado</h1>
        <p className="mt-4 text-muted-foreground">
          El artículo que buscas no existe o ha sido movido.
        </p>
        <Button asChild className="mt-8 bg-primary text-primary-foreground">
          <Link to="/blog">Volver al blog</Link>
        </Button>
      </section>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-primary">Error al cargar el artículo</h1>
        <Button asChild className="mt-8 bg-primary text-primary-foreground">
          <Link to="/blog">Volver al blog</Link>
        </Button>
      </section>
    </SiteLayout>
  ),
  component: PostDetail,
});

function PostDetail() {
  const { post } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* HERO */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${post.imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link to="/" className="hover:text-white">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 text-white/40" />
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4 text-white/40" />
            <span className="text-white/75 truncate">{post.categoria}</span>
          </nav>
          <h1 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.titulo}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/85">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-white/60" /> {post.fecha}
            </span>
            <span className="flex items-center gap-1.5">
              <Folder className="h-4 w-4 text-white/60" /> {post.categoria}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-white/60" /> {post.autor}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="min-w-0">
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-soft mb-10">
              <img
                src={post.imagen}
                alt={post.titulo}
                width={1200}
                height={675}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            <div className="prose-content space-y-5 text-foreground leading-relaxed">
              {post.contenido.map((b: (typeof post.contenido)[number], i: number) => {
                if (b.tipo === "p") {
                  return (
                    <p
                      key={i}
                      className="text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                      {b.texto}
                    </p>
                  );
                }
                if (b.tipo === "h2") {
                  return (
                    <h2 key={i} className="mt-10 text-2xl md:text-3xl font-bold text-primary">
                      {b.texto}
                    </h2>
                  );
                }
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {b.items?.map((it: string) => (
                      <li key={it} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-14 rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 shadow-elegant">
              <span className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-[0.2em]">
                ¿Tienes dudas?
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                Hablemos sobre tu caso concreto
              </h3>
              <p className="mt-3 text-primary-foreground/80">
                Primera consulta sin compromiso. En JM Asesores te ayudamos a tomar la mejor
                decisión.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-brand-ink text-brand-foreground hover:bg-brand-ink/90"
                >
                  <Link to="/contacto">
                    Pedir consulta <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link to="/blog">Ver más artículos</Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-primary-foreground/70">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary-foreground/50" /> 952 70 22 14
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-foreground/50" /> jm_asesores@hotmail.com
                </span>
              </div>
            </div>
          </article>

          <BlogSidebar />
        </div>
      </section>
    </SiteLayout>
  );
}
