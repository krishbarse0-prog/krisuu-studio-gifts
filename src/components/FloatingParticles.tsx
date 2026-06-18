import { motion } from "framer-motion";
import { STICKERS } from "@/lib/stickers";

const bgStickers: { key: keyof typeof STICKERS; left: string; top: string; size: number; rotate: number; delay: number; opacity: number }[] = [
  { key: "heartEyesCat", left: "2%", top: "9%", size: 76, rotate: -10, delay: 0, opacity: 0.16 },
  { key: "roseKitten", left: "86%", top: "8%", size: 82, rotate: 10, delay: 0.8, opacity: 0.15 },
  { key: "bunnyFlower", left: "7%", top: "70%", size: 72, rotate: -8, delay: 1.3, opacity: 0.14 },
  { key: "sleepyCat", left: "88%", top: "72%", size: 78, rotate: 8, delay: 1.9, opacity: 0.16 },
  { key: "hamster", left: "45%", top: "84%", size: 60, rotate: -4, delay: 1.1, opacity: 0.12 },
  { key: "heartsTrio", left: "26%", top: "22%", size: 56, rotate: -6, delay: 0.5, opacity: 0.18 },
  { key: "sparkleSticker", left: "67%", top: "18%", size: 42, rotate: 10, delay: 1.6, opacity: 0.2 },
  { key: "flowerDoodle", left: "74%", top: "56%", size: 52, rotate: 10, delay: 2.1, opacity: 0.17 },
];

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bgStickers.map((s, i) => (
        <motion.img
          key={`s${i}`}
          src={STICKERS[s.key]}
          alt=""
          aria-hidden
          className="absolute select-none"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: "auto",
            opacity: s.opacity,
            filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.08))",
          }}
          initial={{ rotate: s.rotate, scale: 0.9 }}
          animate={{
            y: [0, -16, 0],
            x: [0, i % 2 ? 10 : -10, 0],
            rotate: [s.rotate - 3, s.rotate + 3, s.rotate - 3],
          }}
          transition={{ duration: 9 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={`dot${i}`}
          className="absolute rounded-full bg-love/35"
          style={{
            width: i % 3 === 0 ? 8 : 5,
            height: i % 3 === 0 ? 8 : 5,
            left: `${(i * 9 + 6) % 95}%`,
            top: `${(i * 13 + 8) % 88}%`,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </div>
  );
}
