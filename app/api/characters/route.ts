import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api-utils";

export const GET = withAuth(async () => {
  const characters = await prisma.character.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(characters);
});

export const POST = withAuth(async (userId, req) => {
  const { name, tagline, description, systemPrompt, greeting, avatarUrl } =
    await req.json();

  if (!name || !tagline || !description || !systemPrompt || !greeting) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const character = await prisma.character.create({
    data: {
      creatorId: userId,
      name,
      tagline,
      description,
      systemPrompt,
      greeting,
      avatarUrl: avatarUrl || null,
    },
  });

  return NextResponse.json(character);
});
