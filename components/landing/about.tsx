import { SectionReveal } from "./section-reveal";
import { ChatMockup } from "./icons";

export function About() {
  return (
    <section className="relative px-6 py-32 sm:py-48 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <SectionReveal>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-tight">
                High-performing AI personalities that deliver{" "}
                <span className="italic text-[--landing-accent]">
                  meaningful conversations
                </span>
              </h2>
            </SectionReveal>
            <SectionReveal>
              <p className="text-base sm:text-lg leading-relaxed text-[--landing-muted]">
                With a strategy-led approach to character design, we help you
                create AI personalities that engage, entertain, and feel
                genuinely alive &mdash; whether for storytelling, brainstorming,
                or companionship.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal>
            <div className="w-full aspect-[320/280] max-w-sm mx-auto">
              <ChatMockup className="w-full h-full drop-shadow-2xl" />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
