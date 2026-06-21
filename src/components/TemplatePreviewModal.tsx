import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Template } from "@/lib/templates";

export function TemplatePreviewModal({
  template,
  onClose,
}: {
  template: Template | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {template && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-plush"
            style={{ background: template.gradient }}
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-foreground shadow-soft hover:bg-white"
            >
              <X size={16} />
            </button>

            <div className="grid aspect-[4/5] place-items-center p-6">
              <PreviewScene template={template} />
            </div>

            <div className="space-y-3 bg-card/95 p-5 backdrop-blur">
              <p className="font-script text-2xl text-love">{template.title}</p>
              <p className="text-sm text-muted-foreground">{template.tagline}</p>
              <div className="flex gap-2 pt-2">
                <Link
                  to="/create"
                  search={{ template: template.slug }}
                  onClick={onClose}
                  className="flex-1 rounded-full bg-foreground py-3 text-center text-sm font-medium text-background hover:opacity-90"
                >
                  Use this template
                </Link>
                <Link
                  to="/template/$slug"
                  params={{ slug: template.slug }}
                  onClick={onClose}
                  className="rounded-full border border-border bg-card px-4 py-3 text-sm hover:bg-muted"
                >
                  Details
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PreviewScene({ template }: { template: Template }) {
  switch (template.preview) {
    case "envelope":
      return <EnvelopeScene />;
    case "giftbox":
      return <GiftBoxScene />;
    case "scrapbook":
      return <ScrapbookScene />;
    case "moonlit":
      return <MoonlitScene />;
    case "balloons":
      return <BalloonsScene />;
  }
}

function EnvelopeScene() {
  return (
    <div className="relative h-64 w-56">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="absolute inset-x-0 bottom-0 h-44 rounded-md bg-[oklch(0.96_0.04_15)] shadow-plush"
      >
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -150 }}
          transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
          style={{ transformOrigin: "top", transformPerspective: 600 }}
          className="absolute inset-x-0 top-0 h-1/2 origin-top rounded-t-md bg-love"
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -80, opacity: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          className="absolute left-1/2 top-4 w-44 -translate-x-1/2 rounded-md bg-white p-3 text-center text-xs shadow-soft"
        >
          <p className="font-script text-base text-love">my dearest…</p>
          <Typewriter text="thinking of you, always." className="mt-1 text-foreground/70" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function GiftBoxScene() {
  return (
    <div className="relative h-64 w-56">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 rounded-lg bg-birthday shadow-plush"
      >
        <span className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 bg-love/80" />
        <span className="absolute inset-y-0 left-1/2 w-3 -translate-x-1/2 bg-love/80" />
      </motion.div>
      <motion.div
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: -40, rotate: -18 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
        className="absolute bottom-32 left-1/2 h-10 w-44 -translate-x-1/2 rounded-md bg-love shadow-soft"
      >
        <span className="absolute left-1/2 top-1/2 h-4 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-love/70" />
      </motion.div>
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: 50, x: 0, opacity: 0 }}
          animate={{ y: -120 - (i % 4) * 20, x: (i - 7) * 14, opacity: [0, 1, 0] }}
          transition={{ delay: 0.8 + i * 0.06, duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
          className="absolute bottom-32 left-1/2 h-2 w-2 rounded-full"
          style={{
            background:
              ["var(--love)", "var(--birthday)", "var(--friendship)", "var(--memory)", "var(--proposal)"][i % 5],
          }}
        />
      ))}
    </div>
  );
}

function ScrapbookScene() {
  return (
    <div className="relative h-64 w-56">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ rotate: 0, x: 0, opacity: 0, y: 20 }}
          animate={{ rotate: [-6, 4, -3][i], x: [-12, 0, 14][i], opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.25, type: "spring", stiffness: 120 }}
          className="polaroid absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: i }}
        >
          <span className="washi-tape -top-2 left-4 -rotate-12" />
          <div
            className="grid aspect-square place-items-center rounded text-5xl"
            style={{ background: ["var(--memory-soft)","var(--love-soft)","var(--friendship-soft)"][i] }}
          >
            {["🌿","💗","✨"][i]}
          </div>
          <p className="mt-2 text-center font-script text-sm text-foreground/70">
            {["a tuesday in june", "our spot", "you laughed"][i]}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function MoonlitScene() {
  return (
    <div className="relative h-64 w-56 overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(180deg, oklch(0.35 0.06 290), oklch(0.55 0.08 320))" }}>
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute right-6 top-6 h-16 w-16 rounded-full bg-[oklch(0.97_0.04_85)] shadow-[0_0_60px_oklch(0.97_0.06_85/60%)]"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 260, opacity: [0, 1, 0], x: (i % 2 ? 1 : -1) * (i * 4) }}
          transition={{ delay: i * 0.3, duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute h-3 w-3 rounded-[60%_40%_55%_45%/55%_60%_40%_45%]"
          style={{ left: `${(i * 13) % 100}%`, background: "oklch(0.92 0.05 305 / 80%)" }}
        />
      ))}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-script text-2xl text-white drop-shadow"
      >
        will you?
      </motion.p>
    </div>
  );
}

function BalloonsScene() {
  const colors = ["var(--love)","var(--birthday)","var(--friendship)","var(--proposal)","var(--memory)"];
  return (
    <div className="relative h-64 w-56">
      {colors.map((c, i) => (
        <motion.div
          key={i}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: [-2, -10, -2], opacity: 1 }}
          transition={{ delay: 0.1 * i, duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-16 w-12 rounded-full shadow-soft"
          style={{
            background: c,
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 2) * 12}%`,
          }}
        >
          <span className="absolute left-1/2 top-full h-12 w-px -translate-x-1/2 bg-foreground/30" />
        </motion.div>
      ))}
    </div>
  );
}

function Typewriter({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 1.8, duration: 1.6, ease: "easeOut" }}
      className={`inline-block overflow-hidden whitespace-nowrap align-bottom ${className ?? ""}`}
    >
      {text}
    </motion.span>
  );
}
