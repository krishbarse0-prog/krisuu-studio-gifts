import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
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
      { title: "Krisuu Studio — Cute Sticker Gift Templates" },
      {
        name: "description",
        content:
          "Create scrapbook-style digital gifts covered in cute meme stickers, polaroids, hearts, and internet reaction energy.",
      },
      { property: "og:title", content: "Krisuu Studio" },
      {
        property: "og:description",
        content:
          "A Pinterest-style board of adorable sticker-filled gift templates for love notes, birthdays, memories, and more.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<Template | null>(null);

  return (
    <div className="min-h-screen pb-24 sm:pb-0">
      <BrandHeader />

      <section className="relative overflow-hidden px-4 pt-6 sm:px-8 sm:pt-10">
        <FloatingParticles />
        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-foreground/75 shadow-soft"
          >
            <Sparkles size={12} className="text-love" />
            pinterest-board energy
            <Heart size={12} className="text-love" fill="currentColor" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-[2.8rem] font-semibold leading-[0.98] sm:text-7xl"
          >
            Sticker-packed gifts
            <br />
            <span className="font-script text-love" style={{ fontFamily: "var(--font-script)" }}>
              for dramatic little feelings.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
            className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base"
          >
            Real meme-sticker energy — crying cats, rose cats, kiss cats, sleepy kittens, doodle hearts,
            and scrapbook layers all over every template.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#trending"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-plush transition hover:scale-[1.03]"
            >
              Browse sticker gifts
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#collections"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur hover:bg-card"
            >
              Explore boards
            </a>
          </motion.div>

          <div className="mt-10 sm:mt-14">
            <MascotTrio />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 font-hand text-xl text-foreground/65"
          >
            saved from the cutest corner of the internet ✿
          </motion.p>
        </div>
      </section>

      <div id="trending" />
      <CategoryRail kicker="most saved" title="Trending Sticker Gifts" items={byRail("trending")} onOpen={setActive} />
      <div id="collections" />
      <CategoryRail kicker="soft launch" title="Most Loved" items={byRail("loved")} onOpen={setActive} />
      <CategoryRail kicker="fresh drop" title="New Arrivals" items={byRail("new")} onOpen={setActive} />
      <CategoryRail kicker="party board" title="Birthday Collection" items={byRail("birthday")} onOpen={setActive} />
      <CategoryRail kicker="kissy board" title="Love Collection" items={byRail("love")} onOpen={setActive} />
      <CategoryRail kicker="scrapbook board" title="Memory Collection" items={byRail("memory")} onOpen={setActive} />

      <section id="stories" className="px-4 py-16 text-center sm:px-8">
        <p className="font-hand text-2xl text-foreground/65">too cute to leave unsent</p>
        <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">Pick a board. Send a feeling.</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Every template is layered with different meme stickers so the whole site feels collected,
          saved, and obsessively curated.
        </p>
        <a
          href="#trending"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-love px-6 py-3 text-sm font-medium text-primary-foreground shadow-plush"
        >
          Start picking stickers <ArrowRight size={14} />
        </a>
        <p className="mt-12 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Krisuu Studio · sticker chaos, but cute
        </p>
      </section>

      <StickyMobileCTA />
      <TemplatePreviewModal template={active} onClose={() => setActive(null)} />
    </div>
  );
}
