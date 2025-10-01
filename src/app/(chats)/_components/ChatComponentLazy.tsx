"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import { DrizzleMessages } from "../../../../schema";
import { ChatSkeleton } from "@/components/ui/chat-skeleton";

// Lazy load the heavy ChatComponent
const ChatComponent = lazy(() => import("./ChatComponent"));

interface ChatComponentLazyProps {
  userId: string;
  chatId: string;
  initialMessages?: DrizzleMessages[];
}

const ChatComponentLazy = (props: ChatComponentLazyProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="h-full transition-smooth">
          <ChatSkeleton />
        </div>
      }
    >
      <div
        className={`h-full transition-slow ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <ChatComponent {...props} />
      </div>
    </Suspense>
  );
};

export default ChatComponentLazy;
