import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Eye, Clock, Play, Sparkles, Bookmark, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Template } from "@/lib/templates";
import { CATEGORY_LABEL } from "@/lib/templates";
import { TEMPLATE_PRIMARY_STICKER, layoutForTemplate } from "@/lib/stickers";
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
}: {
  template: Template;
  onOpen: (t: Template) => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [5, -5]), { stiffness: 150, damping: 14 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-5, 5]), { stiffness: 150, damping: 14 });

  const mainSticker = TEMPLATE_PRIMARY_STICKER[template.id] ?? "roseKitten";
  // Reduce sticker density ~40%: keep just 2 accent stickers around the card
  const cluster = layoutForTemplate(template.id).slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      style={{ rotate: template.tilt }}
      className="relative w-[78vw] max-w-[300px] shrink-0 sm:w-[300px]"
    >
      <StickerCluster placements={cluster} />

      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left - r.width / 2);
          my.set(e.clientY - r.top - r.height / 2);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
        whileHover={{ y: -6 }}
        className="polaroid group relative block w-full text-left"
      >
        <span className="washi-tape -top-3 left-6 z-[5] -rotate-12" />

        <button
          onClick={() => onOpen(template)}
          aria-label={`Preview ${template.title}`}
          className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-md"
          style={{ background: template.gradient }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.38),transparent_38%,rgba(0,0,0,0.06))]" />

          <Sticker sticker={mainSticker} size={170} rotate={-3} driftDelay={0.2} />

          <span
            className={`absolute left-2 top-2 z-[6] rounded-full px-2 py-0.5 text-[10px] font-medium shadow-soft ${catColor[template.category]}`}
          >
            {CATEGORY_LABEL[template.category]}
          </span>

          <span className="absolute right-2 top-2 z-[6] inline-flex items-center gap-1 rounded-full bg-foreground/75 px-2 py-0.5 text-[10px] font-medium text-background backdrop-blur">
            <Clock size={9} /> {template.duration}
          </span>

          {template.trending && (
            <span className="absolute bottom-2 left-2 z-[6] inline-flex items-center gap-1 rounded-full bg-love px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-soft">
              <Flame size={10} fill="currentColor" /> Trending
            </span>
          )}

          <button
            aria-label="Save"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 right-2 z-[6] grid h-7 w-7 place-items-center rounded-full bg-white/90 text-foreground/70 shadow-soft transition hover:scale-110 hover:text-love"
          >
            <Bookmark size={12} />
          </button>

          {/* hover play */}
          <span className="absolute inset-0 grid place-items-center bg-foreground/0 opacity-0 transition group-hover:bg-foreground/15 group-hover:opacity-100">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 shadow-plush">
              <Play size={18} className="ml-0.5 text-foreground" fill="currentColor" />
            </span>
          </span>
        </button>

        {/* meta */}
        <div className="mt-3 px-1">
          <p
            className="truncate text-[15px] font-semibold leading-tight text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {template.title}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{template.occasion}</p>

          <div className="mt-2 flex items-center gap-3 text-[10.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Eye size={11} /> {template.views}
            </span>
            <span className="inline-flex items-center gap-1">
              <Heart size={11} className="text-love" fill="currentColor" /> {template.loves}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bookmark size={11} /> {template.saves}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => onOpen(template)}
              className="flex-1 rounded-full border border-border bg-background/70 py-2 text-[11px] font-medium text-foreground hover:bg-background"
            >
              Preview
            </button>
            <Link
              to="/create"
              search={{ template: template.slug }}
              className="flex-[1.1] inline-flex items-center justify-center gap-1 rounded-full bg-foreground py-2 text-[11px] font-medium text-background hover:opacity-90"
            >
              <Sparkles size={11} /> Create
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
