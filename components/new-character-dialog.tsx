"use client";

import { useState } from "react";
import { createCharacter } from "@/app/actions/character";
import { createConversation } from "@/app/actions/conversation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const INITIAL_FORM = {
  name: "",
  tagline: "",
  description: "",
  systemPrompt: "",
  greeting: "",
  avatarUrl: "",
};

export function NewCharacterDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  function resetForm() {
    setForm(INITIAL_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const character = await createCharacter({
        ...form,
        avatarUrl: form.avatarUrl || undefined,
      });
      const conv = await createConversation(character.id);
      setOpen(false);
      resetForm();
      router.push(`/chat/${conv.id}`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} size="sm" className="gap-2 whitespace-nowrap">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M8 3v10M3 8h10" />
        </svg>
        New Soul
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => !loading && setOpen(false)}
          />
          <div className="relative bg-surface border border-border rounded-[var(--radius-xl)] w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 animate-fade-in">
            <h2 className="font-serif text-2xl mb-6">
              Create a Soul
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <Input
                  required
                  placeholder="e.g. Ada Lovelace"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Tagline
                </label>
                <Input
                  required
                  placeholder="A short one-liner"
                  value={form.tagline}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tagline: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Who is this character?"
                  className="w-full px-4 py-2.5 text-sm bg-transparent border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-muted outline-none focus:border-accent resize-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  System Prompt
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Instructions for how the AI should behave as this character..."
                  className="w-full px-4 py-2.5 text-sm bg-transparent border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-muted outline-none focus:border-accent resize-none font-mono text-[13px]"
                  value={form.systemPrompt}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      systemPrompt: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  First Message
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="What does the character say first?"
                  className="w-full px-4 py-2.5 text-sm bg-transparent border border-border rounded-[var(--radius-md)] text-foreground placeholder:text-muted outline-none focus:border-accent resize-none"
                  value={form.greeting}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, greeting: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Avatar URL{" "}
                  <span className="text-muted font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="https://..."
                  value={form.avatarUrl}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, avatarUrl: e.target.value }))
                  }
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
