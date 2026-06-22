import { Check, Sparkles, Crown, Gift as GiftIcon, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

const TIERS = [
  {
    name: "Sweet",
    icon: GiftIcon,
    price: "Free",
    sub: "for first-time gifters",
    features: [
      { text: "1 gift per month", on: true },
      { text: "5 starter templates", on: true },
      { text: "Basic stickers", on: true },
      { text: "Photos, music & voice notes", on: false },
      { text: "Krisuu watermark", on: false },
    ],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Forever",
    icon: Heart,
    price: "₹249",
    priceSub: "/ gift",
    sub: "most loved · pay once, keep forever",
    features: [
      { text: "All 60+ premium templates", on: true },
      { text: "Photos, music & voice notes", on: true },
      { text: "No watermark, no expiry", on: true },
      { text: "Private shareable link forever", on: true },
      { text: "HD downloadable keepsake", on: true },
    ],
    cta: "Create a gift",
    highlight: true,
    badge: "Most loved",
  },
  {
    name: "Studio",
    icon: Crown,
    price: "₹899",
    priceSub: "/ gift",
    sub: "for proposals, weddings & big days",
    features: [
      { text: "Everything in Forever", on: true },
      { text: "Custom design touch-ups", on: true },
      { text: "Priority delivery in 1 hour", on: true },
      { text: "Co-edit with your partner", on: true },
      { text: "Printable memory book PDF", on: true },
    ],
    cta: "Go premium",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
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

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">
          {TIERS.map((t) => {
            const Icon = t.icon;
            return (
              <article
                key={t.name}
                className={`group relative flex flex-col rounded-3xl p-6 transition hover:-translate-y-1 sm:p-7 ${
                  t.highlight
                    ? "border-2 border-love bg-gradient-to-b from-love-soft/40 to-card shadow-plush lg:scale-[1.03]"
                    : "border border-border/70 bg-card/85 shadow-soft hover:shadow-plush"
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-love px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-soft">
                    <Sparkles size={11} /> {t.badge}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${
                      t.highlight ? "bg-love text-primary-foreground" : "bg-love-soft text-love"
                    }`}
                  >
                    <Icon size={19} />
                  </span>
                  <div>
                    <p
                      className="text-lg font-semibold text-foreground leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {t.name}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{t.sub}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline gap-1">
                  <p
                    className="text-5xl font-semibold text-foreground sm:text-6xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t.price}
                  </p>
                  {t.priceSub && (
                    <span className="text-sm text-muted-foreground">{t.priceSub}</span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {t.features.map((f, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 ${f.on ? "text-foreground/85" : "text-muted-foreground/60 line-through"}`}
                    >
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${f.on ? "text-love" : "opacity-30"}`}
                      />
                      <span>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/create"
                  className={`mt-7 inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition ${
                    t.highlight
                      ? "bg-love text-primary-foreground shadow-plush hover:scale-[1.02]"
                      : "border border-border bg-background/80 text-foreground hover:bg-background"
                  }`}
                >
                  {t.cta}
                  {t.highlight && <Sparkles size={13} />}
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Every plan includes a 7-day refund · no card needed for the free tier
        </p>
      </div>
    </section>
  );
}
