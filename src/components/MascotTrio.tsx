import { motion } from "framer-motion";
import { Sticker } from "./Sticker";
import type { StickerKey } from "@/lib/stickers";

type StickerSpot = {
  key: StickerKey;
  size: number;
  rotate: number;
  x: number; // % offset from center
  y: number;
  delay: number;
  z: number;
};

const spots: StickerSpot[] = [
  { key: "rose", size: 170, rotate: -14, x: -34, y: 2, delay: 0, z: 3 },
  { key: "hug", size: 200, rotate: 4, x: 0, y: -4, delay: 0.15, z: 4 },
  { key: "party", size: 160, rotate: 12, x: 34, y: 4, delay: 0.3, z: 3 },
  { key: "bunny", size: 90, rotate: -10, x: -56, y: 38, delay: 0.5, z: 2 },
  { key: "love", size: 110, rotate: 10, x: 54, y: 36, delay: 0.6, z: 2 },
  { key: "hearts", size: 80, rotate: -6, x: -18, y: -42, delay: 0.7, z: 5 },
  { key: "shy", size: 88, rotate: 14, x: 22, y: -40, delay: 0.8, z: 5 },
];

export function MascotTrio() {
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-2xl sm:h-[360px]">
      {/* washi tape decorations */}
      <span className="washi-tape absolute left-[18%] top-2 -rotate-6 z-[10]" />
      <span
        className="washi-tape absolute right-[14%] top-6 rotate-12 z-[10] hidden sm:block"
        style={{
          background:
            "repeating-linear-gradient(45deg, var(--washi-mint) 0 8px, oklch(0.95 0.04 165 / 70%) 8px 16px)",
        }}
      />

      {spots.map((s, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{ zIndex: s.z }}
          initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: s.delay, type: "spring", stiffness: 120, damping: 14 }}
        >
          <div
            style={{
              transform: `translate(${s.x * 1}%, ${s.y * 1}%) translate(-50%, -50%)`,
            }}
          >
            <Sticker
              sticker={s.key}
              size={s.size}
              rotate={s.rotate}
              driftDelay={i * 0.2}
            />
          </div>
        </motion.div>
      ))}

      {/* doodle hearts/stars */}
      <span className="absolute left-[10%] top-[14%] font-script text-3xl text-love/60 rotate-[-12deg]">♡</span>
      <span className="absolute right-[8%] top-[24%] font-script text-2xl text-proposal/60 rotate-[10deg]">✦</span>
      <span className="absolute left-[18%] bottom-[6%] font-script text-2xl text-birthday/70">✿</span>
      <span className="absolute right-[16%] bottom-[10%] font-script text-3xl text-friendship/60 rotate-[8deg]">★</span>
    </div>
  );
}
