import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Heart, MessageCircle, Share2 } from "lucide-react";
import { GiftRenderer } from "@/components/GiftRenderer";
import { PasswordGate } from "@/components/PasswordGate";
import { CountdownGate } from "@/components/CountdownGate";
import { ScratchCard } from "@/components/ScratchCard";
import { GiftReactions } from "@/components/GiftReactions";
import { GiftQRCode } from "@/components/GiftQRCode";
import { getGift, type Gift } from "@/lib/gift-store";

export const Route = createFileRoute("/gift/$giftId")({
  head: ({ params }) => ({
    meta: [
      { title: "A gift for you ✿ Krisuu Studio" },
      { name: "description", content: "Someone made you something. Tap to open." },
      { property: "og:title", content: "A gift for you ✿" },
      { property: "og:description", content: "Open the memory they made for you on Krisuu Studio." },
      { property: "og:url", content: `/gift/${params.giftId}` },
      { property: "og:type", content: "article" },
      { property: "og:image", content: "/og-gift.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-gift.jpg" },
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
          <p className="text-sm text-muted-foreground">this gift isn't on this device.</p>
          <Link to="/" className="text-sm underline">go home</Link>
        </div>
      </div>
    );
  }

  const shareText = `${gift.senderName ? gift.senderName + " made" : "Someone made"} a little gift for ${gift.recipientName || "you"} ✿ open it →`;

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "A gift for you", text: shareText, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function whatsapp() {
    const url = window.location.href;
    const msg = encodeURIComponent(`${shareText}\n${url}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener");
  }

  return (
    <CountdownGate gift={gift}>
      <PasswordGate gift={gift}>
        <ScratchCard gift={gift}>
          <div className="relative">
            <GiftRenderer gift={gift} autoplay />
            <GiftReactions giftId={gift.id} recipientName={gift.recipientName} />
            <div className="fixed bottom-4 right-4 z-30 flex flex-wrap justify-end gap-2">
              <button
                onClick={whatsapp}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white shadow-plush hover:scale-[1.03] transition"
              >
                <MessageCircle size={12} fill="currentColor" /> WhatsApp
              </button>
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
        </ScratchCard>
      </PasswordGate>
    </CountdownGate>
  );
}
