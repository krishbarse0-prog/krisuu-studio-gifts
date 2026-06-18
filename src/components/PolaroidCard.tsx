import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import type { Template } from "@/lib/templates";
import { CATEGORY_LABEL } from "@/lib/templates";

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
  const rx = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 150, damping: 14 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 150, damping: 14 });

  return (
    <motion.button
      onClick={() => onOpen(template)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800, rotate: template.tilt }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
      className="polaroid group relative w-[78vw] max-w-[280px] shrink-0 text-left sm:w-[260px]"
    >
      {/* washi tape */}
      <span className="washi-tape -top-3 left-6 -rotate-12" />
      <span className="washi-tape -top-2 right-4 rotate-12 hidden sm:block"
        style={{ background:
          "repeating-linear-gradient(45deg, var(--washi-mint) 0 8px, oklch(0.95 0.04 165 / 70%) 8px 16px)" }} />

      {/* image area */}
      <div
        className="relative grid aspect-square place-items-center overflow-hidden rounded-md"
        style={{ background: template.gradient }}
      >
        <motion.div
          className="text-7xl drop-shadow-[0_8px_14px_rgba(0,0,0,0.12)]"
          animate={{ y: [0, -6, 0], rotate: [0, 4, -3, 0] }}
          transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
        >
          {template.emoji}
        </motion.div>
        {/* sticker */}
        <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${catColor[template.category]}`}>
          {CATEGORY_LABEL[template.category]}
        </span>
        {/* sparkle */}
        <span className="absolute left-2 top-2 text-base animate-sparkle">✦</span>
      </div>

      {/* caption */}
      <div className="mt-3 px-1">
        <p className="font-hand text-xl leading-tight text-foreground" style={{ fontFamily: "var(--font-script)" }}>
          {template.title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{template.tagline}</p>
      </div>

      {/* heart */}
      <span className="absolute -bottom-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-card shadow-soft transition group-hover:scale-110">
        <Heart size={15} className="text-love" fill="currentColor" />
      </span>
    </motion.button>
  );
}
