"use client";

export function MessageLoading({ characterName }: { characterName?: string }) {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-surface-alt rounded-[var(--radius-lg)] rounded-bl-[var(--radius-sm)] px-5 py-4">
        {characterName && (
          <p className="text-xs font-medium text-muted mb-2">
            {characterName}
          </p>
        )}
        <div className="flex gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-muted animate-pulse-dot"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-muted animate-pulse-dot"
            style={{ animationDelay: "0.16s" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-muted animate-pulse-dot"
            style={{ animationDelay: "0.32s" }}
          />
        </div>
      </div>
    </div>
  );
}
