import { db } from "@/lib/db/db";
import { google } from "@ai-sdk/google";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  smoothStream,
} from "ai";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Cache configuration
export const dynamic = "force-dynamic";
export const revalidate = 0;

function uiMessageToString(message: UIMessage): string {
  let fullText = "";
  for (const part of message.parts) {
    if (part.type === "text" || part.type === "reasoning") {
      fullText += part.text;
    }
    // You might also handle other part types if you want to include their data in the string
    // For example, if you have custom data parts, you could stringify them
  }
  return fullText;
}

interface AIChatRequestProps {
  messages: UIMessage[];
  chatId: string;
  userId: string;
}

export async function POST(req: Request) {
  const { messages, chatId, userId }: AIChatRequestProps = await req.json();
  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.id, chatId))
    .execute();

  if (_chats.length != 1) {
    // first time chat, create chat.
    await db.insert(chats).values({
      userId: userId,
      id: chatId,
      title: uiMessageToString(messages[0]),
    });
  }

  const lastMessage = uiMessageToString(messages.at(-1) as UIMessage);

  const systemPrompt = ``;

  let isUserMessageInserted = false;

  const result = streamText({
    model: google("gemini-2.5-flash-lite"),
    messages: convertToModelMessages(messages),
    system: systemPrompt,
    experimental_transform: smoothStream({
      delayInMs: 15,
      chunking: "word",
    }),
    onChunk: async () => {
      if (!isUserMessageInserted) {
        await db.insert(_messages).values({
          chatId: chatId,
          content: lastMessage,
          role: "user",
          userId: userId,
        });
        isUserMessageInserted = true;
      }
    },
    onFinish: async (e) => {
      console.log(e.usage.totalTokens);
    },
  });

  return result.toUIMessageStreamResponse({
    onFinish: async (response) => {
      await db.insert(_messages).values({
        chatId: chatId,
        content: uiMessageToString(response.responseMessage),
        role: "assistant",
        userId: userId,
      });
    },
  });
}
