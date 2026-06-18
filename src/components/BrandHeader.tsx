import { Link } from "@tanstack/react-router";
import { Heart, Search, Menu } from "lucide-react";

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="glass mx-3 mt-3 flex items-center justify-between rounded-full px-4 py-2.5 shadow-soft sm:mx-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-love text-primary-foreground shadow-soft">
            <Heart size={16} fill="currentColor" />
          </span>
          <span className="text-lg font-semibold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Krisuu <span className="font-script text-love">studio</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#trending" className="hover:text-foreground">Trending</a>
          <a href="#collections" className="hover:text-foreground">Collections</a>
          <a href="#stories" className="hover:text-foreground">Stories</a>
        </nav>
        <div className="flex items-center gap-1.5">
          <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 hover:bg-white/60">
            <Search size={18} />
          </button>
          <button aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 hover:bg-white/60 md:hidden">
            <Menu size={18} />
          </button>
          <a
            href="#create"
            className="ml-1 hidden rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 sm:inline-block"
          >
            Create Gift
          </a>
        </div>
      </div>
    </header>
  );
}
