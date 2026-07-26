import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-utils";

export const GET = withAuth(async (userId) => {
  const conversations = await prisma.conversation.findMany({
    where: { userId },
    include: { character: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(conversations);
});

export const POST = withAuth(async (userId, req) => {
  const { characterId } = await req.json();

  if (!characterId) {
    return NextResponse.json(
      { error: "Missing characterId" },
      { status: 400 }
    );
  }

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  });
  if (!character) {
    return NextResponse.json(
      { error: "Character not found" },
      { status: 404 }
    );
  }

  const conversation = await prisma.conversation.create({
    data: {
      userId,
      characterId,
    },
    include: { character: true },
  });

  return NextResponse.json(conversation);
});
