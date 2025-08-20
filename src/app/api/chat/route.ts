import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { Model } from '@/lib/types';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const metadata = messages[messages.length - 1].metadata as Model;

  const systemPrompt = "You are a helpful AI assistant. Answer the user's questions to the best of your ability. Your job is to always answer in markdown format";

  if (metadata.provider === 'openai') {
    return streamText({
      model: openai(metadata.id),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    }).toUIMessageStreamResponse();
  } else {
    return streamText({
      model: google(metadata.id),
      system: systemPrompt,
      messages: convertToModelMessages(messages),
    }).toUIMessageStreamResponse();
  }
}