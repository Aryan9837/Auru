"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  characterName?: string;
}

export const Message = memo(function Message({ role, content, characterName }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "animate-fade-in",
        isUser ? "flex justify-end" : "flex justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] lg:max-w-[70%]",
          isUser
            ? "bg-accent text-accent-on rounded-[var(--radius-lg)] rounded-br-[var(--radius-sm)] px-5 py-3"
            : "bg-surface-alt rounded-[var(--radius-lg)] rounded-bl-[var(--radius-sm)] px-5 py-3"
        )}
      >
        {!isUser && characterName && (
          <p className="text-xs font-medium text-muted mb-1.5">
            {characterName}
          </p>
        )}
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    </div>
  );
});
