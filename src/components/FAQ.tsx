import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How long does the recipient keep the gift?",
    a: "Forever. Each gift has a private link that never expires — they can revisit it whenever they need a tiny reminder of you.",
  },
  {
    q: "Do they need to download an app?",
    a: "No. It opens in any browser — phone, tablet, laptop. Tap the link, watch the magic.",
  },
  {
    q: "Can I add my own photos, music and voice notes?",
    a: "Yes. The Forever and Studio plans let you upload photos, pick a song or record a short voice message. We treat your files as private and never share them.",
  },
  {
    q: "Is it safe to send personal photos?",
    a: "Each gift link is unguessable. Only people you share the link with can open it. Your media is encrypted in storage and never used to train anything.",
  },
  {
    q: "What if I'm not creative?",
    a: "Every template is pre-written by people who feel a lot. Swap a few words for their name, drop in a photo, done.",
  },
  {
    q: "Refunds?",
    a: "If your gift doesn't open or feels wrong, message us within 7 days and we'll refund — no awkward questions.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <p className="font-hand text-xl text-foreground/65">good things to know</p>
          <h2
            className="mt-1 text-3xl font-semibold sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions, softly answered.
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-3xl border border-border/70 bg-card/85 px-4 py-1 shadow-soft backdrop-blur sm:px-6"
        >
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border/60">
              <AccordionTrigger className="text-left text-[15px] font-medium text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
