import { SectionRevealStagger } from "./section-reveal";
import { IconCreate, IconExplore, IconChat } from "./icons";

const features = [
  {
    number: "02",
    title: "Create",
    description:
      "Design AI characters with unique personalities, backstories, and voices. Every soul is one of a kind.",
    Icon: IconCreate,
    items: [
      "Custom system prompts",
      "Unique greeting messages",
      "Personal avatars",
    ],
  },
  {
    number: "02",
    title: "Explore",
    description:
      "Discover a growing universe of characters created by the community. Find your perfect conversation partner.",
    Icon: IconExplore,
    items: ["Browse by category", "Search by name", "Featured collections"],
  },
  {
    number: "03",
    title: "Chat",
    description:
      "Have natural, flowing conversations that feel like texting a friend. The AI remembers context.",
    Icon: IconChat,
    items: ["Real-time streaming", "Context memory", "Persistent history"],
  },
];

export function Features() {
  return (
    <section className="relative px-6 py-32 sm:py-48 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 mb-16">
          <span className="font-mono text-sm tracking-[0.2em] text-[--landing-accent]">
            02
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
            How it works
          </h2>
        </div>

        <SectionRevealStagger className="grid sm:grid-cols-3 gap-8 sm:gap-12">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[--landing-accent]">
                <f.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl tracking-tight">
                {f.title}
              </h3>
              <p className="text-base leading-relaxed text-[--landing-muted]">
                {f.description}
              </p>
              <ul className="flex flex-col gap-1.5 mt-2">
                {f.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[--landing-fg]/50"
                  >
                    <span className="w-1 h-1 rounded-full bg-[--landing-accent]/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </SectionRevealStagger>
      </div>
    </section>
  );
}
