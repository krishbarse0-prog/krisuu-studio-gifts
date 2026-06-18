import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { STICKERS, type StickerKey } from "@/lib/stickers";

type Props = {
  sticker: StickerKey;
  size?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
  driftDelay?: number;
  interactive?: boolean;
};

export function Sticker({
  sticker,
  size = 80,
  rotate = 0,
  className = "",
  style,
  driftDelay = 0,
  interactive = true,
}: Props) {
  return (
    <motion.img
      src={STICKERS[sticker]}
      alt=""
      draggable={false}
      width={size}
      height={size}
      loading="lazy"
      style={{
        width: size,
        height: "auto",
        filter:
          "drop-shadow(0 6px 10px rgba(0,0,0,0.18)) drop-shadow(0 2px 3px rgba(0,0,0,0.1))",
        ...style,
      }}
      initial={{ scale: 0.6, opacity: 0, rotate }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: [rotate - 2, rotate + 2, rotate - 2],
        y: [0, -6, 0],
      }}
      transition={{
        scale: { type: "spring", stiffness: 180, damping: 14, delay: driftDelay * 0.1 },
        opacity: { duration: 0.4, delay: driftDelay * 0.1 },
        rotate: { duration: 4 + driftDelay, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 3.5 + driftDelay, repeat: Infinity, ease: "easeInOut", delay: driftDelay },
      }}
      whileHover={interactive ? { scale: 1.18, rotate: rotate + 8, transition: { type: "spring", stiffness: 300 } } : undefined}
      className={`select-none ${className}`}
    />
  );
}
