"use client";

import { UserButton } from "@clerk/nextjs";
import { Brand } from "./brand";
import { Avatar } from "./avatar";
import { useClickOutside } from "@/hooks/use-click-outside";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string | null;
}

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/characters/search?q=${encodeURIComponent(value.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.characters);
          setOpen(true);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }, 300);
  }

  function handleSelect(id: string) {
    setQuery("");
    setResults([]);
    setOpen(false);
    router.push(`/chat/${id}`);
  }

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-surface/80 backdrop-blur-sm shrink-0">
      <Link href="/chat">
        <Brand className="text-lg" showLogo={false} />
      </Link>

      <div className="flex items-center gap-3">
        <div ref={containerRef} className="relative w-64">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3.5 3.5" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search characters..."
            className="w-full h-9 pl-9 pr-4 text-sm bg-surface-alt border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-muted outline-none focus:border-accent transition-colors"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          )}
        </div>

        {open && results.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-surface border border-border rounded-[var(--radius-md)] shadow-lg py-1 z-50 max-h-80 overflow-y-auto">
            {results.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-alt transition-colors text-left cursor-pointer"
              >
                <Avatar name={c.name} avatarUrl={c.avatarUrl} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-xs text-muted truncate">{c.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {open && query.trim().length > 0 && results.length === 0 && !loading && (
          <div className="absolute top-full mt-1 w-full bg-surface border border-border rounded-[var(--radius-md)] shadow-lg py-4 z-50 text-center text-sm text-muted">
            No characters found
          </div>
        )}
      </div>

      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
      />
      </div>
    </header>
  );
}
