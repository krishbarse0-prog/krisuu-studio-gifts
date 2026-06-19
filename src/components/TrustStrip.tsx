import { ShieldCheck, Zap, Lock, RefreshCw } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "Secure payments", sub: "UPI · cards · wallets" },
  { icon: Zap, label: "Instant delivery", sub: "link in 30 seconds" },
  { icon: Lock, label: "Private by default", sub: "unguessable links" },
  { icon: RefreshCw, label: "7-day refunds", sub: "no questions asked" },
];

export function TrustStrip() {
  return (
    <section className="px-4 sm:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 rounded-3xl border border-border/70 bg-card/70 p-4 shadow-soft backdrop-blur sm:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-love-soft text-love">
              <Icon size={17} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold leading-none text-foreground">
                {label}
              </p>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
