import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Clock, Eye, Heart, Sparkles } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { CATEGORY_LABEL, templates, type Template } from "@/lib/templates";

export const Route = createFileRoute("/template/$slug")({
  loader: ({ params }): Template => {
    const t = templates.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return t;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Template"} — Krisuu Studio` },
      { name: "description", content: loaderData?.tagline ?? "A Krisuu Studio template." },
      { property: "og:title", content: loaderData?.title },
      { property: "og:description", content: loaderData?.tagline },
      { property: "og:url", content: `/template/${loaderData?.slug}` },
    ],
    links: [{ rel: "canonical", href: `/template/${loaderData?.slug}` }],
  }),
  component: TemplatePage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
      Template not found · <Link to="/templates" className="ml-2 underline">browse templates</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-screen place-items-center">
      <button onClick={reset} className="rounded-full bg-foreground px-4 py-2 text-xs text-background">
        Retry
      </button>
    </div>
  ),
});

function TemplatePage() {
  const t = Route.useLoaderData() as Template;
  const related = templates.filter((x) => x.category === t.category && x.id !== t.id).slice(0, 4);

  return (
    <div className="min-h-screen pb-24">
      <BrandHeader />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[1fr_1fr]">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-plush"
          style={{ background: t.gradient }}
        >
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium shadow-soft">
            {CATEGORY_LABEL[t.category]}
          </span>
          <div className="grid h-full place-items-center text-7xl">{t.emoji}</div>
          <div className="absolute inset-x-4 bottom-4 flex justify-between text-[11px] text-foreground/75">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1">
              <Clock size={11} /> {t.duration}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-1">
              <Eye size={11} /> {t.views}
            </span>
          </div>
        </div>

        <div>
          <p className="font-hand text-xl text-foreground/65">{t.occasion}</p>
          <h1
            className="mt-1 text-3xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{t.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-[12px] text-foreground/80">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-soft">
              <Heart size={12} className="text-love" fill="currentColor" /> {t.loves} loved
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-soft">
              <Bookmark size={12} /> {t.saves} saved
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Link
              to="/create"
              search={{ template: t.slug }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-love px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-plush"
            >
              <Sparkles size={14} /> Use this template
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium"
            >
              Browse more
            </Link>
          </div>

          <ul className="mt-8 space-y-2 text-sm text-foreground/80">
            <li>· custom message with name reveal</li>
            <li>· upload up to 6 photos for the gallery</li>
            <li>· optional background music</li>
            <li>· shareable link with replay button</li>
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-8">
          <h2 className="text-2xl font-semibold">More like this</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((r) => (
              <Link
                key={r.id}
                to="/template/$slug"
                params={{ slug: r.slug }}
                className="group block overflow-hidden rounded-2xl shadow-soft"
              >
                <div
                  className="grid aspect-[4/5] place-items-center text-4xl transition group-hover:scale-105"
                  style={{ background: r.gradient }}
                >
                  {r.emoji}
                </div>
                <p className="mt-2 px-1 text-sm font-medium">{r.title}</p>
                <p className="px-1 text-[11px] text-muted-foreground">{r.occasion}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
