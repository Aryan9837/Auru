"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "./message";
import { MessageLoading } from "./message-loading";
import { ChatInput } from "./chat-input";

interface MessageItem {
  id: string;
  role: string;
  content: string;
}

interface ChatProps {
  conversationId: string;
  characterName: string;
  initialMessages: MessageItem[];
  greeting: string;
  hasMore: boolean;
}

export function Chat({
  conversationId,
  characterName,
  initialMessages,
  greeting,
  hasMore: initialHasMore,
}: ChatProps) {
  const [messages, setMessages] = useState<MessageItem[]>(() => {
    if (initialMessages.length > 0) return initialMessages;
    return [
      {
        id: "greeting",
        role: "assistant",
        content: greeting,
      },
    ];
  });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const assistantContentRef = useRef("");
  const assistantIdRef = useRef("");
  const batchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loadingMoreRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || !hasMore) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);

    const container = scrollContainerRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    try {
      const oldestId = messages[0]?.id;
      if (!oldestId) return;

      const res = await fetch(
        `/api/conversations/${conversationId}/messages?before=${oldestId}&limit=5`
      );
      if (!res.ok) throw new Error("Failed to load messages");

      const data = await res.json();
      if (data.messages.length === 0) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...data.messages, ...prev]);
      setHasMore(data.hasMore);

      requestAnimationFrame(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - prevScrollHeight;
        }
      });
    } catch {
      // silently fail
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  }, [conversationId, messages, hasMore]);

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    },
    []
  );

  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom();
    }
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const threshold = 150;
      isNearBottomRef.current =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        threshold;
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMoreRef.current) {
          loadMore();
        }
      },
      { root: scrollContainerRef.current, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    return () => {
      if (batchTimerRef.current) clearInterval(batchTimerRef.current);
    };
  }, []);

  const handleSend = useCallback(
    async (content: string) => {
      const userMsg: MessageItem = {
        id: `temp-${Date.now()}`,
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      isNearBottomRef.current = true;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId, message: content }),
        });

        if (!res.ok) throw new Error("Failed to send message");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        assistantContentRef.current = "";
        assistantIdRef.current = `temp-assistant-${Date.now()}`;

        setMessages((prev) => [
          ...prev,
          { id: assistantIdRef.current, role: "assistant", content: "" },
        ]);

        batchTimerRef.current = setInterval(() => {
          const content = assistantContentRef.current;
          const id = assistantIdRef.current;
          if (content) {
            setMessages((prev) =>
              prev.map((m) => (m.id === id ? { ...m, content } : m))
            );
          }
        }, 50);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;
              assistantContentRef.current += data;
            }
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            role: "assistant",
            content: "Something went wrong. Please try again.",
          },
        ]);
      } finally {
        if (batchTimerRef.current) {
          clearInterval(batchTimerRef.current);
          batchTimerRef.current = null;
        }
        const finalContent = assistantContentRef.current;
        const finalId = assistantIdRef.current;
        if (finalContent && finalId) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === finalId ? { ...m, content: finalContent } : m
            )
          );
        }
        setLoading(false);
      }
    },
    [conversationId]
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {hasMore && <div ref={sentinelRef} />}
          {loadingMore && (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-border border-t-foreground rounded-full animate-spin" />
            </div>
          )}
          {messages.map((m) => (
            <Message
              key={m.id}
              role={m.role as "user" | "assistant"}
              content={m.content}
              characterName={
                m.role === "assistant" ? characterName : undefined
              }
            />
          ))}
          {loading &&
            messages[messages.length - 1]?.role === "user" && (
              <MessageLoading characterName={characterName} />
            )}
        </div>
      </div>
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
