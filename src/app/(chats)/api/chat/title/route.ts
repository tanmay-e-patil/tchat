import { db } from "@/lib/db/db";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Cache configuration
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface AIChatRequestProps {
  chatId: string;
  userId: string;
}

export async function POST(req: Request) {
  const { chatId, userId }: AIChatRequestProps = await req.json();
  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.id, chatId))
    .execute();

  if (_chats.length != 1) {
    // chat should exists
    return new NextResponse();
  }

  const messages = await db
    .select()
    .from(_messages)
    .where(eq(_messages.chatId, chatId))
    .execute();

  // Check if there are any messages
  if (messages.length === 0) {
    return new NextResponse("No messages found", { status: 400 });
  }

  // Format all messages for the title generation
  const conversationText = messages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const systemPrompt = `Please create a title for this conversation based on the entire message thread.
Conversation:
${conversationText}

Instructions:
Titles must be 10 words or less.

The title should accurately reflect the conversation's main topic and overall theme.

Use an active voice.

Be concise and clear.

Do not use punctuation at the end of the title.`;

  try {
    const result = await generateText({
      model: google("gemini-2.5-flash-lite"),
      messages: [
        {
          role: "user",
          content: conversationText,
        },
      ],
      system: systemPrompt,
    });

    const newTitle = result.text.trim();

    // Update the chat title in the database
    await db
      .update(chats)
      .set({
        title: newTitle,
        updatedAt: new Date(),
      })
      .where(eq(chats.id, chatId));

    // Return the generated title
    return NextResponse.json({ title: newTitle });
  } catch (error) {
    console.error("Error generating title:", error);
    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 }
    );
  }
}
