import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Edit3, Eye, Heart, Plus, Sparkles, Trash2 } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import {
  deleteGift,
  duplicateGift,
  listFavorites,
  listGifts,
  toggleFavorite,
  type Gift,
} from "@/lib/gift-store";
import { templates } from "@/lib/templates";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your gifts — Krisuu Studio" },
      { name: "description", content: "All the gifts you've crafted on this device." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const load = () => {
      setGifts(listGifts());
      setFavs(listFavorites());
    };
    load();
    window.addEventListener("krisuu:gifts:changed", load);
    window.addEventListener("krisuu:favs:changed", load);
    return () => {
      window.removeEventListener("krisuu:gifts:changed", load);
      window.removeEventListener("krisuu:favs:changed", load);
    };
  }, []);

  const drafts = gifts.filter((g) => g.status === "draft");
  const published = gifts.filter((g) => g.status === "published");
  const recent = gifts.slice(0, 4);
  const favTemplates = templates.filter((t) => favs.includes(t.id));

  return (
    <div className="min-h-screen pb-24">
      <BrandHeader />

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-8 sm:pt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-hand text-xl text-foreground/65">your studio</p>
            <h1
              className="mt-1 text-3xl font-semibold sm:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Gifts you've made.
            </h1>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 self-start rounded-full bg-love px-5 py-3 text-xs font-medium text-primary-foreground shadow-plush sm:self-auto"
          >
            <Plus size={13} /> New gift
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Drafts" value={drafts.length} />
          <Stat label="Published" value={published.length} />
          <Stat label="Recent" value={recent.length} />
          <Stat label="Favorites" value={favTemplates.length} />
        </div>

        <Group title="Recent">
          {recent.length === 0 ? <Empty /> : recent.map((g) => <GiftRow key={g.id} g={g} />)}
        </Group>
        <Group title="Drafts">
          {drafts.length === 0 ? <Empty /> : drafts.map((g) => <GiftRow key={g.id} g={g} />)}
        </Group>
        <Group title="Published">
          {published.length === 0 ? <Empty /> : published.map((g) => <GiftRow key={g.id} g={g} />)}
        </Group>

        <h2 className="mt-12 text-2xl font-semibold">Favorite templates</h2>
        {favTemplates.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Tap the bookmark on a template to save it here.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {favTemplates.map((t) => (
              <div key={t.id} className="rounded-2xl bg-card p-3 shadow-soft">
                <div
                  className="grid aspect-[4/5] place-items-center rounded-xl text-4xl"
                  style={{ background: t.gradient }}
                >
                  {t.emoji}
                </div>
                <p className="mt-2 truncate text-sm font-medium">{t.title}</p>
                <div className="mt-2 flex gap-1.5">
                  <Link
                    to="/create"
                    search={{ template: t.slug }}
                    className="flex-1 rounded-full bg-foreground py-1.5 text-center text-[11px] font-medium text-background"
                  >
                    Use
                  </Link>
                  <button
                    aria-label="Unfavorite"
                    onClick={() => toggleFavorite(t.id)}
                    className="grid h-7 w-7 place-items-center rounded-full bg-muted/70 text-foreground/60"
                  >
                    <Heart size={11} className="text-love" fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Empty() {
  return (
    <p className="rounded-2xl border border-dashed border-border bg-card/60 px-4 py-6 text-center text-xs text-muted-foreground">
      nothing here yet · <Link to="/create" className="underline">start one</Link>
    </p>
  );
}

function GiftRow({ g }: { g: Gift }) {
  const t = templates.find((x) => x.id === g.templateId);
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
      <div
        className="grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl"
        style={{ background: t?.gradient ?? "var(--love-soft)" }}
      >
        {t?.emoji ?? "💌"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {g.recipientName ? `For ${g.recipientName}` : "Untitled gift"}
          <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            {g.status}
          </span>
        </p>
        <p className="truncate text-[11px] text-muted-foreground">{t?.title ?? g.templateSlug}</p>
      </div>
      <div className="flex gap-1">
        <RowBtn to="/gift/$giftId" params={{ giftId: g.slug }} label="View" icon={Eye} />
        <RowBtn to="/create" search={{ gift: g.id, template: g.templateSlug }} label="Edit" icon={Edit3} />
        <button
          aria-label="Duplicate"
          onClick={() => duplicateGift(g.id)}
          className="grid h-8 w-8 place-items-center rounded-full bg-muted/60 hover:bg-muted"
        >
          <Copy size={12} />
        </button>
        <button
          aria-label="Delete"
          onClick={() => {
            if (confirm("Delete this gift forever?")) deleteGift(g.id);
          }}
          className="grid h-8 w-8 place-items-center rounded-full bg-muted/60 hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}

function RowBtn({
  to,
  params,
  search,
  label,
  icon: Icon,
}: {
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  label: string;
  icon: typeof Eye;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      params={params as never}
      search={search as never}
      className="inline-flex h-8 items-center gap-1 rounded-full bg-muted/60 px-2.5 text-[11px] hover:bg-muted"
      aria-label={label}
    >
      <Icon size={11} /> <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
