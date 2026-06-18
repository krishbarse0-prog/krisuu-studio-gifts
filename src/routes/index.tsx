import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { FloatingParticles } from "@/components/FloatingParticles";
import { MascotTrio } from "@/components/MascotTrio";
import { CategoryRail } from "@/components/CategoryRail";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { byRail, type Template } from "@/lib/templates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krisuu Studio — Not Just A Gift. An Experience." },
      { name: "description", content: "Create beautiful digital surprises that feel handmade. Love letters, birthday stories, memory scrapbooks and more." },
      { property: "og:title", content: "Krisuu Studio" },
      { property: "og:description", content: "Send a feeling, not just a message. Magical digital gifts that open like little worlds." },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<Template | null>(null);

  return (
    <div className="min-h-screen pb-24 sm:pb-0">
      <BrandHeader />

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-6 sm:px-8 sm:pt-12">
        <FloatingParticles />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-foreground/70 shadow-soft"
          >
            <Sparkles size={12} className="text-love" /> a tiny studio of feelings
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-7xl"
          >
            Not Just A Gift.
            <br />
            <span className="font-script text-love" style={{ fontFamily: "var(--font-script)" }}>
              An Experience.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base"
          >
            Create beautiful digital surprises that feel handmade —
            little envelopes, gift boxes and scrapbooks that open like worlds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#trending"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-plush transition hover:scale-[1.03]"
            >
              Create Gift
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur hover:bg-card"
            >
              Explore Stories
            </a>
          </motion.div>

          <div className="mt-10 sm:mt-14">
            <MascotTrio />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-6 font-script text-lg text-love"
          >
            ♡ made with feelings, not features
          </motion.p>
        </div>
      </section>

      {/* RAILS */}
      <div id="trending" />
      <CategoryRail kicker="this week" title="Trending Gifts" items={byRail("trending")} onOpen={setActive} />
      <div id="collections" />
      <CategoryRail kicker="from the heart" title="Most Loved" items={byRail("loved")} onOpen={setActive} />
      <CategoryRail kicker="fresh out of the oven" title="New Arrivals" items={byRail("new")} onOpen={setActive} />
      <CategoryRail kicker="🎂" title="Birthday Collection" items={byRail("birthday")} onOpen={setActive} />
      <CategoryRail kicker="♡" title="Love Collection" items={byRail("love")} onOpen={setActive} />
      <CategoryRail kicker="📷" title="Memory Collection" items={byRail("memory")} onOpen={setActive} />

      {/* CLOSING */}
      <section id="stories" className="px-4 py-16 text-center sm:px-8">
        <p className="font-script text-2xl text-love">until next time</p>
        <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">Send a feeling today.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          A tiny surprise can change someone's whole afternoon.
        </p>
        <a
          href="#trending"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-love px-6 py-3 text-sm font-medium text-primary-foreground shadow-plush"
        >
          Start a Gift <ArrowRight size={14} />
        </a>
        <p className="mt-12 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Krisuu Studio · made with ♡ in a sunny corner
        </p>
      </section>

      <StickyMobileCTA />
      <TemplatePreviewModal template={active} onClose={() => setActive(null)} />
    </div>
  );
}
