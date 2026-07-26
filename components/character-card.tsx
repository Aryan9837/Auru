"use client";

import { Avatar } from "./avatar";
import { useStartConversation } from "@/hooks/use-start-conversation";

interface CharacterCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatarUrl: string | null;
}

export function CharacterCard({
  id,
  name,
  tagline,
  description,
  avatarUrl,
}: CharacterCardProps) {
  const { startConversation, loading } = useStartConversation();

  return (
    <div className="group bg-surface border border-border rounded-[var(--radius-lg)] p-6 transition-all duration-200 hover:border-fg/20">
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={name} avatarUrl={avatarUrl} size="lg" />
        <div className="min-w-0">
          <h3 className="font-serif text-lg leading-tight">
            {name}
          </h3>
          <p className="text-sm text-muted mt-0.5">{tagline}</p>
        </div>
      </div>
      <p className="text-sm text-fg-2 line-clamp-3 mb-5">{description}</p>
      <button
        onClick={() => startConversation(id)}
        disabled={loading}
        className="w-full h-10 text-sm font-medium bg-accent text-accent-on rounded-[var(--radius-md)] transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Starting..." : "Start Conversation"}
      </button>
    </div>
  );
}
