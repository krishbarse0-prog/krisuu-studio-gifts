import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Share2, Copy, Check, MessageCircle, FileCode2 } from "lucide-react";

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
  const [pngUrl, setPngUrl] = useState<string>("");
  const [svgMarkup, setSvgMarkup] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string>("");

  useEffect(() => {
    if (!url) return;
    const cvs = canvasRef.current;
    // 2x on-screen canvas → crisp scan on retina/AMOLED phones
    if (cvs) {
      QRCode.toCanvas(cvs, url, {
        width: size * 2,
        margin: 2,
        color: { dark: "#1a1320", light: "#ffffff" },
        errorCorrectionLevel: "H",
      }).catch(() => {});
    }
    // High-res PNG for download / native file share
    QRCode.toDataURL(url, {
      width: 1024,
      margin: 3,
      color: { dark: "#1a1320", light: "#ffffff" },
      errorCorrectionLevel: "H",
      type: "image/png",
    })
      .then(setPngUrl)
      .catch(() => {});
    // Lossless SVG for print / vector share
    QRCode.toString(url, {
      type: "svg",
      margin: 3,
      color: { dark: "#1a1320", light: "#ffffff" },
      errorCorrectionLevel: "H",
    })
      .then(setSvgMarkup)
      .catch(() => {});
  }, [url, size]);

  const slug = (recipientName || "you")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "you";
  const pngFilename = `krisuu-gift-${slug}.png`;
  const svgFilename = `krisuu-gift-${slug}.svg`;

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  }

  function triggerDownload(href: string, filename: string) {
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadPNG() {
    if (!pngUrl) return;
    triggerDownload(pngUrl, pngFilename);
    flash("PNG downloaded");
  }

  function downloadSVG() {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const href = URL.createObjectURL(blob);
    triggerDownload(href, svgFilename);
    setTimeout(() => URL.revokeObjectURL(href), 4000);
    flash("SVG downloaded");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Older Safari fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function shareQR() {
    const shareText = `a little gift for ${recipientName || "you"} ✿ scan or open →`;
    // 1) Native file share (attaches the QR image) — iOS 15+ Safari, Android Chrome
    try {
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (pngUrl && typeof nav.canShare === "function") {
        const blob = await (await fetch(pngUrl)).blob();
        const file = new File([blob], pngFilename, { type: "image/png" });
        if (nav.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "A gift for you", text: shareText, url });
          return;
        }
      }
    } catch {
      /* user cancelled or unsupported */
    }
    // 2) URL share (all modern mobile browsers)
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "A gift for you", text: shareText, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    // 3) Fallback: copy the link
    await copyLink();
    flash("Link copied — paste anywhere");
  }

  function whatsapp() {
    const msg = encodeURIComponent(
      `a little gift for ${recipientName || "you"} ✿ scan or open →\n${url}`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="relative rounded-3xl bg-white/95 p-5 text-center shadow-plush backdrop-blur">
      <p className="font-script text-xl text-foreground/80" style={{ fontFamily: "var(--font-script)" }}>
        scan to open
      </p>
      <p className="mt-0.5 text-[11px] uppercase tracking-widest text-muted-foreground">
        print it · gift it · stick it on a card
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open gift link"
        className="relative mx-auto mt-4 inline-block rounded-2xl bg-white p-3 ring-1 ring-border shadow-soft transition-transform hover:scale-[1.02]"
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={{ width: size, height: size, imageRendering: "pixelated" }}
        />
        <span className="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto block w-fit rounded-full bg-love px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-soft">
          krisuu ✿
        </span>
      </a>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <button
          onClick={downloadPNG}
          disabled={!pngUrl}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2.5 text-[11px] font-semibold text-background shadow-plush disabled:opacity-40"
        >
          <Download size={12} /> PNG
        </button>
        <button
          onClick={downloadSVG}
          disabled={!svgMarkup}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground/85 px-4 py-2.5 text-[11px] font-semibold text-background shadow-plush disabled:opacity-40"
        >
          <FileCode2 size={12} /> SVG
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
      {toast && (
        <div className="pointer-events-none absolute inset-x-0 -bottom-8 mx-auto w-fit rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold text-background shadow-plush">
          {toast}
        </div>
      )}
    </div>
  );
}
