// Local-first gift store. Persists drafts + published gifts in localStorage.
// Backend integration can later replace these functions with API calls.

export type GiftTheme = "rose" | "sunset" | "moonlit" | "mint" | "cream";
export type GiftAnimation = "envelope" | "giftbox" | "scrapbook" | "moonlit" | "balloons";

export type Gift = {
  id: string;
  slug: string;            // shareable slug
  templateId: string;
  templateSlug: string;
  recipientName: string;
  senderName: string;
  message: string;
  photos: string[];        // data URLs
  musicUrl?: string;
  category: string;
  theme: GiftTheme;
  palette: string;         // primary color token name
  animation: GiftAnimation;
  status: "draft" | "published";
  createdAt: number;
  updatedAt: number;
};

const KEY = "krisuu:gifts:v1";
const FAV_KEY = "krisuu:favorites:v1";
const PREF_KEY = "krisuu:prefs:v1";

function read(): Gift[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Gift[]) : [];
  } catch {
    return [];
  }
}

function write(gifts: Gift[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(gifts));
  window.dispatchEvent(new CustomEvent("krisuu:gifts:changed"));
}

export function listGifts() {
  return read().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getGift(id: string) {
  return read().find((g) => g.id === id || g.slug === id);
}

export function saveGift(gift: Gift) {
  const all = read();
  const idx = all.findIndex((g) => g.id === gift.id);
  const next = { ...gift, updatedAt: Date.now() };
  if (idx === -1) all.push(next);
  else all[idx] = next;
  write(all);
  return next;
}

export function deleteGift(id: string) {
  write(read().filter((g) => g.id !== id));
}

export function duplicateGift(id: string) {
  const g = getGift(id);
  if (!g) return null;
  const copy: Gift = {
    ...g,
    id: makeId(),
    slug: makeSlug(g.recipientName || "gift"),
    status: "draft",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return saveGift(copy);
}

export function makeId() {
  return "g_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function makeSlug(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24) || "gift";
  return `${base}-${Math.random().toString(36).slice(2, 6)}`;
}

export function emptyGift(templateId = "t1", templateSlug = "midnight-love-letter"): Gift {
  return {
    id: makeId(),
    slug: makeSlug("gift"),
    templateId,
    templateSlug,
    recipientName: "",
    senderName: "",
    message: "",
    photos: [],
    musicUrl: "",
    category: "love",
    theme: "rose",
    palette: "love",
    animation: "envelope",
    status: "draft",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

// ── favorites ─────────────────────────────────────────────
export function listFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(FAV_KEY) ?? "[]");
  } catch {
    return [];
  }
}
export function toggleFavorite(templateId: string) {
  const cur = new Set(listFavorites());
  cur.has(templateId) ? cur.delete(templateId) : cur.add(templateId);
  window.localStorage.setItem(FAV_KEY, JSON.stringify([...cur]));
  window.dispatchEvent(new CustomEvent("krisuu:favs:changed"));
}
export function isFavorite(templateId: string) {
  return listFavorites().includes(templateId);
}

// ── preferences ───────────────────────────────────────────
export type Prefs = { lastTheme?: GiftTheme; lastPalette?: string };
export function getPrefs(): Prefs {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(PREF_KEY) ?? "{}");
  } catch {
    return {};
  }
}
export function setPrefs(p: Prefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREF_KEY, JSON.stringify({ ...getPrefs(), ...p }));
}

export const THEME_GRADIENT: Record<GiftTheme, string> = {
  rose: "linear-gradient(135deg, var(--love-soft), var(--card))",
  sunset: "linear-gradient(135deg, var(--birthday-soft), var(--love-soft))",
  moonlit: "linear-gradient(180deg, oklch(0.35 0.06 290), oklch(0.55 0.08 320))",
  mint: "linear-gradient(135deg, var(--memory-soft), var(--card))",
  cream: "linear-gradient(135deg, var(--cream), var(--card))",
};

export const PALETTES = [
  { id: "love", color: "var(--love)", label: "Rose" },
  { id: "birthday", color: "var(--birthday)", label: "Sunset" },
  { id: "friendship", color: "var(--friendship)", label: "Sky" },
  { id: "memory", color: "var(--memory)", label: "Mint" },
  { id: "proposal", color: "var(--proposal)", label: "Lilac" },
];
