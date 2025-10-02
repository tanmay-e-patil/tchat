import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { chats } from "@/lib/db/schema";
import { AppSidebar } from "../../_components/AppSidebar";
import ChatComponentLazy from "../../_components/ChatComponentLazy";
import { ChatProvider } from "@/contexts/ChatContext";
import { desc } from "drizzle-orm";

const ChatPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoint might require headers
  });

  if (!session) {
    redirect("/auth/login");
  }

  const chat = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, session.user.id))
    .orderBy(desc(chats.updatedAt))
    .execute();

  const chatId = crypto.randomUUID();

  return (
    <ChatProvider initialChats={chat}>
      <div className="flex w-full h-screen">
        <AppSidebar session={session} chats={chat} />
        <main className="w-full h-full border flex flex-col">
          <div className="flex items-center p-2 border-b">
            <SidebarTrigger />
            <ModeToggle />
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatComponentLazy userId={session.user.id} chatId={chatId} />
          </div>
        </main>
      </div>
    </ChatProvider>
  );
};

export default ChatPage;
