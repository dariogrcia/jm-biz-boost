import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Folder, ArrowRight, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { BlogSidebar } from "@/components/site/BlogSidebar";
import { posts } from "@/lib/blog-posts";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — JM Asesores Antequera" },
      { name: "description", content: "Artículos sobre fiscalidad, contabilidad, laboral y finanzas para autónomos y empresas en Antequera y Málaga." },
      { property: "og:title", content: "Blog — JM Asesores" },
      { property: "og:description", content: "Asesoramiento contable, fiscal, laboral y financiero al día." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <SiteLayout>
      {/* HERO estrecho */}
      <section
        className="relative text-white"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(0,0,0,0.65), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Blog</h1>
          <nav className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
            <Link to="/" className="hover:text-brand transition-colors">Portada</Link>
            <ChevronRight className="h-4 w-4 text-brand" />
            <span className="text-brand">Blog</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* LISTADO */}
          <div className="space-y-12">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="group rounded-2xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-elegant transition-shadow"
              >
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block overflow-hidden">
                  <img
                    src={p.imagen}
                    alt={p.titulo}
                    loading="lazy"
                    width={1024}
                    height={576}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-brand" />
                      {p.fecha}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Folder className="h-3.5 w-3.5 text-brand" />
                      {p.categoria}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-bold text-primary leading-tight">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="hover:text-brand transition-colors"
                    >
                      {p.titulo}
                    </Link>
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{p.extracto}</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-3 transition-all"
                  >
                    Leer más <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* SIDEBAR */}
          <BlogSidebar />
        </div>
      </section>
    </SiteLayout>
  );
}
