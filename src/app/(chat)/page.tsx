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

const models = [
  { id: "gpt-4o", name: "GPT-5-mini" },

];
export default function ChatPage() {
  const [text, setText] = useState<string>("");
  const [model, setModel] = useState<string>(models[0].id);
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text) {
      return;
    }
    setStatus("submitted");
    // setTimeout(() => {
    //   setStatus("streaming");
    // }, 200);

    sendMessage({ text: text });
    // setTimeout(() => {
    //   setStatus("ready");
    //   setText("");
    // }, 2000);
    setStatus("ready");
    setText("");
  };

  const { messages, sendMessage } = useChat();
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col  w-full">
        <SidebarInset>
          <header className="flex justify-end items-center p-2 gap-2 h-16">
            <SidebarTrigger className="size-4" />

            <div className="flex items-center justify-end gap-2 w-full">
              <ModeToggle />
              <SignedOut>
                <Link
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
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

          <div className="h-[calc(100vh-8rem)]">
            <Conversation >
              <ConversationContent>
                {messages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return <div key={`${message.id}-${i}`}>{part.text}</div>;
                        }
                      })}
                    </MessageContent>
                  </Message>
                ))}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
          </div>
          <div className="flex justify-center items-center relative overflow-y-scroll">
            <div className="p-8 w-3xl fixed bottom-0">
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
                    <PromptInputModelSelect
                      onValueChange={setModel}
                      value={model}
                    >
                      <PromptInputModelSelectTrigger>
                        <PromptInputModelSelectValue />
                      </PromptInputModelSelectTrigger>
                      <PromptInputModelSelectContent>
                        {models.map((model) => (
                          <PromptInputModelSelectItem
                            key={model.id}
                            value={model.id}
                          >
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
