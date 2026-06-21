import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { PolaroidCard } from "@/components/PolaroidCard";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import { CATEGORY_LABEL, templates, type Category, type Template } from "@/lib/templates";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Krisuu Studio" },
      { name: "description", content: "Browse every Krisuu Studio template — love letters, birthday surprises, memory books and more." },
      { property: "og:title", content: "Templates — Krisuu Studio" },
      { property: "og:description", content: "Pick a template, make it yours, send a memory." },
      { property: "og:url", content: "/templates" },
    ],
    links: [{ rel: "canonical", href: "/templates" }],
  }),
  component: TemplatesPage,
});

const CATEGORIES: ("all" | Category)[] = ["all", "love", "birthday", "friendship", "memory", "proposal"];

function TemplatesPage() {
  const [cat, setCat] = useState<"all" | Category>("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Template | null>(null);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (cat !== "all" && t.category !== cat) return false;
      if (q && !`${t.title} ${t.tagline} ${t.occasion}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [cat, q]);

  return (
    <div className="min-h-screen pb-24">
      <BrandHeader />

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-8 sm:pt-12">
        <p className="font-hand text-xl text-foreground/65">templates</p>
        <h1
          className="mt-1 text-3xl font-semibold sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Pick a feeling. Make it theirs.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Every template is a tiny film you customize in minutes. Choose one and start writing.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search templates…"
              className="w-full rounded-full border border-border bg-card/85 py-2.5 pl-9 pr-4 text-sm shadow-soft outline-none focus:border-foreground/40"
            />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  cat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card/70 hover:bg-card"
                }`}
              >
                {c === "all" ? "All" : CATEGORY_LABEL[c]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-12 px-4 sm:gap-x-8 sm:px-8 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((t) => (
          <div key={t.id} className="flex justify-center">
            <PolaroidCard template={t} onOpen={setActive} />
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
            No templates match that search.
          </p>
        )}
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-3 rounded-3xl border border-border/70 bg-card/85 p-6 shadow-soft sm:flex-row sm:items-center">
          <div>
            <p className="font-hand text-lg text-foreground/65">already know what you want?</p>
            <h2 className="text-xl font-semibold">Start from scratch.</h2>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-xs font-medium text-background"
          >
            Open the studio <ArrowRight size={12} />
          </Link>
        </div>
      </section>

      <TemplatePreviewModal template={active} onClose={() => setActive(null)} />
    </div>
  );
}
