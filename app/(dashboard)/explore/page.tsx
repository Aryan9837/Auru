import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { CharacterGrid } from "@/components/character-grid";
import { NewCharacterDialog } from "@/components/new-character-dialog";

export default function ExplorePage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl tracking-tight">
              Explore
            </h1>
            <p className="text-fg-2 mt-1">Discover or create characters.</p>
          </div>
          <NewCharacterDialog />
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-surface-alt rounded-[var(--radius)] animate-pulse"
                />
              ))}
            </div>
          }
        >
          <Characters />
        </Suspense>
      </div>
    </div>
  );
}

async function Characters() {
  const characters = await prisma.character.findMany({
    orderBy: { createdAt: "desc" },
  });
  return <CharacterGrid characters={characters} />;
}
