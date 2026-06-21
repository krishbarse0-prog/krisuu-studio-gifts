import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { GiftRenderer } from "@/components/GiftRenderer";
import { getGift, saveGift, type Gift } from "@/lib/gift-store";

export const Route = createFileRoute("/preview/$giftId")({
  head: () => ({
    meta: [
      { title: "Preview — Krisuu Studio" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const { giftId } = Route.useParams();
  const [gift, setGift] = useState<Gift | null>(null);

  useEffect(() => {
    setGift(getGift(giftId) ?? null);
  }, [giftId]);

  if (!gift) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        no gift found ·{" "}
        <Link to="/create" className="ml-1 underline">
          create one
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed left-3 top-3 z-30 flex gap-2">
        <Link
          to="/create"
          search={{ gift: gift.id }}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[11px] font-medium shadow-soft"
        >
          <ArrowLeft size={12} /> back to editor
        </Link>
        <button
          onClick={() => {
            const next = saveGift({ ...gift, status: "published" });
            window.location.href = `/gift/${next.slug}`;
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-[11px] font-medium text-background shadow-plush"
        >
          <Send size={12} /> Publish
        </button>
      </div>
      <GiftRenderer gift={gift} autoplay />
    </div>
  );
}
