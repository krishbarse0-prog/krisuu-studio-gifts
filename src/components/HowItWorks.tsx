import { motion } from "framer-motion";
import { MousePointerClick, Wand2, Send } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: MousePointerClick,
    title: "Choose a template",
    body: "Pick from love letters, birthday surprises, memory books and more — every template is animated.",
    accent: "var(--love-soft)",
  },
  {
    n: "02",
    icon: Wand2,
    title: "Personalize it",
    body: "Add their name, your photos, a voice note, your song. Drop in stickers. Pick a mood.",
    accent: "var(--memory-soft)",
  },
  {
    n: "03",
    icon: Send,
    title: "Share the gift",
    body: "Send one private link. They open it on any phone — and replay it forever.",
    accent: "var(--proposal-soft)",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="font-hand text-xl text-foreground/65">how it works</p>
          <h2
            className="mt-1 text-3xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            From idea to <span className="text-love">forever</span>, in 3 minutes.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
            No design skills. No app downloads. Just feelings, typed out and gift-wrapped.
          </p>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-3 sm:gap-6">
          {/* dotted connector line */}
          <div
            aria-hidden
            className="absolute left-[16%] right-[16%] top-[68px] hidden h-px sm:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--love) 0 6px, transparent 6px 14px)",
              opacity: 0.4,
            }}
          />
          {STEPS.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="relative rounded-3xl border border-border/70 bg-card/85 p-6 shadow-soft backdrop-blur transition hover:-translate-y-1 hover:shadow-plush"
            >
              <span
                className="absolute -top-4 left-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide text-foreground/75 shadow-soft"
                style={{ background: s.accent }}
              >
                step {s.n}
              </span>

              <div
                className="grid h-14 w-14 place-items-center rounded-2xl text-love shadow-soft"
                style={{ background: s.accent }}
              >
                <s.icon size={22} />
              </div>

              <h3
                className="mt-5 text-xl font-semibold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
