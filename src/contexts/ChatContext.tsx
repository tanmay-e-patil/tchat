"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { DrizzleChat } from "../../schema";

interface ChatContextType {
  chats: DrizzleChat[];
  addChat: (chat: DrizzleChat) => void;
  updateChat: (chatId: string, updates: Partial<DrizzleChat>) => void;
  setChats: (chats: DrizzleChat[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  initialChats,
}: {
  children: React.ReactNode;
  initialChats: DrizzleChat[];
}) {
  const [chats, setChatsState] = useState<DrizzleChat[]>(initialChats);

  const addChat = useCallback((chat: DrizzleChat) => {
    setChatsState((prev) => {
      // Check if chat already exists to avoid duplicates
      const exists = prev.some((c) => c.id === chat.id);
      if (exists) return prev;
      return [chat, ...prev];
    });
  }, []);

  const updateChat = useCallback(
    (chatId: string, updates: Partial<DrizzleChat>) => {
      setChatsState((prev) =>
        prev.map((chat) =>
          chat.id === chatId ? { ...chat, ...updates } : chat
        )
      );
    },
    []
  );

  const setChats = useCallback((newChats: DrizzleChat[]) => {
    setChatsState(newChats);
  }, []);

  return (
    <ChatContext.Provider value={{ chats, addChat, updateChat, setChats }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
