export type Category = "love" | "birthday" | "friendship" | "memory" | "proposal";

export type Template = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  emoji: string;
  rail: ("trending" | "loved" | "new" | "birthday" | "love" | "memory")[];
  preview: "envelope" | "giftbox" | "scrapbook" | "moonlit" | "balloons";
  gradient: string;
  tilt: number;
};

export const CATEGORY_LABEL: Record<Category, string> = {
  love: "Love",
  birthday: "Birthday",
  friendship: "Friendship",
  memory: "Memory",
  proposal: "Proposal",
};

export const templates: Template[] = [
  {
    id: "t1", slug: "midnight-love-letter", title: "Midnight Love Letter",
    tagline: "an envelope that opens with a sigh",
    category: "love", emoji: "💌", rail: ["trending", "loved", "love"],
    preview: "envelope",
    gradient: "linear-gradient(135deg, var(--love-soft), var(--card))",
    tilt: -2.5,
  },
  {
    id: "t2", slug: "confetti-birthday", title: "Confetti Birthday",
    tagline: "unwrap a tiny universe of joy",
    category: "birthday", emoji: "🎁", rail: ["trending", "new", "birthday"],
    preview: "giftbox",
    gradient: "linear-gradient(135deg, var(--birthday-soft), var(--card))",
    tilt: 2,
  },
  {
    id: "t3", slug: "memory-scrapbook", title: "Memory Scrapbook",
    tagline: "pages that turn back time",
    category: "memory", emoji: "📷", rail: ["loved", "memory", "new"],
    preview: "scrapbook",
    gradient: "linear-gradient(135deg, var(--memory-soft), var(--card))",
    tilt: -1.5,
  },
  {
    id: "t4", slug: "moonlit-proposal", title: "Moonlit Proposal",
    tagline: "petals drift, the moon hums",
    category: "proposal", emoji: "💍", rail: ["trending", "loved"],
    preview: "moonlit",
    gradient: "linear-gradient(135deg, var(--proposal-soft), var(--card))",
    tilt: 3,
  },
  {
    id: "t5", slug: "best-friend-bouquet", title: "Best Friend Bouquet",
    tagline: "a little bundle of stay-with-me",
    category: "friendship", emoji: "🌷", rail: ["new", "loved"],
    preview: "envelope",
    gradient: "linear-gradient(135deg, var(--friendship-soft), var(--card))",
    tilt: -2,
  },
  {
    id: "t6", slug: "balloon-parade", title: "Balloon Parade",
    tagline: "happy floats across the screen",
    category: "birthday", emoji: "🎈", rail: ["trending", "birthday", "new"],
    preview: "balloons",
    gradient: "linear-gradient(135deg, var(--birthday-soft), var(--card))",
    tilt: 1.5,
  },
  {
    id: "t7", slug: "first-date-polaroid", title: "First Date Polaroid",
    tagline: "the day you said yes to coffee",
    category: "memory", emoji: "🍓", rail: ["loved", "memory"],
    preview: "scrapbook",
    gradient: "linear-gradient(135deg, var(--memory-soft), var(--card))",
    tilt: -3,
  },
  {
    id: "t8", slug: "heart-in-a-jar", title: "Heart in a Jar",
    tagline: "tap to release a hundred hearts",
    category: "love", emoji: "🫙", rail: ["trending", "love", "loved"],
    preview: "envelope",
    gradient: "linear-gradient(135deg, var(--love-soft), var(--card))",
    tilt: 2.5,
  },
];

export const byRail = (rail: Template["rail"][number]) =>
  templates.filter(t => t.rail.includes(rail));
