import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { BrandHeader } from "@/components/BrandHeader";
import { GiftEditor } from "@/components/GiftEditor";
import { emptyGift, getPrefs, type Gift } from "@/lib/gift-store";
import { templates } from "@/lib/templates";

const search = z.object({ template: z.string().optional(), gift: z.string().optional() });

export const Route = createFileRoute("/create")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Create a gift — Krisuu Studio" },
      { name: "description", content: "Live editor: write the message, drop photos, pick a theme, share." },
      { property: "og:title", content: "Create a gift — Krisuu Studio" },
      { property: "og:url", content: "/create" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/create" }],
  }),
  component: CreatePage,
});

function CreatePage() {
  const { template } = Route.useSearch();
  const [gift, setGift] = useState<Gift | null>(null);

  useEffect(() => {
    const t = templates.find((x) => x.slug === template) ?? templates[0];
    const prefs = getPrefs();
    const g = emptyGift(t.id, t.slug);
    setGift({
      ...g,
      animation: t.preview,
      category: t.category,
      theme: prefs.lastTheme ?? g.theme,
      palette: prefs.lastPalette ?? g.palette,
    });
  }, [template]);

  return (
    <div className="min-h-screen pb-16">
      <BrandHeader />
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-8">
        <Link to="/templates" className="text-xs text-muted-foreground hover:text-foreground">
          ← templates
        </Link>
      </div>
      {gift ? <GiftEditor initial={gift} /> : (
        <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">
          loading studio…
        </div>
      )}
    </div>
  );
}
