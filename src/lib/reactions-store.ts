// Local reactions + wish wall for public gift pages.
export type Reaction = { emoji: string; at: number };
export type Wish = { id: string; name: string; message: string; at: number };
export type GiftSocial = { reactions: Reaction[]; wishes: Wish[]; hearts: number };

const KEY = "krisuu:social:v1";

function readAll(): Record<string, GiftSocial> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(window.localStorage.getItem(KEY) ?? "{}"); }
  catch { return {}; }
}
function writeAll(d: Record<string, GiftSocial>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(d));
  window.dispatchEvent(new CustomEvent("krisuu:social:changed"));
}

export function getSocial(giftId: string): GiftSocial {
  return readAll()[giftId] ?? { reactions: [], wishes: [], hearts: 0 };
}
export function addHeart(giftId: string) {
  const all = readAll();
  const cur = all[giftId] ?? { reactions: [], wishes: [], hearts: 0 };
  cur.hearts += 1;
  all[giftId] = cur;
  writeAll(all);
  return cur;
}
export function addReaction(giftId: string, emoji: string) {
  const all = readAll();
  const cur = all[giftId] ?? { reactions: [], wishes: [], hearts: 0 };
  cur.reactions = [{ emoji, at: Date.now() }, ...cur.reactions].slice(0, 50);
  all[giftId] = cur;
  writeAll(all);
  return cur;
}
export function addWish(giftId: string, name: string, message: string) {
  const all = readAll();
  const cur = all[giftId] ?? { reactions: [], wishes: [], hearts: 0 };
  cur.wishes = [
    { id: Math.random().toString(36).slice(2, 9), name: name || "anon", message, at: Date.now() },
    ...cur.wishes,
  ].slice(0, 100);
  all[giftId] = cur;
  writeAll(all);
  return cur;
}
