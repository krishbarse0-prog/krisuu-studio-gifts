import { useEffect, useRef, useState } from "react";
import { Mic, Square, Play, Pause, Trash2 } from "lucide-react";

export function VoiceRecorder({
  value,
  onChange,
  maxSeconds = 60,
}: {
  value?: string;
  onChange: (dataUrl: string) => void;
  maxSeconds?: number;
}) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices || typeof window.MediaRecorder === "undefined") {
      setSupported(false);
    }
  }, []);

  async function start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRef.current = mr;
      chunks.current = [];
      mr.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: mr.mimeType || "audio/webm" });
        const reader = new FileReader();
        reader.onload = () => onChange(String(reader.result));
        reader.readAsDataURL(blob);
      };
      mr.start();
      setRecording(true);
      setSeconds(0);
      tickRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= maxSeconds) {
            stop();
            return maxSeconds;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setSupported(false);
    }
  }
  function stop() {
    mediaRef.current?.stop();
    setRecording(false);
    if (tickRef.current) clearInterval(tickRef.current);
  }
  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  }

  if (!supported) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-background/50 px-3 py-2 text-[11px] text-muted-foreground">
        Voice recording isn't supported in this browser. Try Chrome or Safari on mobile.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {!recording ? (
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-1.5 rounded-full bg-love px-3.5 py-2 text-[11px] font-semibold text-white shadow-soft hover:scale-[1.03] transition"
        >
          <Mic size={12} /> {value ? "Re-record" : "Record voice note"}
        </button>
      ) : (
        <button
          type="button"
          onClick={stop}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-[11px] font-semibold text-background shadow-plush animate-pulse"
        >
          <Square size={11} fill="currentColor" /> Stop · {seconds}s
        </button>
      )}
      {value && !recording && (
        <>
          <audio ref={audioRef} src={value} onEnded={() => setPlaying(false)} />
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-2 text-[11px] hover:bg-muted/60"
          >
            {playing ? <Pause size={11} /> : <Play size={11} />}
            {playing ? "Pause" : "Preview"}
          </button>
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-2 text-[11px] text-muted-foreground hover:text-love"
            aria-label="Remove voice note"
          >
            <Trash2 size={11} />
          </button>
        </>
      )}
      <span className="text-[10px] text-muted-foreground">max {maxSeconds}s · stays on this device</span>
    </div>
  );
}

export function VoiceNotePlayer({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);
  if (!src) return null;
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-soft backdrop-blur">
      <audio ref={ref} src={src} onEnded={() => setPlaying(false)} />
      <button
        onClick={() => {
          const a = ref.current; if (!a) return;
          if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
        }}
        className="grid h-8 w-8 place-items-center rounded-full bg-love text-white shadow-soft"
        aria-label={playing ? "Pause voice note" : "Play voice note"}
      >
        {playing ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
      </button>
      <span className="pr-1.5 text-[11px] font-medium text-foreground/80">
        {playing ? "playing voice note…" : "tap to hear their voice"}
      </span>
    </div>
  );
}
