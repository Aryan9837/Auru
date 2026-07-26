"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Brand } from "./brand";
import { Avatar } from "./avatar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { deleteConversation } from "@/app/actions/conversation";
import { useClickOutside } from "@/hooks/use-click-outside";

interface ConversationItem {
  id: string;
  character: { name: string; avatarUrl: string | null };
}

interface SidebarProps {
  conversations: ConversationItem[];
}

export function Sidebar({ conversations }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useClickOutside<HTMLDivElement>(() => setMenuOpen(null));

  async function handleDelete(id: string) {
    if (!confirm("Delete this conversation permanently?")) return;
    await deleteConversation(id);
    setMenuOpen(null);
    router.refresh();
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-3 left-4 z-50 lg:hidden p-2 bg-surface border border-border rounded-[var(--radius-sm)]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-surface border-r border-border z-40 flex flex-col transition-transform duration-300 ease-[var(--ease)]",
          "lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/chat" onClick={() => setIsOpen(false)}>
            <Brand showLogo={false} />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-[var(--radius-sm)] hover:bg-surface-alt text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <Link href="/chat" onClick={() => setIsOpen(false)}>
            <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 8.5l6-6 6 6" />
                <path d="M3.5 7v5.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" />
              </svg>
              Home
            </Button>
          </Link>
          <Link href="/explore" onClick={() => setIsOpen(false)}>
            <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 5v6M5 8h6" />
              </svg>
              Explore Characters
            </Button>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          <p className="px-3 py-2 text-xs font-medium text-muted uppercase tracking-wider">
            Recent
          </p>
          {conversations.map((c) => (
            <div
              key={c.id}
              className="relative"
              ref={menuOpen === c.id ? menuRef : undefined}
            >
              <Link
                href={`/chat/${c.id}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm transition-colors duration-150",
                  pathname === `/chat/${c.id}`
                    ? "bg-surface-alt text-foreground"
                    : "text-fg-2 hover:bg-surface-alt hover:text-foreground"
                )}
              >
                <Avatar
                  name={c.character.name}
                  avatarUrl={c.character.avatarUrl}
                  size="xs"
                />
                <span className="truncate flex-1">{c.character.name}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(menuOpen === c.id ? null : c.id);
                  }}
                  className="p-1 rounded-[var(--radius-sm)] hover:bg-border/50 text-muted hover:text-foreground transition-colors shrink-0 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="7" cy="3" r="1" fill="currentColor" />
                    <circle cx="7" cy="7" r="1" fill="currentColor" />
                    <circle cx="7" cy="11" r="1" fill="currentColor" />
                  </svg>
                </button>
              </Link>
              {menuOpen === c.id && (
                <div className="absolute right-2 top-full mt-1 bg-surface border border-border rounded-[var(--radius-md)] shadow-lg py-1 z-50 min-w-[140px]">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4h12" />
                      <path d="M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4" />
                      <path d="M12.667 4v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.333 1.333 0 0 1-1.334-1.334V4" />
                      <path d="M6.667 7.333v4" />
                      <path d="M9.333 7.333v4" />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted text-center">Auru v0.1</p>
        </div>
      </aside>
    </>
  );
}
