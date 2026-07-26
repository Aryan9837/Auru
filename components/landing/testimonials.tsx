import { SectionReveal } from "./section-reveal";

const testimonials = [
  {
    quote:
      "I created a philosopher character and spent two hours debating the meaning of existence. It felt like talking to a real person.",
    author: "Alex M.",
    role: "Writer",
    initial: "A",
    color: "#60a5fa",
  },
  {
    quote:
      "The characters remember context from earlier in the conversation. It's uncanny how natural it feels.",
    author: "Priya K.",
    role: "Designer",
    initial: "P",
    color: "#f472b6",
  },
  {
    quote:
      "I use Auru to brainstorm story ideas. My character gives me perspectives I never would have thought of.",
    author: "Jordan T.",
    role: "Game Developer",
    initial: "J",
    color: "#34d399",
  },
  {
    quote:
      "Creating my own character was surprisingly fun. The system prompt lets you dial in exactly the personality you want.",
    author: "Sam R.",
    role: "Student",
    initial: "S",
    color: "#a78bfa",
  },
];

function TestimonialCard({
  quote,
  author,
  role,
  initial,
  color,
}: {
  quote: string;
  author: string;
  role: string;
  initial: string;
  color: string;
}) {
  return (
    <div className="testimonial-card flex flex-col justify-between">
      <blockquote className="text-base sm:text-lg leading-relaxed text-[--landing-fg]/80 mb-8">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: color }}
        >
          <span className="font-serif text-sm text-black font-medium">
            {initial}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium">{author}</p>
          <p className="text-xs text-[--landing-muted]">{role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative px-6 py-32 sm:py-48 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="flex flex-col gap-4 mb-16">
            <span className="font-mono text-sm tracking-[0.2em] text-[--landing-accent]">
              04
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl tracking-tight">
              What people say
            </h2>
          </div>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <SectionReveal key={t.author}>
              <TestimonialCard {...t} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
