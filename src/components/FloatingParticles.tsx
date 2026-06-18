import { motion } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";

const items = [
  { Icon: Heart, color: "text-love", left: "8%", top: "18%", size: 22, delay: 0 },
  { Icon: Sparkles, color: "text-birthday", left: "18%", top: "62%", size: 18, delay: 0.4 },
  { Icon: Star, color: "text-proposal", left: "78%", top: "22%", size: 20, delay: 0.8 },
  { Icon: Heart, color: "text-love", left: "88%", top: "70%", size: 16, delay: 1.2 },
  { Icon: Sparkles, color: "text-friendship", left: "45%", top: "10%", size: 14, delay: 0.6 },
  { Icon: Star, color: "text-memory", left: "60%", top: "78%", size: 18, delay: 1 },
  { Icon: Heart, color: "text-proposal", left: "30%", top: "30%", size: 12, delay: 1.4 },
  { Icon: Sparkles, color: "text-love", left: "70%", top: "48%", size: 16, delay: 0.2 },
];

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ Icon, color, left, top, size, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{ left, top }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -22, 0],
            x: [0, i % 2 ? 10 : -10, 0],
            rotate: [0, 12, -8, 0],
            opacity: [0.4, 0.95, 0.4],
          }}
          transition={{ duration: 6 + (i % 3), delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={size} fill="currentColor" strokeWidth={1.2} />
        </motion.div>
      ))}
      {/* sakura petals */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={`p${i}`}
          className="absolute h-2.5 w-3 rounded-[60%_40%_55%_45%/55%_60%_40%_45%]"
          style={{
            left: `${(i * 11 + 5) % 95}%`,
            top: `-20px`,
            background:
              i % 2
                ? "oklch(0.9 0.06 15 / 80%)"
                : "oklch(0.92 0.05 305 / 75%)",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, 30, -20, 10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 14 + (i % 5) * 2,
            delay: i * 1.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
