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
    <section className="py-7 sm:py-10">
      <div className="mb-4 flex items-end justify-between px-4 sm:px-8">
        <div>
          {kicker && <p className="font-hand text-lg leading-none text-foreground/65">{kicker}</p>}
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        </div>
        <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
          see all →
        </a>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-12 pt-8 sm:gap-10 sm:px-8 sm:pb-16 sm:pt-10">
        {items.map((t) => (
          <div key={t.id} className="snap-start">
            <PolaroidCard template={t} onOpen={onOpen} />
          </div>
        ))}
      </div>
    </section>
  );
}
