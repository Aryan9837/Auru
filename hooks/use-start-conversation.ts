"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createConversation } from "@/app/actions/conversation";

export function useStartConversation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function startConversation(characterId: string) {
    setLoading(true);
    try {
      const conv = await createConversation(characterId);
      router.push(`/chat/${conv.id}`);
    } catch {
      setLoading(false);
    }
  }

  return { startConversation, loading };
}
