"use client";

import { Avatar } from "./avatar";
import { useStartConversation } from "@/hooks/use-start-conversation";

interface SceneCardProps {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string | null;
}

export function SceneCard({ id, name, tagline, avatarUrl }: SceneCardProps) {
  const { startConversation, loading } = useStartConversation();

  return (
    <div
      onClick={() => startConversation(id)}
      className="snap-center shrink-0 w-64 h-80 rounded-[var(--radius-lg)] overflow-hidden relative cursor-pointer group"
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-serif text-lg text-white leading-tight mb-1">
          {name}
        </h3>
        <p className="text-xs text-white/70 mb-3">{tagline}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            startConversation(id);
          }}
          disabled={loading}
          className="w-full h-8 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-[var(--radius-md)] transition-colors hover:bg-white/30 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Starting..." : "Select Character"}
        </button>
      </div>
    </div>
  );
}
