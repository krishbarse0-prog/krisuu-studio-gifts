import { Check, Sparkles } from "lucide-react";

const TIERS = [
  {
    name: "Sweet",
    price: "Free",
    sub: "for first-time gifters",
    features: ["1 gift per month", "5 starter templates", "Basic stickers", "Krisuu watermark"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Forever",
    price: "₹249",
    sub: "per gift · most loved",
    features: [
      "All 60+ premium templates",
      "Add photos, music & voice notes",
      "No watermark",
      "Private shareable link forever",
      "HD downloadable keepsake",
    ],
    cta: "Create a gift",
    highlight: true,
  },
  {
    name: "Studio",
    price: "₹899",
    sub: "for proposals & weddings",
    features: [
      "Everything in Forever",
      "Custom design touch-ups",
      "Priority delivery in 1 hour",
      "Co-edit with your partner",
      "Printable memory book PDF",
    ],
    cta: "Go premium",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="font-hand text-xl text-foreground/65">simple, kind pricing</p>
          <h2
            className="mt-1 text-3xl font-semibold sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pay once. Keep it <span className="text-love">forever</span>.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
            No subscriptions. No surprises. Just one tiny price for one big memory.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-7 ${
                t.highlight
                  ? "border-2 border-love bg-card shadow-plush"
                  : "border border-border/70 bg-card/85 shadow-soft"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-love px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-soft">
                  <Sparkles size={11} /> Most loved
                </span>
              )}
              <p
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{t.sub}</p>
              <p
                className="mt-4 text-4xl font-semibold text-foreground sm:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.price}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-foreground/80">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-love" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#trending"
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-medium transition ${
                  t.highlight
                    ? "bg-love text-primary-foreground hover:opacity-90"
                    : "border border-border bg-background/80 text-foreground hover:bg-background"
                }`}
              >
                {t.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
