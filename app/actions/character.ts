"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCharacter(data: {
  name: string;
  tagline: string;
  description: string;
  systemPrompt: string;
  greeting: string;
  avatarUrl?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const character = await prisma.character.create({
    data: {
      creatorId: userId,
      ...data,
    },
  });

  revalidatePath("/explore");
  return character;
}

export async function getCharacters() {
  return prisma.character.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCharacter(id: string) {
  return prisma.character.findUnique({
    where: { id },
  });
}
