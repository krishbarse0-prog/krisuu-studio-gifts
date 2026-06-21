import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Heart, Share2 } from "lucide-react";
import { GiftRenderer } from "@/components/GiftRenderer";
import { getGift, type Gift } from "@/lib/gift-store";

export const Route = createFileRoute("/gift/$giftId")({
  head: ({ params }) => ({
    meta: [
      { title: "A gift for you ✿ Krisuu Studio" },
      { name: "description", content: "Someone made you something. Open it." },
      { property: "og:title", content: "A gift for you ✿" },
      { property: "og:description", content: "Open the memory they made for you." },
      { property: "og:url", content: `/gift/${params.giftId}` },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/gift/${params.giftId}` }],
  }),
  component: GiftPage,
});

function GiftPage() {
  const { giftId } = Route.useParams();
  const [gift, setGift] = useState<Gift | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setGift(getGift(giftId) ?? null);
  }, [giftId]);

  if (!gift) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
        <div className="space-y-3">
          <Heart size={36} className="mx-auto text-love" />
          <p className="text-sm text-muted-foreground">
            this gift isn't on this device.
          </p>
          <Link to="/" className="text-sm underline">
            go home
          </Link>
        </div>
      </div>
    );
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "A gift for you", text: "Open this ✿", url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative">
      <GiftRenderer gift={gift} autoplay />
      <div className="fixed bottom-4 right-4 z-30 flex gap-2">
        <button
          onClick={share}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-xs font-medium text-background shadow-plush"
        >
          <Share2 size={12} /> Share
        </button>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2.5 text-xs font-medium shadow-soft"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
