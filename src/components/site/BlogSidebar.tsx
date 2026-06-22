import { Link } from "@tanstack/react-router";
import { CATEGORIAS, recentPosts } from "@/lib/blog-posts";
import { Folder, FileText } from "lucide-react";

export function BlogSidebar() {
  const recent = recentPosts(5);
  return (
    <aside className="space-y-8 lg:sticky lg:top-24 self-start">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border">
          <Folder className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
            Categorías
          </h3>
        </div>
        <ul className="space-y-2">
          {CATEGORIAS.map((c) => (
            <li key={c}>
              <Link
                to="/blog"
                className="group flex items-center justify-between gap-2 text-sm text-muted-foreground hover:text-brand transition-colors py-1"
              >
                <span>{c}</span>
                <span className="text-brand opacity-0 group-hover:opacity-100">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border">
          <FileText className="h-4 w-4 text-brand" />
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
            Entradas recientes
          </h3>
        </div>
        <ul className="space-y-4">
          {recent.map((p) => (
            <li key={p.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="block group"
              >
                <p className="text-sm font-medium text-primary group-hover:text-brand transition-colors leading-snug">
                  {p.titulo}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{p.fecha}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
