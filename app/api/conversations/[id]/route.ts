import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { withAuthParams } from "@/lib/api-utils";

export const GET = withAuthParams<{ id: string }>(async (userId, { id }) => {
  const conversation = await prisma.conversation.findFirst({
    where: { id, userId },
    include: {
      character: true,
      messages: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!conversation) {
    return NextResponse.json(
      { error: "Conversation not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(conversation);
});
