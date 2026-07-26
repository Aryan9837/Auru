"use client";

import { useStartConversation } from "@/hooks/use-start-conversation";

interface FeaturedCardProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatarUrl: string | null;
}

export function FeaturedCard({
  id,
  name,
  tagline,
  description,
  avatarUrl,
}: FeaturedCardProps) {
  const { startConversation, loading } = useStartConversation();

  return (
    <div
      onClick={() => startConversation(id)}
      className="snap-center shrink-0 w-72 h-80 rounded-[var(--radius-lg)] overflow-hidden relative cursor-pointer group"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-alt" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-lg text-white leading-tight mb-1">
          {name}
        </h3>
        <p className="text-xs text-white/70 mb-1">{tagline}</p>
        <p className="text-xs text-white/50 line-clamp-2 mb-3">{description}</p>
        {loading && (
          <p className="text-xs text-white/50">Starting...</p>
        )}
      </div>
    </div>
  );
}
