"use client";

import { Avatar } from "./avatar";
import { useStartConversation } from "@/hooks/use-start-conversation";

interface ForYouCardProps {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string | null;
}

export function ForYouCard({ id, name, tagline, avatarUrl }: ForYouCardProps) {
  const { startConversation, loading } = useStartConversation();

  return (
    <div
      onClick={() => startConversation(id)}
      className="snap-center shrink-0 w-72 bg-surface border border-border rounded-[var(--radius-lg)] p-4 transition-all duration-200 hover:border-fg/20 cursor-pointer flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <Avatar name={name} avatarUrl={avatarUrl} size="md" />
        <div className="min-w-0">
          <h3 className="font-serif text-base leading-tight truncate">
            {name}
          </h3>
          <p className="text-xs text-muted truncate">{tagline}</p>
        </div>
      </div>
      {loading && (
        <p className="text-xs text-muted">Starting...</p>
      )}
    </div>
  );
}
