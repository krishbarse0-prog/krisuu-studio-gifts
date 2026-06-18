import { Home, Compass, Heart, Sparkles } from "lucide-react";

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="glass mx-3 mb-3 flex items-center justify-around rounded-full border border-white/70 px-2 py-1.5 shadow-plush">
        <NavItem href="#top" label="Home" icon={Home} />
        <NavItem href="#trending" label="Browse" icon={Compass} />
        <a
          href="#create"
          className="-mt-6 grid h-14 w-14 place-items-center rounded-full bg-love text-primary-foreground shadow-plush ring-4 ring-background"
          aria-label="Create gift"
        >
          <Sparkles size={20} />
        </a>
        <NavItem href="#stories" label="Loved" icon={Heart} />
        <NavItem href="#reactions" label="Stories" icon={Sparkles} />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Home;
}) {
  return (
    <a
      href={href}
      className="flex min-w-[52px] flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium text-foreground/70 hover:text-foreground"
    >
      <Icon size={18} />
      {label}
    </a>
  );
}
