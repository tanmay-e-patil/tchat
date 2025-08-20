"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputSubmit,
  PromptInputTools,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
} from "@/components/ui/shadcn-io/ai/prompt-input";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { MicIcon, PaperclipIcon, Settings2 } from "lucide-react";
import Link from "next/link";
import { FormEventHandler, useState } from "react";
import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ui/shadcn-io/ai/conversation";
import { Message, MessageContent } from "@/components/ui/shadcn-io/ai/message";
import { Response } from "@/components/ui/shadcn-io/ai/response";
import { Model } from "@/lib/types";


const models: Model[] = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "google" },
  { id: "gpt-5-mini", name: "GPT-5-mini", provider: "openai" },

];
export default function ChatPage() {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<Model>(models[0]);
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus("submitted");
    setStatus("streaming");

    sendMessage({ text: text, metadata: model });

    setStatus("ready");
    setText("");
  };

  const { messages, sendMessage } = useChat();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <SidebarInset className="flex flex-col w-full">
          <header className="flex justify-end items-center p-2 gap-2 h-16 shrink-0 border-b">
            <SidebarTrigger className="size-4" />
            <div className="flex items-center justify-end gap-2 w-full">
              <ModeToggle />
              <SignedOut>
                <Link
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                  href={"/login"}
                >
                  <Settings2 className="size-4" />
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
              <Conversation>
                <ConversationContent>
                  {messages.map((message) => (
                    <Message from={message.role} key={message.id}>
                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              );
                          }
                        })}
                      </MessageContent>
                    </Message>
                  ))}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </div>
            <div className="p-4 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="max-w-3xl mx-auto">
                <PromptInput onSubmit={handleSubmit}>
                  <PromptInputTextarea
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder="Type your message..."
                  />
                  <PromptInputToolbar>
                    <PromptInputTools>
                      <PromptInputButton>
                        <PaperclipIcon size={16} />
                      </PromptInputButton>
                      <PromptInputButton>
                        <MicIcon size={16} />
                        <span>Voice</span>
                      </PromptInputButton>
                      <PromptInputModelSelect onValueChange={(id) => {
                        const selected = models.find((m) => m.id === id);
                        if (selected) setModel(selected);
                      }}>
                        <PromptInputModelSelectTrigger>
                          <PromptInputModelSelectValue />
                        </PromptInputModelSelectTrigger>
                        <PromptInputModelSelectContent>
                          {models.map((model) => (
                            <PromptInputModelSelectItem key={model.id} value={model.id} onClick={() => setModel(model)}>
                              {model.name}
                            </PromptInputModelSelectItem>
                          ))}
                        </PromptInputModelSelectContent>
                      </PromptInputModelSelect>
                    </PromptInputTools>
                    <PromptInputSubmit disabled={!text} status={status} />
                  </PromptInputToolbar>
                </PromptInput>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div >
    </SidebarProvider >
  );
}
