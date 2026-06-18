import { motion } from "framer-motion";
import { HERO_STICKERS } from "@/lib/stickers";
import { Sticker } from "./Sticker";

export function MascotTrio() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-4xl overflow-visible sm:h-[430px]">
      <div className="absolute inset-0 rounded-[40px] border border-border/50 bg-card/35 backdrop-blur-[2px]" />

      <span className="washi-tape absolute left-[10%] top-3 z-[10] -rotate-6" />
      <span className="washi-tape absolute right-[12%] top-4 z-[10] rotate-[9deg]" />
      <span className="washi-tape absolute bottom-6 left-[18%] z-[10] -rotate-[10deg] opacity-80" />

      {HERO_STICKERS.map((sticker, index) => (
        <motion.div
          key={`${sticker.key}-${index}`}
          className="absolute"
          style={{
            top: sticker.top,
            left: sticker.left,
            right: sticker.right,
            bottom: sticker.bottom,
            zIndex: sticker.z ?? 1,
          }}
          initial={{ opacity: 0, scale: 0.72, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.05, type: "spring", stiffness: 140, damping: 14 }}
        >
          <Sticker
            sticker={sticker.key}
            size={sticker.size}
            rotate={sticker.rotate}
            driftDelay={index * 0.25}
            interactive={false}
          />
        </motion.div>
      ))}

      <span className="absolute left-[23%] top-[20%] font-hand text-lg text-foreground/55 rotate-[-10deg]">so cute</span>
      <span className="absolute right-[18%] top-[18%] font-hand text-lg text-foreground/55 rotate-[8deg]">for you ♡</span>
      <span className="absolute left-[42%] bottom-[12%] font-hand text-lg text-foreground/50 rotate-[-4deg]">saved to board</span>
    </div>
  );
}
