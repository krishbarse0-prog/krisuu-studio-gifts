export type Category = "love" | "birthday" | "friendship" | "memory" | "proposal";

export type Rail =
  | "trending"
  | "loved"
  | "new"
  | "birthday"
  | "love"
  | "memory"
  | "shared"
  | "relationship";

export type Template = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  occasion: string;
  category: Category;
  emoji: string;
  rail: Rail[];
  preview: "envelope" | "giftbox" | "scrapbook" | "moonlit" | "balloons";
  gradient: string;
  tilt: number;
  duration: string; // viewing time
  views: string;
  loves: string;
  saves: string;
  trending?: boolean;
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
    occasion: "Anniversary · Just Because",
    category: "love", emoji: "💌",
    rail: ["trending", "loved", "love", "shared", "relationship"],
    preview: "envelope",
    gradient: "linear-gradient(135deg, var(--love-soft), var(--card))",
    tilt: -2.5, duration: "1m 20s", views: "12.4k", loves: "3.1k", saves: "1.8k", trending: true,
  },
  {
    id: "t2", slug: "confetti-birthday", title: "Confetti Birthday",
    tagline: "unwrap a tiny universe of joy",
    occasion: "Birthday",
    category: "birthday", emoji: "🎁",
    rail: ["trending", "new", "birthday", "shared"],
    preview: "giftbox",
    gradient: "linear-gradient(135deg, var(--birthday-soft), var(--card))",
    tilt: 2, duration: "1m 05s", views: "9.8k", loves: "2.4k", saves: "1.2k", trending: true,
  },
  {
    id: "t3", slug: "memory-scrapbook", title: "Memory Scrapbook",
    tagline: "pages that turn back time",
    occasion: "Anniversary · Memories",
    category: "memory", emoji: "📷",
    rail: ["loved", "memory", "new", "shared"],
    preview: "scrapbook",
    gradient: "linear-gradient(135deg, var(--memory-soft), var(--card))",
    tilt: -1.5, duration: "2m 10s", views: "18.2k", loves: "4.6k", saves: "2.6k",
  },
  {
    id: "t4", slug: "moonlit-proposal", title: "Moonlit Proposal",
    tagline: "petals drift, the moon hums",
    occasion: "Proposal",
    category: "proposal", emoji: "💍",
    rail: ["trending", "loved", "relationship"],
    preview: "moonlit",
    gradient: "linear-gradient(135deg, var(--proposal-soft), var(--card))",
    tilt: 3, duration: "1m 45s", views: "22.0k", loves: "6.8k", saves: "4.1k", trending: true,
  },
  {
    id: "t5", slug: "best-friend-bouquet", title: "Best Friend Bouquet",
    tagline: "a little bundle of stay-with-me",
    occasion: "Friendship",
    category: "friendship", emoji: "🌷",
    rail: ["new", "loved"],
    preview: "envelope",
    gradient: "linear-gradient(135deg, var(--friendship-soft), var(--card))",
    tilt: -2, duration: "0m 55s", views: "6.1k", loves: "1.2k", saves: "640",
  },
  {
    id: "t6", slug: "balloon-parade", title: "Balloon Parade",
    tagline: "happy floats across the screen",
    occasion: "Birthday",
    category: "birthday", emoji: "🎈",
    rail: ["trending", "birthday", "new"],
    preview: "balloons",
    gradient: "linear-gradient(135deg, var(--birthday-soft), var(--card))",
    tilt: 1.5, duration: "1m 10s", views: "8.4k", loves: "1.9k", saves: "910",
  },
  {
    id: "t7", slug: "first-date-polaroid", title: "First Date Polaroid",
    tagline: "the day you said yes to coffee",
    occasion: "Anniversary · Relationship",
    category: "memory", emoji: "🍓",
    rail: ["loved", "memory", "relationship", "shared"],
    preview: "scrapbook",
    gradient: "linear-gradient(135deg, var(--memory-soft), var(--card))",
    tilt: -3, duration: "1m 35s", views: "14.7k", loves: "3.8k", saves: "2.0k",
  },
  {
    id: "t8", slug: "heart-in-a-jar", title: "Heart in a Jar",
    tagline: "tap to release a hundred hearts",
    occasion: "Love · Just Because",
    category: "love", emoji: "🫙",
    rail: ["trending", "love", "loved", "relationship"],
    preview: "envelope",
    gradient: "linear-gradient(135deg, var(--love-soft), var(--card))",
    tilt: 2.5, duration: "1m 00s", views: "16.9k", loves: "4.2k", saves: "2.3k", trending: true,
  },
];

export const byRail = (rail: Rail) =>
  templates.filter(t => t.rail.includes(rail));
