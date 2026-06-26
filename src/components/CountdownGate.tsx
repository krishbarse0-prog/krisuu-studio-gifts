import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import type { Gift } from "@/lib/gift-store";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s, done: ms === 0 };
}

export function CountdownGate({ gift, children }: { gift: Gift; children: React.ReactNode }) {
  const target = gift.revealAt ?? 0;
  const [now, setNow] = useState(() => Date.now());
  const [forceOpen, setForceOpen] = useState(false);

  useEffect(() => {
    if (!target) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);

  if (!target || now >= target || forceOpen) return <>{children}</>;
  const { d, h, m, s } = diff(target);
  const date = new Date(target);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-[oklch(0.32_0.06_290)] via-[oklch(0.4_0.08_320)] to-[oklch(0.5_0.1_340)] p-6 text-center text-white">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
      <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 max-w-md">
        <CalendarHeart size={36} className="mx-auto opacity-90" />
        <p className="mt-3 font-script text-2xl opacity-90" style={{ fontFamily: "var(--font-script)" }}>
          for {gift.recipientName || "you"}
        </p>
        <h1 className="mt-1 text-3xl font-semibold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          opens in
        </h1>
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { v: d, l: "days" },
            { v: h, l: "hrs" },
            { v: m, l: "min" },
            { v: s, l: "sec" },
          ].map((b) => (
            <div key={b.l} className="rounded-2xl bg-white/10 px-2 py-3 backdrop-blur-md ring-1 ring-white/20">
              <p className="text-3xl font-bold tabular-nums sm:text-4xl">{String(b.v).padStart(2, "0")}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest opacity-70">{b.l}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs opacity-80">
          unlocks {date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
        </p>
        <button
          onClick={() => setForceOpen(true)}
          className="mt-4 text-[11px] underline decoration-dotted opacity-60 hover:opacity-100"
        >
          sender? peek inside →
        </button>
      </motion.div>
    </div>
  );
}
