import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarHeart,
  Check,
  ChevronDown,
  Eye,
  ImagePlus,
  Lock,
  Mic,
  Music2,
  Save,
  Send,
  Sparkles,
  Trash2,
  UploadCloud,
  Wand2,
} from "lucide-react";
import type { Gift, GiftAnimation, GiftTheme } from "@/lib/gift-store";
import { encodePassword, PALETTES, saveGift, setPrefs, THEME_GRADIENT } from "@/lib/gift-store";
import { GiftRenderer } from "./GiftRenderer";
import { VoiceRecorder } from "./VoiceNote";

const THEMES: { id: GiftTheme; label: string; mood: string }[] = [
  { id: "rose", label: "Rose", mood: "warm · romantic" },
  { id: "sunset", label: "Sunset", mood: "golden · soft" },
  { id: "moonlit", label: "Moonlit", mood: "dreamy · proposal" },
  { id: "mint", label: "Mint", mood: "fresh · friendship" },
  { id: "cream", label: "Cream", mood: "minimal · editorial" },
];

const ANIMATIONS: { id: GiftAnimation; label: string; icon: string; hint: string }[] = [
  { id: "envelope", label: "Envelope", icon: "💌", hint: "classic letter reveal" },
  { id: "giftbox", label: "Gift Box", icon: "🎁", hint: "unwrap with confetti" },
  { id: "scrapbook", label: "Scrapbook", icon: "📷", hint: "polaroid pages" },
  { id: "moonlit", label: "Moonlit", icon: "🌙", hint: "dreamy night" },
  { id: "balloons", label: "Balloons", icon: "🎈", hint: "floating joy" },
];

