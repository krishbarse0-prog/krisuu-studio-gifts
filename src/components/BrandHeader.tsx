import { Link } from "@tanstack/react-router";
import { Search, Menu, Sparkles } from "lucide-react";

export function BrandHeader() {
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

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#trending" className="hover:text-foreground">Trending</a>
          <a href="#relationship" className="hover:text-foreground">Relationship</a>
          <a href="#birthday" className="hover:text-foreground">Birthday</a>
          <a href="#memory" className="hover:text-foreground">Memory</a>
          <a href="#reactions" className="hover:text-foreground">Stories</a>
        </nav>

        <div className="flex items-center gap-1.5">
          <button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 hover:bg-white/60">
            <Search size={17} />
          </button>
          <button aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 hover:bg-white/60 md:hidden">
            <Menu size={17} />
          </button>
          <a
            href="#create"
            className="ml-1 hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 sm:inline-flex"
          >
            <Sparkles size={12} /> Create Gift
          </a>
        </div>
      </div>
    </header>
  );
}
