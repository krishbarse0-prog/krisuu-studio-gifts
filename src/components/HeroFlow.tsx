import { Compass, Wand2, Gift, Share2 } from "lucide-react";

const STEPS = [
  { icon: Compass, label: "Browse" },
  { icon: Wand2, label: "Customize" },
  { icon: Gift, label: "Gift" },
  { icon: Share2, label: "Share" },
];

export function HeroFlow() {
  return (
    <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] font-medium text-foreground/70 lg:justify-start">
      {STEPS.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-card/80 px-2.5 py-1 shadow-soft backdrop-blur">
            <Icon size={11} className="text-love" />
            {label}
          </span>
          {i < STEPS.length - 1 && (
            <span className="text-foreground/30" aria-hidden>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
