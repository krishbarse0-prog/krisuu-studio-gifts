import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles } from "lucide-react";
import {
  addHeart, addReaction, addWish, getSocial, type GiftSocial,
} from "@/lib/reactions-store";

const EMOJIS = ["❤️", "🥹", "✨", "🌸", "🥰", "😭", "🫶", "🎀"];

type Burst = { id: number; emoji: string; x: number };

export function GiftReactions({ giftId, recipientName }: { giftId: string; recipientName?: string }) {
  const [social, setSocial] = useState<GiftSocial>({ reactions: [], wishes: [], hearts: 0 });
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setSocial(getSocial(giftId));
    const fn = () => setSocial(getSocial(giftId));
    window.addEventListener("krisuu:social:changed", fn);
    return () => window.removeEventListener("krisuu:social:changed", fn);
  }, [giftId]);

  function fireBurst(emoji: string) {
    const id = Date.now() + Math.floor(Math.random() * 999);
    const x = 40 + Math.random() * 20;
    setBursts((b) => [...b, { id, emoji, x }]);
    setTimeout(() => setBursts((b) => b.filter((it) => it.id !== id)), 1400);
  }
  function onHeart() { setSocial(addHeart(giftId)); fireBurst("❤️"); }
  function onReact(e: string) { setSocial(addReaction(giftId, e)); fireBurst(e); }
  function onWish(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setSocial(addWish(giftId, name.trim(), msg.trim()));
    setMsg("");
  }

  return (
    <section className="relative mx-auto w-full max-w-xl px-5 pb-28 pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        <AnimatePresence>
          {bursts.map((b) => (
            <motion.span
              key={b.id}
              initial={{ y: 30, opacity: 0, scale: 0.6 }}
              animate={{ y: -120, opacity: 1, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute text-2xl"
              style={{ left: `${b.x}%` }}
            >
              {b.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <div className="rounded-3xl bg-white/90 p-5 text-center shadow-plush backdrop-blur">
        <p className="font-script text-xl text-foreground/80" style={{ fontFamily: "var(--font-script)" }}>
          felt something?
        </p>
        <button
          onClick={onHeart}
          className="group mx-auto mt-2 inline-flex items-center gap-2 rounded-full bg-love px-5 py-3 text-sm font-semibold text-white shadow-plush transition active:scale-95"
        >
          <Heart size={16} fill="currentColor" className="group-hover:scale-110 transition" />
          send love · {social.hearts}
        </button>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => onReact(e)}
              className="rounded-full bg-muted/60 px-2.5 py-1.5 text-lg transition hover:scale-110 active:scale-95"
              aria-label={`react ${e}`}
            >
              {e}
            </button>
          ))}
        </div>
        {social.reactions.length > 0 && (
          <p className="mt-3 text-[11px] text-muted-foreground">
            recent: {social.reactions.slice(0, 12).map((r) => r.emoji).join(" ")}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-3xl bg-white/90 p-5 shadow-soft backdrop-blur">
        <p className="flex items-center justify-center gap-1.5 text-center font-display text-lg" style={{ fontFamily: "var(--font-display)" }}>
          <Sparkles size={14} className="text-love" /> leave a wish for {recipientName || "them"}
        </p>
        <form onSubmit={onWish} className="mt-3 space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="your name (optional)"
            className="input text-sm"
            maxLength={40}
          />
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="write something sweet…"
            className="input min-h-[72px] resize-none text-sm"
            maxLength={240}
          />
          <button
            type="submit"
            disabled={!msg.trim()}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground py-2.5 text-xs font-semibold text-background disabled:opacity-40"
          >
            <Send size={12} /> post wish
          </button>
        </form>

        {social.wishes.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {social.wishes.map((w) => (
              <li key={w.id} className="rounded-2xl bg-muted/40 p-3 text-left">
                <p className="text-sm text-foreground/90">{w.message}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  — {w.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
