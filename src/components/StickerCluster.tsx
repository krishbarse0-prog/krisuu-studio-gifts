import { Sticker } from "./Sticker";
import type { StickerPlacement } from "@/lib/stickers";

export function StickerCluster({ placements }: { placements: StickerPlacement[] }) {
  return (
    <>
      {placements.map((p, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            zIndex: p.z ?? 1,
          }}
        >
          <Sticker
            sticker={p.key}
            size={p.size}
            rotate={p.rotate}
            driftDelay={p.driftDelay ?? i * 0.3}
            interactive={false}
          />
        </div>
      ))}
    </>
  );
}
