import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Ananya",
    role: "sent a Midnight Letter",
    quote: "He literally cried. Like full-on tears. Worth every second.",
    accent: "var(--love-soft)",
    emoji: "💌",
  },
  {
    name: "Rohit",
    role: "made a Memory Scrapbook",
    quote: "Better than any physical gift I've ever wrapped. She replays it weekly.",
    accent: "var(--memory-soft)",
    emoji: "📷",
  },
  {
    name: "Sara & Vik",
    role: "anniversary, year 4",
    quote: "It's our little movie now. Screenshots fade — this didn't.",
    accent: "var(--proposal-soft)",
    emoji: "✨",
  },
  {
    name: "Priya",
    role: "birthday surprise",
    quote: "I sent it at midnight. She woke up to confetti and her own name in lights.",
    accent: "var(--birthday-soft)",
    emoji: "🎈",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <p className="font-hand text-xl text-foreground/65">real reactions</p>
          <h2
            className="text-2xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            People don't open it once.
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            They revisit it. Screenshot it. Send it to their friends. Cry a little.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="relative rounded-3xl border border-border/70 bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-plush"
              style={{ background: `linear-gradient(180deg, ${r.accent}, var(--card))` }}
            >
              <div className="mb-2 flex items-center gap-1 text-love">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <p
                className="text-[15px] leading-snug text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                “{r.quote}”
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.role}</p>
                </div>
                <span className="text-2xl">{r.emoji}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
