import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Gift } from "@/lib/gift-store";

export function ScratchCard({ gift, children }: { gift: Gift; children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(!gift.scratchToReveal);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const cleared = useRef(false);

  useEffect(() => {
    if (!gift.scratchToReveal || revealed) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = cvs.getBoundingClientRect();
    cvs.width = width * dpr;
    cvs.height = height * dpr;
    ctx.scale(dpr, dpr);
    // metallic glitter scratch surface
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#f4c2d7");
    grad.addColorStop(0.5, "#c9a7f5");
    grad.addColorStop(1, "#a6dfff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 240; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.6})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "600 22px var(--font-display, serif)";
    ctx.textAlign = "center";
    ctx.fillText(gift.scratchLabel || "scratch to reveal", width / 2, height / 2 - 6);
    ctx.font = "14px var(--font-hand, cursive)";
    ctx.fillText("✿ use your finger ✿", width / 2, height / 2 + 18);
  }, [gift.scratchToReveal, gift.scratchLabel, revealed]);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function scratch(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    if (!cleared.current) checkCleared();
  }
  function checkCleared() {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const { width, height } = cvs;
    const data = ctx.getImageData(0, 0, width, height).data;
    let transparent = 0;
    // sample every 80th pixel
    for (let i = 3; i < data.length; i += 320) if (data[i] < 30) transparent++;
    const ratio = transparent / (data.length / 320);
    if (ratio > 0.45) {
      cleared.current = true;
      setTimeout(() => setRevealed(true), 200);
    }
  }

  if (!gift.scratchToReveal || revealed) return <>{children}</>;

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-[oklch(0.96_0.04_25)] to-[oklch(0.94_0.05_320)] p-5">
      <div className="w-full max-w-md text-center">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-2xl text-foreground/70"
          style={{ fontFamily: "var(--font-script)" }}
        >
          for {gift.recipientName || "you"}
        </motion.p>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
          a surprise hides under the foil
        </p>
        <div className="relative mx-auto mt-5 aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white shadow-plush">
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-love-soft to-[oklch(0.95_0.06_280)] p-6 text-center">
            <div>
              <Sparkles className="mx-auto text-love" />
              <p className="mt-2 font-script text-2xl" style={{ fontFamily: "var(--font-script)" }}>
                you're loved
              </p>
              <p className="mt-1 text-xs text-foreground/60">keep scratching…</p>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            onPointerDown={(e) => {
              drawing.current = true;
              (e.target as Element).setPointerCapture?.(e.pointerId);
              scratch(e);
            }}
            onPointerMove={scratch}
            onPointerUp={() => (drawing.current = false)}
            onPointerLeave={() => (drawing.current = false)}
            className="absolute inset-0 h-full w-full touch-none cursor-grab active:cursor-grabbing"
          />
        </div>
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 text-[11px] text-muted-foreground underline decoration-dotted hover:text-foreground"
        >
          can't scratch? open anyway →
        </button>
      </div>
    </div>
  );
}
