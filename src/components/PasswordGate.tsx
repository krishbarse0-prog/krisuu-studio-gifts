import { useState } from "react";
import { Lock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { checkPassword, type Gift } from "@/lib/gift-store";

export function PasswordGate({ gift, children }: { gift: Gift; children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(!gift.password);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (checkPassword(gift.password, value)) setUnlocked(true);
    else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-[oklch(0.97_0.03_15)] to-[oklch(0.94_0.05_330)] p-6">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0, x: error ? [-8, 8, -6, 6, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-3xl bg-white/95 p-7 text-center shadow-plush backdrop-blur"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-love-soft text-love">
          <Lock size={22} />
        </span>
        <h1 className="mt-4 text-2xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          A private gift
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {gift.senderName ? `${gift.senderName} ` : "Someone "}
          left this for {gift.recipientName || "you"} — locked with a password.
        </p>
        {gift.passwordHint && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-[11px] font-medium text-foreground/70">
            <Heart size={10} className="text-love" fill="currentColor" /> hint: {gift.passwordHint}
          </p>
        )}
        <input
          autoFocus
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="enter password"
          className="input mt-5 text-center text-base tracking-wider"
        />
        {error && <p className="mt-2 text-xs text-love">that's not it — try again ✿</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-foreground py-3 text-xs font-medium text-background shadow-plush transition hover:scale-[1.02]"
        >
          Unlock gift
        </button>
      </motion.form>
    </div>
  );
}
