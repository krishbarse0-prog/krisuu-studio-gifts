import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Music, Play, RotateCcw, Sparkles } from "lucide-react";

const STAGES = ["envelope", "open", "letter", "typing", "photo", "music", "finale"] as const;
type Stage = (typeof STAGES)[number];

const STAGE_DURATIONS: Record<Stage, number> = {
  envelope: 1800,
  open: 1400,
  letter: 1200,
  typing: 3200,
  photo: 2200,
  music: 1800,
  finale: 3000,
};

const LETTER = "To the person who makes ordinary days feel like a soft little movie…";

export function LiveGiftPreview() {
  const [stage, setStage] = useState<Stage>("envelope");
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      const i = STAGES.indexOf(stage);
      setStage(STAGES[(i + 1) % STAGES.length]);
    }, STAGE_DURATIONS[stage]);
    return () => clearTimeout(t);
  }, [stage, playing]);

  const idx = STAGES.indexOf(stage);

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* device frame */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-b from-[oklch(0.98_0.02_15)] to-[oklch(0.95_0.04_25)] p-3 shadow-plush">
        {/* notch */}
        <div className="mx-auto mb-2 h-1.5 w-24 rounded-full bg-foreground/15" />
        <div
          className="relative aspect-[9/12] overflow-hidden rounded-[1.5rem]"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, oklch(0.96 0.06 12 / 0.95), oklch(0.92 0.07 25 / 0.95) 60%, oklch(0.85 0.1 18))",
          }}
        >
          {/* ambient sparkles */}
          <div className="pointer-events-none absolute inset-0">
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/80"
                style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.3, 0.6] }}
                transition={{ duration: 2.4 + (i % 4) * 0.4, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {stage === "envelope" && <Envelope key="env" />}
            {stage === "open" && <Envelope key="open" opening />}
            {stage === "letter" && <Letter key="letter" />}
            {stage === "typing" && <Letter key="typing" typing />}
            {stage === "photo" && <PhotoScene key="photo" />}
            {stage === "music" && <PhotoScene key="music" withMusic />}
            {stage === "finale" && <Finale key="finale" />}
          </AnimatePresence>

          {/* stage progress dots */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {STAGES.map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="mt-3 flex items-center justify-between px-2 text-xs text-foreground/70">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Sparkles size={12} className="text-love" /> Live preview · auto-playing
          </span>
          <div className="flex items-center gap-1">
            <button
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
              className="grid h-7 w-7 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10"
            >
              <Play size={12} className={playing ? "opacity-50" : ""} />
            </button>
            <button
              aria-label="Restart"
              onClick={() => setStage("envelope")}
              className="grid h-7 w-7 place-items-center rounded-full bg-foreground/5 hover:bg-foreground/10"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* floating badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="glass absolute -right-3 top-10 hidden rounded-2xl px-3 py-2 text-xs shadow-soft sm:block"
      >
        <p className="font-hand text-base leading-none text-love">made with 🤍</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">in 2 minutes</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.4, repeat: Infinity }}
        className="glass absolute -left-3 bottom-16 hidden rounded-2xl px-3 py-2 text-xs shadow-soft sm:block"
      >
        <p className="font-hand text-base leading-none text-foreground">opened 12,400×</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">this week</p>
      </motion.div>
    </div>
  );
}

function Envelope({ opening = false }: { opening?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 grid place-items-center"
    >
      <div className="relative h-44 w-64 sm:h-52 sm:w-72">
        <div className="absolute inset-0 rounded-md bg-[oklch(0.96_0.05_20)] shadow-plush" />
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: opening ? -160 : 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          style={{ transformOrigin: "top", transformPerspective: 800 }}
          className="absolute inset-x-0 top-0 h-1/2 origin-top"
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, oklch(0.92 0.08 18), oklch(0.85 0.12 15))",
            }}
          />
        </motion.div>
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 rounded-b-md"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 0)",
            background: "linear-gradient(180deg, oklch(0.94 0.05 20), oklch(0.88 0.08 18))",
          }}
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: opening ? -10 : 20, opacity: opening ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-soft"
        >
          <span className="text-lg">💌</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Letter({ typing = false }: { typing?: boolean }) {
  const [chars, setChars] = useState(typing ? 0 : LETTER.length);
  useEffect(() => {
    if (!typing) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= LETTER.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [typing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute inset-0 grid place-items-center p-6"
    >
      <div className="relative w-full max-w-[260px] rotate-[-2deg] rounded-md bg-[oklch(0.99_0.01_70)] p-5 shadow-polaroid">
        <span className="washi-tape -top-2 left-6 -rotate-6" />
        <p
          className="text-[15px] leading-relaxed text-foreground"
          style={{ fontFamily: "var(--font-hand)" }}
        >
          {typing ? LETTER.slice(0, chars) : LETTER}
          {typing && chars < LETTER.length && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </motion.div>
  );
}

function PhotoScene({ withMusic = false }: { withMusic?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 grid place-items-center"
    >
      <motion.div
        initial={{ scale: 0.85, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: -4, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 14 }}
        className="polaroid w-44 p-3 pb-10"
      >
        <div
          className="aspect-square w-full rounded-sm"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.85 0.08 25), oklch(0.78 0.12 18)), radial-gradient(circle at 30% 30%, oklch(0.95 0.05 25), transparent 50%)",
          }}
        />
        <p className="mt-2 font-hand text-base text-foreground/80">us, that one Sunday ♡</p>
      </motion.div>
      {withMusic && (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass absolute bottom-12 inline-flex items-center gap-2 rounded-full px-3 py-2 shadow-soft"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-love text-primary-foreground">
            <Music size={12} />
          </span>
          <span className="text-xs font-medium text-foreground">Our Song · 2:14</span>
        </motion.div>
      )}
    </motion.div>
  );
}

function Finale() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[oklch(0.96_0.07_15)] to-[oklch(0.85_0.13_18)]"
    >
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-lg"
            style={{ left: `${(i * 41) % 100}%`, top: "-10%" }}
            animate={{ y: ["0%", "110%"], rotate: [0, 360] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
          >
            {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "♡" : "✦"}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="text-center"
      >
        <p className="font-hand text-3xl text-white drop-shadow">forever yours</p>
        <p
          className="mt-2 text-2xl font-semibold text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Happy Anniversary
        </p>
      </motion.div>
    </motion.div>
  );
}
