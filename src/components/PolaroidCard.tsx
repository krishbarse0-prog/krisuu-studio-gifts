import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import type { Template } from "@/lib/templates";
import { CATEGORY_LABEL } from "@/lib/templates";
import { CATEGORY_STICKERS, layoutForIndex } from "@/lib/stickers";
import { Sticker } from "./Sticker";
import { StickerCluster } from "./StickerCluster";

const catColor: Record<Template["category"], string> = {
  love: "bg-love text-primary-foreground",
  birthday: "bg-birthday text-foreground",
  friendship: "bg-friendship text-foreground",
  memory: "bg-memory text-foreground",
  proposal: "bg-proposal text-primary-foreground",
};

export function PolaroidCard({
  template,
  onOpen,
  index = 0,
}: {
  template: Template;
  onOpen: (t: Template) => void;
  index?: number;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 150, damping: 14 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 150, damping: 14 });

  const mainSticker = CATEGORY_STICKERS[template.category][0];
  const cluster = layoutForIndex(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
      style={{ rotate: template.tilt }}
      className="relative w-[78vw] max-w-[280px] shrink-0 sm:w-[260px]"
    >
      {/* Outside-card sticker cluster (scrapbook feel) */}
      <StickerCluster placements={cluster} />

      <motion.button
        onClick={() => onOpen(template)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left - r.width / 2);
          my.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="polaroid group relative block w-full text-left"
      >
        {/* washi tapes */}
        <span className="washi-tape -top-3 left-6 -rotate-12 z-[5]" />
        <span
          className="washi-tape -top-2 right-4 rotate-12 hidden sm:block z-[5]"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--washi-mint) 0 8px, oklch(0.95 0.04 165 / 70%) 8px 16px)",
          }}
        />

        {/* image area */}
        <div
          className="relative grid aspect-square place-items-center overflow-hidden rounded-md"
          style={{ background: template.gradient }}
        >
          {/* paper grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(0,0,0,0.06) 0 1px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.05) 0 1px, transparent 2px)",
              backgroundSize: "12px 12px, 18px 18px",
            }}
          />

          {/* main sticker (in-card hero) */}
          <Sticker sticker={mainSticker} size={170} rotate={-4} driftDelay={0.2} />

          {/* tiny doodles */}
          <span className="absolute left-3 bottom-3 font-script text-lg text-foreground/40">♡</span>
          <span className="absolute right-3 bottom-3 font-script text-lg text-foreground/40">✿</span>

          {/* category chip */}
          <span
            className={`absolute right-2 top-2 z-[6] rounded-full px-2 py-0.5 text-[10px] font-medium shadow-soft ${catColor[template.category]}`}
          >
            {CATEGORY_LABEL[template.category]}
          </span>
          <span className="absolute left-2 top-2 z-[6] text-base animate-sparkle">✦</span>
        </div>

        {/* caption */}
        <div className="mt-3 px-1">
          <p
            className="font-hand text-xl leading-tight text-foreground"
            style={{ fontFamily: "var(--font-script)" }}
          >
            {template.title}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">{template.tagline}</p>
        </div>

        {/* heart badge */}
        <span className="absolute -bottom-3 -right-3 z-[7] grid h-9 w-9 place-items-center rounded-full bg-card shadow-soft transition group-hover:scale-110">
          <Heart size={15} className="text-love" fill="currentColor" />
        </span>
      </motion.button>
    </motion.div>
  );
}
