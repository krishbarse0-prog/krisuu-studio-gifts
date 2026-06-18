import { Star, Heart, Users, Gift } from "lucide-react";

const STATS = [
  { icon: Gift, value: "10,000+", label: "gifts created" },
  { icon: Star, value: "4.9", label: "average rating" },
  { icon: Heart, value: "32k+", label: "loved by couples" },
  { icon: Users, value: "180k", label: "memories opened" },
];

export function SocialProofBar() {
  return (
    <section className="px-4 sm:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 rounded-3xl border border-border/70 bg-card/80 p-4 shadow-soft backdrop-blur sm:grid-cols-4 sm:gap-4 sm:p-6">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-love-soft text-love">
              <Icon size={18} />
            </span>
            <div className="min-w-0">
              <p
                className="text-xl font-semibold leading-none text-foreground sm:text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {value}
              </p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground sm:text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
