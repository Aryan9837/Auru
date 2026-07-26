import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    let userId = await getUserFromRequest(req);

    if (!userId) {
      try {
        const authResult = await auth();
        userId = authResult.userId;
      } catch {}
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, message } = await req.json();

    if (!conversationId || !message) {
      return NextResponse.json(
        { error: "Missing conversationId or message" },
        { status: 400 }
      );
    }

    const conversation = await prisma.conversation.findFirst({
      where: { id: conversationId, userId },
      include: { character: true },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    await prisma.message.create({
      data: {
        conversationId,
        role: "user",
        content: message,
      },
    });

    const history = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: 18,
    });
    history.reverse();

    const messages = [
      {
        role: "system" as const,
        content: `${conversation.character.systemPrompt}\n\nKeep responses as short as possible , like texting a friend. 1-2 sentences max unless asked for detail. No essays, no walls of text.`,
      },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://auru.app",
          "X-OpenRouter-Title": "Auru",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-v4-flash",
          messages,
          max_tokens: 150,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenRouter error:", err);
      return NextResponse.json(
        { error: "LLM request failed" },
        { status: 502 }
      );
    }

    const reader = response.body?.getReader();
    if (!reader) {
      return NextResponse.json(
        { error: "No response body" },
        { status: 500 }
      );
    }

    const decoder = new TextDecoder();
    let assistantContent = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  const content =
                    parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    assistantContent += content;
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${content}\n\n`)
                    );
                  }
                } catch {
                  // skip malformed chunks
                }
              }
            }
          }

          if (assistantContent) {
            await prisma.message.create({
              data: {
                conversationId,
                role: "assistant",
                content: assistantContent,
              },
            });
          }

          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
