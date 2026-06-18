import roseKitten from "@/assets/stickers/s-rose-kitten.png";
import heartEyesCat from "@/assets/stickers/s-heart-eyes-cat.png";
import blushCat from "@/assets/stickers/s-blush-cat.png";
import cryingCat from "@/assets/stickers/s-crying-cat.png";
import partyCat from "@/assets/stickers/s-party-cat.png";
import hugCats from "@/assets/stickers/s-hug-cats.png";
import sleepyCat from "@/assets/stickers/s-sleepy-cat.png";
import kissCat from "@/assets/stickers/s-kiss-cat.png";
import heartHoldCat from "@/assets/stickers/s-heart-hold-cat.png";
import angryCat from "@/assets/stickers/s-angry-cat.png";
import bunnyFlower from "@/assets/stickers/s-bunny-flower.png";
import hamster from "@/assets/stickers/s-hamster.png";
import heartPuffy from "@/assets/stickers/s-heart-puffy.png";
import heartsTrio from "@/assets/stickers/s-hearts-trio.png";
import starSticker from "@/assets/stickers/s-star.png";
import flowerDoodle from "@/assets/stickers/s-flower-doodle.png";
import sparkleSticker from "@/assets/stickers/s-sparkle.png";

export const STICKERS = {
  roseKitten,
  heartEyesCat,
  blushCat,
  cryingCat,
  partyCat,
  hugCats,
  sleepyCat,
  kissCat,
  heartHoldCat,
  angryCat,
  bunnyFlower,
  hamster,
  heartPuffy,
  heartsTrio,
  starSticker,
  flowerDoodle,
  sparkleSticker,
} as const;

export type StickerKey = keyof typeof STICKERS;

export type StickerPlacement = {
  key: StickerKey;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  rotate: number;
  z?: number;
  driftDelay?: number;
};

export const HERO_STICKERS: StickerPlacement[] = [
  { key: "roseKitten", top: "4%", left: "10%", size: 150, rotate: -10, z: 4 },
  { key: "heartEyesCat", top: "12%", left: "36%", size: 140, rotate: 8, z: 5 },
  { key: "hugCats", top: "9%", right: "13%", size: 154, rotate: 10, z: 4 },
  { key: "partyCat", top: "39%", left: "3%", size: 124, rotate: -12, z: 3 },
  { key: "blushCat", top: "43%", left: "31%", size: 132, rotate: -4, z: 6 },
  { key: "sleepyCat", top: "42%", right: "31%", size: 138, rotate: 8, z: 3 },
  { key: "bunnyFlower", top: "36%", right: "5%", size: 112, rotate: 6, z: 4 },
  { key: "heartsTrio", bottom: "10%", left: "18%", size: 72, rotate: -6, z: 5 },
  { key: "heartPuffy", bottom: "8%", left: "48%", size: 76, rotate: 4, z: 5 },
  { key: "starSticker", bottom: "14%", right: "20%", size: 64, rotate: 8, z: 5 },
  { key: "sparkleSticker", top: "6%", right: "34%", size: 46, rotate: -8, z: 6 },
  { key: "flowerDoodle", bottom: "18%", right: "40%", size: 58, rotate: -10, z: 4 },
];

export const TEMPLATE_PRIMARY_STICKER: Record<string, StickerKey> = {
  t1: "roseKitten",
  t2: "partyCat",
  t3: "sleepyCat",
  t4: "blushCat",
  t5: "hugCats",
  t6: "heartEyesCat",
  t7: "heartHoldCat",
  t8: "kissCat",
};