export function GiftEditor({ initial }: { initial: Gift }) {
  const [gift, setGift] = useState<Gift>(initial);
  const [rawPassword, setRawPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // autosave
  useEffect(() => {
    const t = setTimeout(() => {
      saveGift(gift);
      setSaved(true);
      const h = setTimeout(() => setSaved(false), 1400);
      return () => clearTimeout(h);
    }, 700);
    return () => clearTimeout(t);
  }, [gift]);

  function patch<K extends keyof Gift>(k: K, v: Gift[K]) {
    setGift((g) => ({ ...g, [k]: v }));
  }

  async function handleFiles(files: FileList | File[] | null) {
    if (!files) return;
    const arr: string[] = [];
    for (const f of Array.from(files).slice(0, 6 - gift.photos.length)) {
      if (!f.type.startsWith("image/")) continue;
      arr.push(await fileToDataUrl(f));
    }
    if (arr.length) patch("photos", [...gift.photos, ...arr].slice(0, 6));
  }

  function removePhoto(i: number) {
    patch("photos", gift.photos.filter((_, idx) => idx !== i));
  }

  function movePhoto(i: number, dir: -1 | 1) {
    const next = [...gift.photos];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    patch("photos", next);
  }

  function publish() {
    const next = saveGift({ ...gift, status: "published" });
    setPrefs({ lastTheme: gift.theme, lastPalette: gift.palette });
    setTimeout(
      () => navigate({ to: "/gift/$giftId", params: { giftId: next.slug } }),
      180,
    );
  }

  const filledCount =
    (gift.recipientName ? 1 : 0) +
    (gift.senderName ? 1 : 0) +
    (gift.message.length > 8 ? 1 : 0) +
    (gift.photos.length ? 1 : 0);
  const progress = Math.round((filledCount / 4) * 100);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-8 lg:px-8">
      {/* ─────────── Configuration ─────────── */}
      <div className="order-2 lg:order-1">
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card/85 shadow-soft backdrop-blur">
          {/* header */}
          <div className="border-b border-border/60 px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-hand text-base text-foreground/65 leading-none">your studio</p>
                <h1
                  className="mt-0.5 truncate text-xl font-semibold sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Create your gift
                </h1>
              </div>
              <Link
                to="/templates"
                className="shrink-0 text-[11px] text-muted-foreground hover:text-foreground"
              >
                change template →
              </Link>
            </div>

            {/* progress */}
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/70">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-full bg-love"
                />
              </div>
              <AnimatePresence>
                {saved && (
                  <motion.span
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1 text-[10px] text-muted-foreground"
                  >
                    <Check size={10} className="text-love" /> saved
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            {/* names */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="To" hint="who's this for?">
                <input
                  className="input"
                  value={gift.recipientName}
                  maxLength={40}
                  placeholder="Anna"
                  onChange={(e) => patch("recipientName", e.target.value)}
                />
              </Field>
              <Field label="From" hint="your name">
                <input
                  className="input"
                  value={gift.senderName}
                  maxLength={40}
                  placeholder="Sam"
                  onChange={(e) => patch("senderName", e.target.value)}
                />
              </Field>
            </div>

            <Field label="Your message" hint={`${gift.message.length}/500`}>
              <textarea
                className="input min-h-[120px] resize-y leading-relaxed"
                value={gift.message}
                maxLength={500}
                placeholder="every tuesday with you feels like a small festival…"
                onChange={(e) => patch("message", e.target.value)}
              />
            </Field>

            {/* photo upload */}
            <Field label="Photos" hint={`${gift.photos.length}/6`}>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                className={`group cursor-pointer rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${
                  dragOver
                    ? "border-love bg-love-soft/60"
                    : "border-border bg-background/50 hover:border-foreground/30 hover:bg-background/80"
                }`}
              >
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-love-soft text-love transition group-hover:scale-110">
                  <UploadCloud size={18} />
                </span>
                <p className="mt-2 text-[13px] font-medium text-foreground">
                  Drop photos or <span className="underline decoration-dotted">browse</span>
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  up to 6 · JPG, PNG · they live on this device
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {gift.photos.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {gift.photos.map((p, i) => (
                    <motion.div
                      key={p.slice(0, 32) + i}
                      layout
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="group/photo relative aspect-square overflow-hidden rounded-xl shadow-soft ring-1 ring-border/60"
                    >
                      <img src={p} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex flex-col justify-between bg-foreground/0 p-1 opacity-0 transition group-hover/photo:bg-foreground/30 group-hover/photo:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(i);
                          }}
                          className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-white/95 text-foreground shadow-soft"
                          aria-label="Remove"
                        >
                          <Trash2 size={11} />
                        </button>
                        <div className="flex justify-between gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              movePhoto(i, -1);
                            }}
                            disabled={i === 0}
                            className="grid h-5 w-5 place-items-center rounded-full bg-white/95 text-foreground shadow-soft disabled:opacity-30"
                            aria-label="Move left"
                          >
                            ‹
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              movePhoto(i, 1);
                            }}
                            disabled={i === gift.photos.length - 1}
                            className="grid h-5 w-5 place-items-center rounded-full bg-white/95 text-foreground shadow-soft disabled:opacity-30"
                            aria-label="Move right"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                      <span className="absolute left-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-foreground/70 text-[9px] font-bold text-background">
                        {i + 1}
                      </span>
                    </motion.div>
                  ))}
                  {gift.photos.length < 6 && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="grid aspect-square place-items-center rounded-xl border border-dashed border-border bg-background/40 text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                      aria-label="Add another"
                    >
                      <ImagePlus size={18} />
                    </button>
                  )}
                </div>
              )}
            </Field>

            {/* music */}
            <Field label="Background music" hint="optional · adds magic">
              <div className="relative">
                <Music2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  className="input pl-9"
                  type="url"
                  value={gift.musicUrl ?? ""}
                  placeholder="paste an mp3 link…"
                  onChange={(e) => patch("musicUrl", e.target.value)}
                />
              </div>
            </Field>

            {/* themes */}
            <Field label="Theme" hint="set the mood">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {THEMES.map((t) => {
                  const active = gift.theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => patch("theme", t.id)}
                      className={`group relative overflow-hidden rounded-xl border p-1.5 text-left transition ${
                        active
                          ? "border-foreground shadow-soft"
                          : "border-border/60 hover:border-foreground/30"
                      }`}
                    >
                      <span
                        className="block h-14 w-full rounded-lg"
                        style={{ background: THEME_GRADIENT[t.id] }}
                      />
                      <p className="mt-1.5 truncate text-[11px] font-semibold text-foreground">
                        {t.label}
                      </p>
                      <p className="truncate text-[9.5px] text-muted-foreground">{t.mood}</p>
                      {active && (
                        <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-foreground text-background">
                          <Check size={9} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* palette */}
            <Field label="Accent color">
              <div className="flex flex-wrap gap-2">
                {PALETTES.map((p) => {
                  const active = gift.palette === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => patch("palette", p.id)}
                      aria-label={p.label}
                      title={p.label}
                      className={`relative h-9 w-9 rounded-full transition ${
                        active ? "scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-card" : "ring-1 ring-border"
                      }`}
                      style={{ background: p.color }}
                    >
                      {active && (
                        <Check
                          size={12}
                          className="absolute inset-0 m-auto text-white drop-shadow"
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* animation */}
            <Field label="Animation style">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {ANIMATIONS.map((a) => {
                  const active = gift.animation === a.id;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => patch("animation", a.id)}
                      className={`relative rounded-xl border p-2.5 text-center transition ${
                        active
                          ? "border-foreground bg-background shadow-soft"
                          : "border-border/60 bg-background/40 hover:border-foreground/30"
                      }`}
                    >
                      <span className="text-xl">{a.icon}</span>
                      <p className="mt-1 text-[11px] font-semibold text-foreground">{a.label}</p>
                      <p className="truncate text-[9.5px] text-muted-foreground">{a.hint}</p>
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* ─── Advanced: premium reveal ─── */}
            <div className="rounded-2xl border border-dashed border-border/70 bg-background/40">
              <button
                type="button"
                onClick={() => setAdvancedOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
              >
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-foreground/80">
                  <Sparkles size={13} className="text-love" /> Premium reveal
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition ${advancedOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {advancedOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-5 px-4 pb-5">
                      {/* voice note */}
                      <Field label="Voice note" hint="record up to 60s">
                        <div className="rounded-xl bg-card/60 p-3">
                          <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] text-foreground/70">
                            <Mic size={11} className="text-love" />
                            Add your real voice to the reveal.
                          </p>
                          <VoiceRecorder
                            value={gift.voiceNote}
                            onChange={(v) => patch("voiceNote", v)}
                          />
                        </div>
                      </Field>

                      {/* password */}
                      <Field label="Password lock" hint="keep it private">
                        <div className="space-y-2">
                          <div className="relative">
                            <Lock
                              size={13}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            />
                            <input
                              className="input pl-9"
                              type="text"
                              value={rawPassword}
                              placeholder="e.g. our anniversary"
                              onChange={(e) => {
                                setRawPassword(e.target.value);
                                patch("password", encodePassword(e.target.value));
                              }}
                            />
                          </div>
                          <input
                            className="input"
                            type="text"
                            value={gift.passwordHint ?? ""}
                            placeholder="optional hint shown on the lock screen"
                            maxLength={60}
                            onChange={(e) => patch("passwordHint", e.target.value)}
                          />
                        </div>
                      </Field>

                      {/* countdown */}
                      <Field label="Reveal countdown" hint="opens at this time">
                        <div className="relative">
                          <CalendarHeart
                            size={13}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                          <input
                            className="input pl-9"
                            type="datetime-local"
                            value={
                              gift.revealAt
                                ? new Date(gift.revealAt - new Date().getTimezoneOffset() * 60000)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                            onChange={(e) =>
                              patch(
                                "revealAt",
                                e.target.value ? new Date(e.target.value).getTime() : undefined,
                              )
                            }
                          />
                        </div>
                        {gift.revealAt && (
                          <button
                            type="button"
                            onClick={() => patch("revealAt", undefined)}
                            className="mt-1.5 text-[10px] text-muted-foreground underline decoration-dotted hover:text-love"
                          >
                            clear countdown
                          </button>
                        )}
                      </Field>

                      {/* scratch */}
                      <Field label="Scratch-to-reveal">
                        <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 px-3 py-2.5">
                          <span className="text-[12px] text-foreground/85">
                            Wrap the gift in scratchable foil ✨
                          </span>
                          <span
                            className={`relative h-5 w-9 rounded-full transition ${
                              gift.scratchToReveal ? "bg-love" : "bg-muted"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              checked={!!gift.scratchToReveal}
                              onChange={(e) => patch("scratchToReveal", e.target.checked)}
                            />
                            <span
                              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                                gift.scratchToReveal ? "left-4" : "left-0.5"
                              }`}
                            />
                          </span>
                        </label>
                        {gift.scratchToReveal && (
                          <input
                            className="input mt-2"
                            value={gift.scratchLabel ?? ""}
                            placeholder="scratch to reveal"
                            maxLength={40}
                            onChange={(e) => patch("scratchLabel", e.target.value)}
                          />
                        )}
                      </Field>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* sticky actions */}
          <div className="sticky bottom-0 grid grid-cols-2 gap-2 border-t border-border/60 bg-card/95 px-5 py-3 backdrop-blur sm:px-6">
            <button
              onClick={() => saveGift({ ...gift, status: "draft" })}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background py-3 text-xs font-medium hover:bg-muted/60"
            >
              <Save size={12} /> Save draft
            </button>
            <button
              onClick={publish}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground py-3 text-xs font-medium text-background shadow-plush transition hover:scale-[1.02]"
            >
              <Send size={12} /> Publish & share
            </button>
          </div>
        </div>
      </div>

      {/* ─────────── Live Preview ─────────── */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-20">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="font-hand text-xl text-foreground/65">live preview</p>
            <Link
              to="/preview/$giftId"
              params={{ giftId: gift.id }}
              className="inline-flex items-center gap-1 rounded-full bg-card/80 px-2.5 py-1 text-[11px] text-muted-foreground shadow-soft backdrop-blur hover:text-foreground"
            >
              <Eye size={11} /> full screen
            </Link>
          </div>

          {/* device frame */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-b from-white/80 to-[oklch(0.95_0.04_25/0.6)] p-2.5 shadow-plush backdrop-blur">
            <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-foreground/15" />
            <div className="overflow-hidden rounded-[1.4rem]">
              <GiftRenderer gift={gift} compact autoplay />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Wand2 size={11} className="text-love" /> updates instantly
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles size={11} /> {progress}% complete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/75">
          {label}
        </span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
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
