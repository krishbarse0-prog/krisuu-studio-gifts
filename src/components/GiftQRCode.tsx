import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Share2, Copy, Check, MessageCircle } from "lucide-react";

export function GiftQRCode({
  url,
  recipientName,
  size = 220,
}: {
  url: string;
  recipientName?: string;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    QRCode.toCanvas(cvs, url, {
      width: size * 2,
      margin: 2,
      color: { dark: "#1a1320", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).catch(() => {});
    QRCode.toDataURL(url, {
      width: 1024,
      margin: 3,
      color: { dark: "#1a1320", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setDataUrl).catch(() => {});
  }, [url, size]);

  const filename = `krisuu-gift-${(recipientName || "you").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;

  function download() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function shareQR() {
    try {
      if (dataUrl && navigator.canShare) {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], filename, { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "A gift for you",
            text: `scan to open ${recipientName ? recipientName + "'s" : "your"} gift ✿`,
          });
          return;
        }
      }
    } catch {}
    if (navigator.share) {
      try { await navigator.share({ title: "A gift for you", url }); return; } catch {}
    }
    await copyLink();
  }

  function whatsapp() {
    const msg = encodeURIComponent(
      `a little gift for ${recipientName || "you"} ✿ scan or open →\n${url}`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener");
  }

  return (
    <div className="rounded-3xl bg-white/95 p-5 text-center shadow-plush backdrop-blur">
      <p className="font-script text-xl text-foreground/80" style={{ fontFamily: "var(--font-script)" }}>
        scan to open
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        print it · gift it · stick it on a card
      </p>
      <div className="relative mx-auto mt-4 inline-block rounded-2xl bg-white p-3 ring-1 ring-border shadow-soft">
        <canvas ref={canvasRef} className="block" style={{ width: size, height: size }} />
        <span className="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto block w-fit rounded-full bg-love px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-soft">
          krisuu ✿
        </span>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button
          onClick={download}
          disabled={!dataUrl}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-[11px] font-semibold text-background shadow-plush disabled:opacity-40"
        >
          <Download size={12} /> Download QR
        </button>
        <button
          onClick={shareQR}
          className="inline-flex items-center gap-1.5 rounded-full bg-love px-4 py-2.5 text-[11px] font-semibold text-white shadow-plush"
        >
          <Share2 size={12} /> Share
        </button>
        <button
          onClick={whatsapp}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-[11px] font-semibold text-white shadow-plush"
        >
          <MessageCircle size={12} fill="currentColor" /> WhatsApp
        </button>
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 text-[11px] font-medium"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      <p className="mt-3 break-all px-2 text-[10px] text-muted-foreground">{url}</p>
    </div>
  );
}
