import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
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
    .limit(1)
    .execute();

  if (chat.length > 0) {
    redirect(`/chat/${chat[0].id}`);
  } else {
    redirect(`/chat/new`);
  }
};

export default ChatPage;
