"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createConversation(characterId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });
  if (!character) throw new Error("Character not found");

  const existing = await prisma.conversation.findFirst({
    where: { userId, characterId },
    orderBy: { createdAt: "desc" },
  });
  if (existing) return existing;

  const conversation = await prisma.conversation.create({
    data: {
      userId,
      characterId,
    },
  });

  revalidatePath("/chat");
  return conversation;
}

export async function getConversations() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.conversation.findMany({
    where: { userId },
    include: { character: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getConversation(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.conversation.findFirst({
    where: { id, userId },
    include: {
      character: true,
      messages: { orderBy: { createdAt: "asc" } },
    },
  });
}

export async function deleteConversation(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const conversation = await prisma.conversation.findFirst({
    where: { id, userId },
  });
  if (!conversation) throw new Error("Conversation not found");

  await prisma.message.deleteMany({ where: { conversationId: id } });
  await prisma.conversation.delete({ where: { id } });

  revalidatePath("/chat");
}
