import { Heart, Sparkles } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-30 flex justify-center px-4 sm:hidden">
      <div className="glass flex w-full max-w-sm items-center gap-2 rounded-full p-1.5 shadow-plush">
        <button className="flex-1 rounded-full bg-foreground py-3 text-sm font-medium text-background">
          <Sparkles size={14} className="mr-1 inline" /> Create Gift
        </button>
        <button aria-label="Save" className="grid h-11 w-11 place-items-center rounded-full bg-card">
          <Heart size={16} className="text-love" fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
