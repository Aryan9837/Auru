import { SectionReveal } from "./section-reveal";

const soulsRow1 = [
  { name: "Elena", color: "#60a5fa" },
  { name: "Kael", color: "#34d399" },
  { name: "Nova", color: "#f472b6" },
  { name: "Theron", color: "#a78bfa" },
  { name: "Lyra", color: "#facc15" },
  { name: "Orin", color: "#fb923c" },
  { name: "Sera", color: "#38bdf8" },
  { name: "Rook", color: "#e879f9" },
  { name: "Vex", color: "#f87171" },
  { name: "Iris", color: "#4ade80" },
];

const soulsRow2 = [
  { name: "Atlas", color: "#818cf8" },
  { name: "Zara", color: "#fb7185" },
  { name: "Drake", color: "#fbbf24" },
  { name: "Faye", color: "#34d399" },
  { name: "Jinx", color: "#c084fc" },
  { name: "Rowan", color: "#60a5fa" },
  { name: "Sage", color: "#2dd4bf" },
  { name: "Blaze", color: "#f97316" },
  { name: "Ember", color: "#ef4444" },
  { name: "Wren", color: "#a3e635" },
];

function SoulPill({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300 mx-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: color }}
      >
        <span className="font-serif text-sm text-black font-medium">
          {name[0]}
        </span>
      </div>
      <span className="text-sm font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden content-visibility-auto">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <SectionReveal>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-sm tracking-[0.2em] text-[--landing-accent]">
              01
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
              Meet the souls
            </h2>
            <p className="text-[--landing-muted] max-w-lg">
              Every character has a unique personality, voice, and story. Scroll
              to explore.
            </p>
          </div>
        </SectionReveal>
      </div>

      <div className="flex flex-col gap-4">
        <div className="marquee-row-left">
          <div className="marquee-track">
            {[...soulsRow1, ...soulsRow1].map((s, i) => (
              <SoulPill key={`r1-${i}`} name={s.name} color={s.color} />
            ))}
          </div>
        </div>
        <div className="marquee-row-right">
          <div className="marquee-track">
            {[...soulsRow2, ...soulsRow2].map((s, i) => (
              <SoulPill key={`r2-${i}`} name={s.name} color={s.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
