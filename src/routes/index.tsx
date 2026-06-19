import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { FloatingParticles } from "@/components/FloatingParticles";
import { CategoryRail } from "@/components/CategoryRail";
import { TemplatePreviewModal } from "@/components/TemplatePreviewModal";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { LiveGiftPreview } from "@/components/LiveGiftPreview";
import { SocialProofBar } from "@/components/SocialProofBar";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { TrustStrip } from "@/components/TrustStrip";
import { HeroFlow } from "@/components/HeroFlow";
import { byRail, type Template } from "@/lib/templates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krisuu Studio — Not Just A Gift. A Memory They Keep Forever." },
      {
        name: "description",
        content:
          "Create interactive love letters, birthday surprises, memory books, relationship stories and emotional digital gifts. Made in minutes. Loved forever.",
      },
      { property: "og:title", content: "Krisuu Studio — Emotional Digital Gifts" },
      {
        property: "og:description",
        content:
          "A premium gifting studio for love letters, birthdays, memory books and proposals. Built for the people who feel everything.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [active, setActive] = useState<Template | null>(null);

  return (
    <div id="top" className="min-h-screen pb-28 sm:pb-0">
      <BrandHeader />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden px-4 pt-8 sm:px-8 sm:pt-14">
        <FloatingParticles />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] text-foreground/75 shadow-soft"
            >
              <span className="flex items-center gap-0.5 text-love">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={9} fill="currentColor" />
                ))}
              </span>
              4.9 · loved by 10,000+ gifters
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-5 text-[2.5rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.2rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Not Just A Gift.
              <br />
              <span className="text-love">A Memory</span>{" "}
              <span className="font-script text-foreground/85" style={{ fontFamily: "var(--font-script)" }}>
                they keep forever.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.22 }}
              className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base lg:mx-0"
            >
              Create interactive love letters, birthday surprises, memory books, relationship stories
              and emotional digital gifts — in minutes, opened forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                id="create"
                href="#trending"
                className="group inline-flex items-center gap-2 rounded-full bg-love px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-plush transition hover:scale-[1.03]"
              >
                <Sparkles size={15} /> Create Gift
                <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur hover:bg-card"
              >
                <Play size={13} fill="currentColor" /> Watch Demo
              </a>
            </motion.div>

            <p className="mt-4 font-hand text-lg text-foreground/55 lg:text-left">
              some gifts are opened once. this one gets revisited forever.
            </p>

            <HeroFlow />
          </div>

          {/* live preview */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <LiveGiftPreview />
          </motion.div>
        </div>
      </section>

      <div className="mt-12 sm:mt-16">
        <SocialProofBar />
      </div>

      {/* ───────── Rails ───────── */}
      <div id="trending" />
      <CategoryRail kicker="going viral" title="Trending Gifts" items={byRail("trending")} onOpen={setActive} />

      <div id="shared" />
      <CategoryRail kicker="sent the most" title="Most Shared" items={byRail("shared")} onOpen={setActive} />

      <div id="relationship" />
      <CategoryRail kicker="for the two of you" title="Relationship Gifts" items={byRail("relationship")} onOpen={setActive} />

      <div id="birthday" />
      <CategoryRail kicker="confetti incoming" title="Birthday Gifts" items={byRail("birthday")} onOpen={setActive} />

      <div id="memory" />
      <CategoryRail kicker="pages that turn back time" title="Memory Books" items={byRail("memory")} onOpen={setActive} />

      {/* ───────── Storytelling band ───────── */}
      <section className="relative my-10 overflow-hidden px-4 py-16 sm:px-8 sm:py-24">
        <div
          className="absolute inset-x-4 inset-y-4 -z-10 rounded-[2.5rem]"
          style={{
            background:
              "radial-gradient(60% 80% at 20% 20%, var(--love-soft), transparent 60%), radial-gradient(60% 80% at 80% 80%, var(--proposal-soft), transparent 60%), var(--card)",
          }}
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-hand text-2xl text-foreground/65">why people keep coming back</p>
          <h2
            className="mt-1 text-3xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Because screenshots fade.
            <br />
            <span className="text-love">Stories don't.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Every Krisuu gift is a tiny film — typed letters, soft music, photo reveals, a final
            surprise. Made by you, replayed by them, forever.
          </p>
          <a
            href="#trending"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-plush hover:opacity-90"
          >
            Turn a memory into an experience <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ───────── Reactions ───────── */}
      <div id="reactions" />
      <Testimonials />

      {/* ───────── Final CTA ───────── */}
      <section id="stories" className="px-4 pb-20 pt-4 text-center sm:px-8">
        <p className="font-hand text-2xl text-foreground/65">your turn ✿</p>
        <h2
          className="mt-1 text-2xl font-semibold sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Make something they'll never delete.
        </h2>
        <a
          href="#create"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-love px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-plush"
        >
          <Sparkles size={14} /> Start Creating
        </a>
        <p className="mt-12 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Krisuu Studio · made with feelings
        </p>
      </section>

      <MobileBottomNav />
      <TemplatePreviewModal template={active} onClose={() => setActive(null)} />
    </div>
  );
}
