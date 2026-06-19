import { Link } from "@tanstack/react-router";
import { Search, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { href: "#trending", label: "Trending" },
  { href: "#relationship", label: "Relationship" },
  { href: "#birthday", label: "Birthday" },
  { href: "#memory", label: "Memory" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function BrandHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="glass mx-3 mt-3 flex items-center justify-between rounded-full px-3 py-2 shadow-soft sm:mx-6 sm:px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span
            className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-plush"
            style={{
              background:
                "conic-gradient(from 220deg, var(--love), var(--proposal), var(--birthday), var(--love))",
            }}
          >
            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-display)" }}>
              K
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-white shadow" />
          </span>
          <span className="flex flex-col leading-none">
            <span
              className="text-[15px] font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              KRISUU
            </span>
            <span className="font-script text-xs text-love -mt-0.5">studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {NAV.slice(0, 5).map((n) => (
            <a key={n.href} href={n.href} className="hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            aria-label="Search"
            className="hidden h-9 w-9 place-items-center rounded-full text-foreground/70 hover:bg-white/60 sm:grid"
          >
            <Search size={17} />
          </button>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 hover:bg-white/60 lg:hidden"
          >
            <Menu size={17} />
          </button>
          <a
            href="#trending"
            className="ml-1 hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 sm:inline-flex"
          >
            <Sparkles size={12} /> Create Gift
          </a>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-3 top-3 w-[min(86vw,320px)] rounded-3xl border border-border/70 bg-card p-5 shadow-plush">
            <div className="flex items-center justify-between">
              <p
                className="text-sm font-semibold tracking-wide text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                KRISUU STUDIO
              </p>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-muted/60 hover:bg-muted"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="mt-4 flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-[15px] font-medium text-foreground hover:bg-muted/60"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href="#trending"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-love px-4 py-3 text-sm font-medium text-primary-foreground shadow-plush"
            >
              <Sparkles size={13} /> Create a gift
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