export const TEMPLATE_STICKER_LAYOUTS: Record<string, StickerPlacement[]> = {
  t1: [
    { key: "roseKitten", top: "-22px", left: "-24px", size: 94, rotate: -12, z: 4 },
    { key: "blushCat", top: "8%", right: "-24px", size: 70, rotate: 10, z: 2 },
    { key: "heartPuffy", bottom: "-18px", left: "-16px", size: 56, rotate: -8, z: 3 },
    { key: "heartsTrio", bottom: "-26px", right: "-22px", size: 64, rotate: 10, z: 4 },
    { key: "sparkleSticker", top: "-14px", left: "44%", size: 36, rotate: -4, z: 5 },
  ],
  t2: [
    { key: "partyCat", top: "-26px", right: "-16px", size: 100, rotate: 10, z: 4 },
    { key: "heartEyesCat", top: "44%", left: "-24px", size: 64, rotate: -10, z: 2 },
    { key: "starSticker", top: "-12px", left: "38%", size: 46, rotate: 6, z: 4 },
    { key: "sparkleSticker", bottom: "-16px", right: "18%", size: 44, rotate: 8, z: 3 },
    { key: "hamster", bottom: "-18px", left: "-12px", size: 62, rotate: -6, z: 3 },
  ],
  t3: [
    { key: "sleepyCat", bottom: "-24px", right: "-20px", size: 110, rotate: 8, z: 4 },
    { key: "cryingCat", top: "-14px", left: "-16px", size: 76, rotate: -8, z: 3 },
    { key: "flowerDoodle", top: "16%", right: "-16px", size: 48, rotate: 10, z: 2 },
    { key: "heartPuffy", bottom: "12%", left: "-18px", size: 48, rotate: -12, z: 3 },
    { key: "sparkleSticker", top: "-12px", left: "42%", size: 36, rotate: -4, z: 5 },
  ],
  t4: [
    { key: "blushCat", top: "-20px", left: "-18px", size: 90, rotate: -10, z: 4 },
    { key: "roseKitten", top: "26%", right: "-30px", size: 84, rotate: 8, z: 3 },
    { key: "heartPuffy", bottom: "-18px", right: "-14px", size: 54, rotate: 10, z: 4 },
    { key: "heartsTrio", top: "-8px", right: "24%", size: 54, rotate: -2, z: 5 },
    { key: "starSticker", bottom: "14%", left: "-16px", size: 42, rotate: -8, z: 2 },
  ],
  t5: [
    { key: "hugCats", top: "-24px", left: "-24px", size: 106, rotate: -8, z: 4 },
    { key: "heartEyesCat", top: "14%", right: "-28px", size: 72, rotate: 8, z: 2 },
    { key: "bunnyFlower", bottom: "-18px", right: "10%", size: 60, rotate: 6, z: 3 },
    { key: "sparkleSticker", bottom: "18%", left: "-14px", size: 42, rotate: -10, z: 3 },
    { key: "heartsTrio", top: "-10px", left: "46%", size: 54, rotate: -4, z: 5 },
  ],
  t6: [
    { key: "heartEyesCat", top: "-24px", left: "-16px", size: 92, rotate: -10, z: 4 },
    { key: "partyCat", bottom: "-22px", right: "-18px", size: 92, rotate: 8, z: 4 },
    { key: "starSticker", top: "-12px", right: "20%", size: 46, rotate: 4, z: 5 },
    { key: "heartPuffy", bottom: "16%", left: "-16px", size: 50, rotate: -8, z: 2 },
    { key: "hamster", top: "46%", right: "-16px", size: 58, rotate: 6, z: 3 },
  ],
  t7: [
    { key: "heartHoldCat", top: "-20px", left: "-18px", size: 92, rotate: -8, z: 4 },
    { key: "sleepyCat", bottom: "-18px", right: "-18px", size: 86, rotate: 8, z: 3 },
    { key: "flowerDoodle", top: "-8px", right: "24%", size: 44, rotate: 8, z: 4 },
    { key: "sparkleSticker", bottom: "18%", left: "-12px", size: 42, rotate: -8, z: 2 },
    { key: "heartsTrio", bottom: "-14px", right: "24%", size: 56, rotate: 2, z: 4 },
  ],
  t8: [
    { key: "kissCat", top: "-20px", right: "-18px", size: 94, rotate: 8, z: 4 },
    { key: "roseKitten", bottom: "-20px", left: "-18px", size: 84, rotate: -10, z: 3 },
    { key: "heartPuffy", top: "-10px", left: "20%", size: 48, rotate: -2, z: 5 },
    { key: "heartsTrio", bottom: "8%", right: "-20px", size: 60, rotate: 10, z: 2 },
    { key: "sparkleSticker", top: "50%", left: "-14px", size: 40, rotate: -12, z: 3 },
  ],
};

export function layoutForTemplate(templateId: string) {
  return TEMPLATE_STICKER_LAYOUTS[templateId] ?? TEMPLATE_STICKER_LAYOUTS.t1;
}
