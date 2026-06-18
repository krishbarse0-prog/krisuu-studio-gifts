import type { Template } from "@/lib/templates";
import { PolaroidCard } from "./PolaroidCard";

export function CategoryRail({
  title,
  kicker,
  items,
  onOpen,
}: {
  title: string;
  kicker?: string;
  items: Template[];
  onOpen: (t: Template) => void;
}) {
  return (
    <section className="py-6 sm:py-10">
      <div className="mb-4 flex items-end justify-between px-4 sm:px-8">
        <div>
          {kicker && <p className="font-script text-love text-lg leading-none">{kicker}</p>}
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        </div>
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground">see all →</a>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-10 overflow-x-auto px-8 pb-16 pt-10 sm:gap-14 sm:px-12">
        {items.map((t, i) => (
          <div key={t.id} className="snap-start pl-2 pr-2">
            <PolaroidCard template={t} onOpen={onOpen} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
