import { SectionReveal } from "./section-reveal";

const characters = [
  {
    name: "Elena",
    tagline: "Witty philosopher who questions everything",
    initial: "E",
    color: "#60a5fa",
    category: "Philosophy",
  },
  {
    name: "Kael",
    tagline: "Ancient storyteller from forgotten realms",
    initial: "K",
    color: "#34d399",
    category: "Fantasy",
  },
  {
    name: "Nova",
    tagline: "Curious explorer of ideas and worlds",
    initial: "N",
    color: "#f472b6",
    category: "Sci-Fi",
  },
  {
    name: "Theron",
    tagline: "Wise mentor with decades of insight",
    initial: "T",
    color: "#a78bfa",
    category: "Mentor",
  },
  {
    name: "Lyra",
    tagline: "Dreamy poet who speaks in metaphors",
    initial: "L",
    color: "#facc15",
    category: "Creative",
  },
  {
    name: "Orin",
    tagline: "Sarcastic skeptic with a heart of gold",
    initial: "O",
    color: "#fb923c",
    category: "Comedy",
  },
];

export function Showcase() {
  return (
    <section className="relative py-32 sm:py-48 content-visibility-auto">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-sm tracking-[0.2em] text-[--landing-accent]">
            03
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
            Featured souls
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((c) => (
            <SectionReveal key={c.name}>
              <div className="project-card group rounded-2xl border border-white/10 bg-white/[0.03] p-6 h-full flex flex-col justify-between hover:border-white/20 transition-all duration-300 cursor-pointer">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: c.color }}
                    >
                      <span className="font-serif text-xl text-black font-medium">
                        {c.initial}
                      </span>
                    </div>
                    <span className="text-xs font-mono tracking-wider text-[--landing-muted] px-3 py-1 rounded-full border border-white/10">
                      {c.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl tracking-tight mb-2">
                    {c.name}
                  </h3>
                  <p className="text-sm text-[--landing-muted] leading-relaxed">
                    {c.tagline}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm text-[--landing-accent] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Start conversation</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
