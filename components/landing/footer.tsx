import { Brand } from "@/components/brand";

export function LandingFooter() {
  return (
    <footer className="px-6 py-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Brand />
        <div className="flex items-center gap-6 text-sm text-[--landing-muted]">
          <span>AI conversations with character.</span>
          <span className="hidden sm:inline">&copy; 2026 Auru</span>
        </div>
      </div>
    </footer>
  );
}
