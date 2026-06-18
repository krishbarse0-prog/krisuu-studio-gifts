import catRose from "@/assets/stickers/cat-rose.png.asset.json";
import catHearts from "@/assets/stickers/cat-hearts.png.asset.json";
import catParty from "@/assets/stickers/cat-party.png.asset.json";
import catHug from "@/assets/stickers/cat-hug.png.asset.json";
import catSleepy from "@/assets/stickers/cat-sleepy.png.asset.json";
import catShy from "@/assets/stickers/cat-shy.png.asset.json";
import catLove from "@/assets/stickers/cat-love.png.asset.json";
import bunnyTiny from "@/assets/stickers/bunny-tiny.png.asset.json";
import type { Category } from "./templates";

export const STICKERS = {
  rose: catRose.url,
  hearts: catHearts.url,
  party: catParty.url,
  hug: catHug.url,
  sleepy: catSleepy.url,
  shy: catShy.url,
  love: catLove.url,
  bunny: bunnyTiny.url,
} as const;

export type StickerKey = keyof typeof STICKERS;

// Per-category sticker sets (main + supporting)
export const CATEGORY_STICKERS: Record<Category, StickerKey[]> = {
  love: ["rose", "hearts", "love", "shy"],
  birthday: ["party", "love", "hearts", "bunny"],
  friendship: ["hug", "hearts", "bunny", "love"],
  memory: ["sleepy", "bunny", "shy", "hearts"],
  proposal: ["rose", "shy", "love", "hearts"],
};

export type StickerPlacement = {
  key: StickerKey;
  // % positions relative to card
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number; // px width
  rotate: number;
  z?: number;
  driftDelay?: number;
};

// Hand-placed, off-grid sticker arrangements (4 per card, varied)
export const CARD_LAYOUTS: StickerPlacement[][] = [
  [
    { key: "rose", top: "-18px", left: "-22px", size: 96, rotate: -14, z: 3 },
    { key: "hearts", bottom: "-26px", right: "-18px", size: 78, rotate: 12, z: 2, driftDelay: 0.4 },
    { key: "love", top: "30%", right: "-30px", size: 56, rotate: 8, z: 1, driftDelay: 0.9 },
    { key: "shy", bottom: "20%", left: "-26px", size: 52, rotate: -10, z: 1, driftDelay: 1.4 },
  ],
  [
    { key: "party", top: "-26px", right: "-18px", size: 100, rotate: 16, z: 3 },
    { key: "hearts", bottom: "-20px", left: "-20px", size: 72, rotate: -12, z: 2, driftDelay: 0.6 },
    { key: "love", top: "55%", left: "-28px", size: 54, rotate: -6, z: 1, driftDelay: 1.1 },
    { key: "bunny", top: "-14px", left: "40%", size: 48, rotate: -8, z: 1, driftDelay: 1.6 },
  ],
  [
    { key: "hug", top: "-22px", left: "-24px", size: 104, rotate: -10, z: 3 },
    { key: "hearts", top: "-12px", right: "-12px", size: 60, rotate: 14, z: 2, driftDelay: 0.5 },
    { key: "bunny", bottom: "-22px", right: "10%", size: 64, rotate: 8, z: 2, driftDelay: 1 },
    { key: "love", bottom: "30%", left: "-22px", size: 48, rotate: -12, z: 1, driftDelay: 1.5 },
  ],
  [
    { key: "sleepy", bottom: "-24px", right: "-22px", size: 110, rotate: 10, z: 3 },
    { key: "bunny", top: "-18px", left: "-16px", size: 70, rotate: -14, z: 2, driftDelay: 0.7 },
    { key: "hearts", top: "20%", right: "-24px", size: 50, rotate: 10, z: 1, driftDelay: 1.2 },
    { key: "shy", top: "-10px", right: "30%", size: 46, rotate: -6, z: 1, driftDelay: 1.7 },
  ],
];

export function layoutForIndex(i: number) {
  return CARD_LAYOUTS[i % CARD_LAYOUTS.length];
}
