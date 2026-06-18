import { motion } from "framer-motion";
import kiri from "@/assets/kiri-cat.png";
import mochi from "@/assets/mochi-bunny.png";
import kuma from "@/assets/kuma-bear.png";

const mascots = [
  { src: kiri, name: "Kiri", tag: "the love letter keeper", rot: -8, delay: 0 },
  { src: kuma, name: "Kuma", tag: "the memory holder", rot: 0, delay: 0.15 },
  { src: mochi, name: "Mochi", tag: "the birthday dreamer", rot: 9, delay: 0.3 },
];

export function MascotTrio() {
  return (
    <div className="relative flex items-end justify-center gap-2 sm:gap-6">
      {mascots.map((m, i) => (
        <motion.div
          key={m.name}
          initial={{ y: 40, opacity: 0, rotate: m.rot }}
          animate={{ y: 0, opacity: 1, rotate: m.rot }}
          transition={{ delay: m.delay + 0.2, type: "spring", stiffness: 90, damping: 12 }}
          whileHover={{ y: -10, rotate: m.rot + (i % 2 ? 4 : -4) }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className={i === 1 ? "w-32 sm:w-44" : "w-24 sm:w-32"}
          >
            <img
              src={m.src}
              alt={m.name}
              className="h-auto w-full drop-shadow-[0_18px_24px_rgba(255,122,162,0.25)]"
              draggable={false}
            />
          </motion.div>
          <div className="mt-1 text-center">
            <p className="font-script text-base text-love sm:text-lg">{m.name}</p>
            <p className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:block">{m.tag}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
