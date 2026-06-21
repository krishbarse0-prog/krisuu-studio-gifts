import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, Image as ImageIcon, Save, Send, Trash2, Wand2 } from "lucide-react";
import type { Gift, GiftAnimation, GiftTheme } from "@/lib/gift-store";
import { PALETTES, saveGift, setPrefs } from "@/lib/gift-store";
import { GiftRenderer } from "./GiftRenderer";

const THEMES: { id: GiftTheme; label: string; swatch: string }[] = [
  { id: "rose", label: "Rose", swatch: "linear-gradient(135deg, var(--love-soft), var(--card))" },
  { id: "sunset", label: "Sunset", swatch: "linear-gradient(135deg, var(--birthday-soft), var(--love-soft))" },
  { id: "moonlit", label: "Moonlit", swatch: "linear-gradient(180deg, oklch(0.35 0.06 290), oklch(0.55 0.08 320))" },
  { id: "mint", label: "Mint", swatch: "linear-gradient(135deg, var(--memory-soft), var(--card))" },
  { id: "cream", label: "Cream", swatch: "linear-gradient(135deg, var(--cream), var(--card))" },
];

const ANIMATIONS: { id: GiftAnimation; label: string }[] = [
  { id: "envelope", label: "Envelope" },
  { id: "giftbox", label: "Gift box" },
  { id: "scrapbook", label: "Scrapbook" },
  { id: "moonlit", label: "Moonlit" },
  { id: "balloons", label: "Balloons" },
];

export function GiftEditor({ initial }: { initial: Gift }) {
  const [gift, setGift] = useState<Gift>(initial);
  const [saving, setSaving] = useState<null | "draft" | "publish">(null);
  const navigate = useNavigate();

  // autosave to localStorage 800ms after change
  useEffect(() => {
    const t = setTimeout(() => saveGift(gift), 800);
    return () => clearTimeout(t);
  }, [gift]);

  function patch<K extends keyof Gift>(k: K, v: Gift[K]) {
    setGift((g) => ({ ...g, [k]: v }));
  }

  async function onPhotos(files: FileList | null) {
    if (!files) return;
    const arr: string[] = [];
    for (const f of Array.from(files).slice(0, 6)) {
      arr.push(await fileToDataUrl(f));
    }
    patch("photos", [...gift.photos, ...arr].slice(0, 6));
  }

  function removePhoto(i: number) {
    patch("photos", gift.photos.filter((_, idx) => idx !== i));
  }

  function publish() {
    setSaving("publish");
    const next = saveGift({ ...gift, status: "published" });
    setPrefs({ lastTheme: gift.theme, lastPalette: gift.palette });
    setTimeout(() => navigate({ to: "/gift/$giftId", params: { giftId: next.slug } }), 200);
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:px-8">
      {/* Form */}
      <div className="rounded-3xl border border-border/70 bg-card/85 p-5 shadow-soft backdrop-blur sm:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Create your gift
          </h1>
          <Link to="/templates" className="text-xs text-muted-foreground hover:text-foreground">
            change template →
          </Link>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Edits autosave to this device.</p>

        <div className="mt-5 space-y-4">
          <Field label="To (recipient)">
            <input
              className="input"
              value={gift.recipientName}
              maxLength={40}
              placeholder="Anna"
              onChange={(e) => patch("recipientName", e.target.value)}
            />
          </Field>
          <Field label="From (your name)">
            <input
              className="input"
              value={gift.senderName}
              maxLength={40}
              placeholder="Sam"
              onChange={(e) => patch("senderName", e.target.value)}
            />
          </Field>
          <Field label="Your message">
            <textarea
              className="input min-h-[110px] resize-y leading-relaxed"
              value={gift.message}
              maxLength={500}
              placeholder="every tuesday with you feels like a small festival…"
              onChange={(e) => patch("message", e.target.value)}
            />
            <span className="mt-1 block text-right text-[10px] text-muted-foreground">
              {gift.message.length}/500
            </span>
          </Field>

          <Field label="Photos (up to 6)">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/60 py-4 text-xs text-muted-foreground hover:bg-background">
              <ImageIcon size={14} /> Click to upload
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => onPhotos(e.target.files)}
              />
            </label>
            {gift.photos.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {gift.photos.map((p, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-lg">
                    <img src={p} alt="" className="h-full w-full object-cover" />
                    <button
                      onClick={() => removePhoto(i)}
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-foreground/70 text-background opacity-0 transition group-hover:opacity-100"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Field>

          <Field label="Music URL (mp3 / audio)">
            <input
              className="input"
              type="url"
              value={gift.musicUrl ?? ""}
              placeholder="https://…/song.mp3"
              onChange={(e) => patch("musicUrl", e.target.value)}
            />
          </Field>

          <Field label="Theme">
            <div className="grid grid-cols-5 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => patch("theme", t.id)}
                  className={`group flex flex-col items-center gap-1 rounded-xl border p-1.5 text-[10px] transition ${
                    gift.theme === t.id ? "border-foreground bg-background" : "border-border/60 hover:bg-background/60"
                  }`}
                >
                  <span className="h-8 w-full rounded-md" style={{ background: t.swatch }} />
                  {t.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Color palette">
            <div className="flex flex-wrap gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => patch("palette", p.id)}
                  aria-label={p.label}
                  className={`h-9 w-9 rounded-full border-2 transition ${
                    gift.palette === p.id ? "border-foreground scale-110" : "border-white"
                  }`}
                  style={{ background: p.color }}
                />
              ))}
            </div>
          </Field>

          <Field label="Animation style">
            <div className="flex flex-wrap gap-2">
              {ANIMATIONS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => patch("animation", a.id)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                    gift.animation === a.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:bg-background/60"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setSaving("draft");
              saveGift({ ...gift, status: "draft" });
              setTimeout(() => setSaving(null), 600);
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background py-3 text-xs font-medium hover:bg-muted/60"
          >
            <Save size={12} /> {saving === "draft" ? "Saved" : "Save draft"}
          </button>
          <button
            onClick={publish}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground py-3 text-xs font-medium text-background shadow-plush hover:opacity-90"
          >
            <Send size={12} /> Publish & share
          </button>
        </div>
      </div>

      {/* Live preview */}
      <div className="relative">
        <div className="sticky top-20">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="font-hand text-xl text-foreground/65">live preview</p>
            <Link
              to="/preview/$giftId"
              params={{ giftId: gift.id }}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Eye size={12} /> full screen
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/70 shadow-plush">
            <GiftRenderer gift={gift} compact autoplay />
          </div>
          <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <Wand2 size={11} /> changes appear instantly
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function fileToDataUrl(f: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(f);
  });
}
