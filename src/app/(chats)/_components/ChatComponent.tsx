"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Actions, Action } from "@/components/ai-elements/actions";
import { Fragment, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Response } from "@/components/ai-elements/response";
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from "lucide-react";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { DrizzleMessages } from "@/lib/db/schema";
import { useChatContext } from "@/contexts/ChatContext";

const models = [
  {
    name: "Gemini 2.5 Flash Lite",
    value: "google/gemini-2.5-flash-lite",
  },
];
import { useEffect } from "react";
import { toast } from "sonner";

interface ChatComponentProps {
  userId: string;
  chatId: string;
  initialMessages?: DrizzleMessages[];
}

const ChatComponent = (props: ChatComponentProps) => {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, setMessages, error } = useChat();
  const [limitError, setLimitError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const { addChat } = useChatContext();

  // Only set initial messages once, on mount
  useEffect(() => {
    if (props.initialMessages) {
      // Convert DrizzleMessages[] to the expected UIMessage[] format if needed
      // Here we assume DrizzleMessages has the required fields, but 'parts' is missing
      // We'll map content to parts as a single text part
      setMessages(
        props.initialMessages.map((msg) => ({
          ...msg,
          role: msg.role,
          id: msg.id,
          parts: [{ type: "text", text: msg.content }],
        }))
      );
    }
  }, [props.initialMessages, setMessages]);

  // Monitor for new chat creation when first message is sent
  useEffect(() => {
    if (
      messages.length === 1 &&
      messages[0].role === "user" &&
      !props.initialMessages
    ) {
      // This is a new chat, add it to the context
      const firstPart = messages[0].parts[0];
      const title =
        firstPart && "text" in firstPart ? firstPart.text : "New Chat";
      const newChat = {
        id: props.chatId,
        title: title,
        userId: props.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addChat(newChat);
    }
  }, [messages, props.chatId, props.userId, props.initialMessages, addChat]);

  // Monitor for usage limit errors
  useEffect(() => {
    if (error) {
      const errorMessage = error.message || error.toString();
      if (
        errorMessage.includes("USAGE_LIMIT_EXCEEDED") ||
        errorMessage.toLowerCase().includes("limit") ||
        errorMessage.includes("Free plan limit exceeded")
      ) {

        toast.error(
          "Free plan limit exceeded. Please upgrade to Pro for more messages.",
          {
            duration: 6000,
          }
        );
      }
    }
  }, [error]);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }
    setLimitError(null);
    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
          chatId: props.chatId,
          userId: props.userId,
          initialMessages: props.initialMessages,
        },
      }
    );
    setInput("");
    setLastUserMessage(message.text || "");
    if (!props.initialMessages) {
      window.history.pushState(null, "", `${props.chatId}`);
    }
  };

  const regenerate = () => {
    sendMessage({
      text: lastUserMessage || "",
      files: [],
    });
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <Conversation className="h-full">
          <ConversationContent className="max-w-[80%] mx-auto">
            {/* {limitError && (
              <div className="mb-3 text-sm text-red-600">{limitError}</div>
            )} */}
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "assistant" &&
                  message.parts.filter((part) => part.type === "source-url")
                    .length > 0 && (
                    <Sources>
                      <SourcesTrigger
                        count={
                          message.parts.filter(
                            (part) => part.type === "source-url"
                          ).length
                        }
                      />
                      {message.parts
                        .filter((part) => part.type === "source-url")
                        .map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                    </Sources>
                  )}
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <Response>{part.text}</Response>
                            </MessageContent>
                          </Message>
                          {message.role === "assistant" &&
                            i === messages.length - 1 && (
                              <Actions>
                                <Action
                                  onClick={() => regenerate()}
                                  label="Retry"
                                >
                                  <RefreshCcwIcon className="size-3" />
                                </Action>
                                <Action
                                  onClick={() =>
                                    navigator.clipboard.writeText(part.text)
                                  }
                                  label="Copy"
                                >
                                  <CopyIcon className="size-3" />
                                </Action>
                              </Actions>
                            )}
                        </Fragment>
                      );
                    case "reasoning":
                      return (
                        <Reasoning
                          key={`${message.id}-${i}`}
                          className="w-full"
                          isStreaming={
                            status === "streaming" &&
                            i === message.parts.length - 1 &&
                            message.id === messages.at(-1)?.id
                          }
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {status === "submitted" && <TypingIndicator />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      <div className="flex-shrink-0 p-3 sm:p-6">
        <PromptInput
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto"
          globalDrop
          multiple
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
          </PromptInputBody>
          <PromptInputToolbar className="flex items-center justify-evenly">
            <PromptInputActionMenu>
              <PromptInputActionMenuTrigger />
              <PromptInputActionMenuContent>
                <PromptInputActionAddAttachments />
              </PromptInputActionMenuContent>
            </PromptInputActionMenu>

            <PromptInputButton
              variant={webSearch ? "default" : "ghost"}
              onClick={() => setWebSearch(!webSearch)}
              className="hidden sm:flex"
            >
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>

            <PromptInputButton
              variant={webSearch ? "default" : "ghost"}
              onClick={() => setWebSearch(!webSearch)}
              className="sm:hidden"
            >
              <GlobeIcon size={16} />
            </PromptInputButton>

            <div className="hidden sm:block">
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </div>

            <div className="sm:hidden">
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem
                      key={model.value}
                      value={model.value}
                    >
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </div>

            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatComponent;
