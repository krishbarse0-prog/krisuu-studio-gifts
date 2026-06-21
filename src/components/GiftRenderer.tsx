import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart, Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { Gift } from "@/lib/gift-store";
import { THEME_GRADIENT } from "@/lib/gift-store";

/**
 * Renders the full gift experience. Used both in the live editor preview
 * and on the public /gift/$giftId page.
 *
 * Stages: envelope -> opening -> letter -> gallery -> finale
 */
export function GiftRenderer({
  gift,
  autoplay = true,
  compact = false,
}: {
  gift: Gift;
  autoplay?: boolean;
  compact?: boolean;
}) {
  const [stage, setStage] = useState<"closed" | "opening" | "letter" | "gallery" | "finale">(
    autoplay ? "closed" : "letter",
  );
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!autoplay) return;
    const t1 = setTimeout(() => setStage("opening"), 1200);
    const t2 = setTimeout(() => setStage("letter"), 2800);
    const t3 = setTimeout(() => setStage("gallery"), 7800);
    const t4 = setTimeout(() => setStage("finale"), 13000);
    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [autoplay, gift.id]);

  const palette = `var(--${gift.palette})`;
  const background = THEME_GRADIENT[gift.theme] ?? THEME_GRADIENT.rose;

  function toggleMusic() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.muted = false;
      setMuted(false);
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${compact ? "min-h-[420px] rounded-3xl" : "min-h-screen"}`}
      style={{ background }}
    >
      {/* soft glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(60% 80% at 50% 20%, ${palette}22, transparent 70%)`,
        }}
      />

      {/* music */}
      {gift.musicUrl ? (
        <>
          <audio ref={audioRef} src={gift.musicUrl} loop preload="none" muted={muted} />
          <button
            onClick={toggleMusic}
            className="absolute right-3 top-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-2 text-[11px] font-medium text-foreground shadow-soft backdrop-blur"
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            <Music size={12} />
            {playing ? "Playing" : "Play music"}
            {playing ? (
              <span onClick={(e) => { e.stopPropagation(); if (audioRef.current) audioRef.current.muted = !muted; setMuted(!muted); }}>
                {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              </span>
            ) : null}
          </button>
        </>
      ) : null}

      <div className="relative z-10 flex min-h-[inherit] items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {stage === "closed" && <Envelope key="env" gift={gift} palette={palette} />}
          {stage === "opening" && <Envelope key="open" gift={gift} palette={palette} opening />}
          {stage === "letter" && (
            <Letter key="letter" gift={gift} palette={palette} compact={compact} onSkip={() => setStage("gallery")} />
          )}
          {stage === "gallery" && (
            <Gallery key="gal" gift={gift} palette={palette} compact={compact} onSkip={() => setStage("finale")} />
          )}
          {stage === "finale" && <Finale key="fin" gift={gift} palette={palette} compact={compact} />}
        </AnimatePresence>
      </div>

      {/* replay */}
      {stage === "finale" && (
        <button
          onClick={() => setStage("closed")}
          className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium shadow-soft"
        >
          ↻ Replay
        </button>
      )}
    </div>
  );
}

function Envelope({ gift, palette, opening }: { gift: Gift; palette: string; opening?: boolean }) {
  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative h-[260px] w-[300px] rounded-md shadow-plush"
      style={{ background: "oklch(0.96 0.04 15)" }}
    >
      <motion.span
        initial={{ rotateX: 0 }}
        animate={{ rotateX: opening ? -160 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "top", transformPerspective: 700, background: palette }}
        className="absolute inset-x-0 top-0 block h-1/2 origin-top rounded-t-md"
      />
      <span className="absolute inset-0 grid place-items-center">
        <Heart size={36} className="text-white drop-shadow" fill="currentColor" />
      </span>
      <p
        className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-script text-lg text-foreground/70"
        style={{ fontFamily: "var(--font-script)" }}
      >
        for {gift.recipientName || "you"}
      </p>
    </motion.button>
  );
}

function Letter({
  gift,
  palette,
  compact,
  onSkip,
}: {
  gift: Gift;
  palette: string;
  compact: boolean;
  onSkip: () => void;
}) {
  const words = (gift.message || "").split(" ").filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full ${compact ? "max-w-[420px]" : "max-w-xl"} rounded-2xl bg-white/95 p-7 shadow-plush`}
    >
      <span className="washi-tape -top-3 left-8 -rotate-6" />
      <p className="font-script text-xl" style={{ color: palette, fontFamily: "var(--font-script)" }}>
        Dear {gift.recipientName || "you"},
      </p>
      <p
        className="mt-4 text-[15px] leading-relaxed text-foreground/85"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.3 }}
            className="mr-1.5 inline-block"
          >
            {w}
          </motion.span>
        ))}
        {!words.length && (
          <span className="italic text-foreground/40">your message will appear here…</span>
        )}
      </p>
      <p className="mt-6 text-right font-script text-lg text-foreground/70">
        — {gift.senderName || "someone who loves you"}
      </p>
      <button
        onClick={onSkip}
        className="absolute bottom-3 right-4 text-[11px] text-muted-foreground hover:text-foreground"
      >
        skip →
      </button>
    </motion.div>
  );
}

function Gallery({
  gift,
  palette,
  compact,
  onSkip,
}: {
  gift: Gift;
  palette: string;
  compact: boolean;
  onSkip: () => void;
}) {
  const photos = gift.photos.length ? gift.photos : [];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={`relative ${compact ? "h-[340px] w-full" : "h-[460px] w-full max-w-3xl"}`}
    >
      <p
        className="mb-4 text-center font-script text-2xl"
        style={{ color: palette, fontFamily: "var(--font-script)" }}
      >
        moments with you
      </p>
      <div className="relative mx-auto h-[calc(100%-2rem)] w-full">
        {photos.length === 0 ? (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            <span>upload photos to fill this page ✿</span>
          </div>
        ) : (
          photos.slice(0, 6).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: [-6, 4, -3, 5, -4, 3][i % 6] }}
              transition={{ delay: 0.15 * i, type: "spring", stiffness: 120 }}
              className="polaroid absolute"
              style={{
                width: compact ? 130 : 170,
                left: `${(i * 16) % 70 + 5}%`,
                top: `${(i * 22) % 50 + 5}%`,
                zIndex: 10 + i,
              }}
            >
              <span className="washi-tape -top-2 left-3 -rotate-12" />
              <img src={src} alt="" className="block aspect-square w-full rounded object-cover" />
            </motion.div>
          ))
        )}
      </div>
      <button
        onClick={onSkip}
        className="absolute bottom-0 right-2 text-[11px] text-muted-foreground hover:text-foreground"
      >
        skip →
      </button>
    </motion.div>
  );
}

function Finale({ gift, palette, compact }: { gift: Gift; palette: string; compact: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative text-center"
    >
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-3 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            background: i % 2 ? palette : "var(--birthday)",
          }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: Math.cos((i / 24) * Math.PI * 2) * (compact ? 120 : 200),
            y: Math.sin((i / 24) * Math.PI * 2) * (compact ? 120 : 200),
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
      <Heart size={compact ? 64 : 96} className="mx-auto" style={{ color: palette }} fill="currentColor" />
      <p
        className={`mt-5 ${compact ? "text-2xl" : "text-4xl"} font-semibold`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        with love,
      </p>
      <p
        className={`font-script ${compact ? "text-3xl" : "text-5xl"}`}
        style={{ color: palette, fontFamily: "var(--font-script)" }}
      >
        {gift.senderName || "you"}
      </p>
    </motion.div>
  );
}
