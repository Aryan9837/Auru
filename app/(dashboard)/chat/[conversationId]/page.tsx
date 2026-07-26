import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/chat/chat").then((m) => m.Chat), {
  loading: () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner text="Loading chat..." />
      </div>
    </div>
  ),
});

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  const { userId } = await auth();

  if (!userId) notFound();

  return (
    <Suspense
      fallback={
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner text="Loading conversation..." />
          </div>
        </div>
      }
    >
      <ConversationData conversationId={conversationId} userId={userId} />
    </Suspense>
  );
}

async function ConversationData({
  conversationId,
  userId,
}: {
  conversationId: string;
  userId: string;
}) {
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId },
    include: {
      character: true,
      messages: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!conversation) notFound();

  return (
    <Chat
      conversationId={conversation.id}
      characterName={conversation.character.name}
      initialMessages={conversation.messages.reverse().map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
      }))}
      greeting={conversation.character.greeting}
      hasMore={conversation.messages.length === 5}
    />
  );
}
