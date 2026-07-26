"use client";

import { CharacterCard } from "./character-card";

interface Character {
  id: string;
  name: string;
  tagline: string;
  description: string;
  avatarUrl: string | null;
}

export function CharacterGrid({ characters }: { characters: Character[] }) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="font-serif text-3xl mb-3">
          No characters yet
        </h2>
        <p className="text-muted">Be the first to create one.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {characters.map((c) => (
        <CharacterCard key={c.id} {...c} />
      ))}
    </div>
  );
}
