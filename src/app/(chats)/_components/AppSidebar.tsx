"use client";

import * as React from "react";
import {
  Command,
  Dot,
  MoreHorizontal,
  Plus,
  Sparkle,
  Sparkles,
  Trash2,
} from "lucide-react";

import { NavUser } from "./NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { SearchForm } from "./SearchForm";
import { LoginButton } from "@/app/(chats)/_components/LoginButton";
import { Session } from "@/lib/auth";
import { DrizzleChat } from "@/lib/db/schema";
import { useChatContext } from "@/contexts/ChatContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AppSidebarProps {
  session: Session | null;
  chats?: DrizzleChat[];
}

export function AppSidebar({
  session,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const { chats, updateChat } = useChatContext();
  const [isUpdating, setIsUpdating] = React.useState<string | null>(null);

  const userData = {
    email: session?.user.email ?? "",
    name: session?.user.name ?? "",
    avatar: session?.user.image ?? "",
  };

  async function handleClick(chatId: string): Promise<void> {
    setIsUpdating(chatId);

    try {
      const response = await fetch("/api/chat/title/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          userId: chats[0].userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        updateChat(chatId, { title: data.title });
      } else {
        console.error("Failed to update title");
      }
    } catch (error) {
      console.error("Error updating title:", error);
    } finally {
      setIsUpdating(null);
    }
  }

  return (
    <TooltipProvider>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="bg-blue-700 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">TChat</span>
                    <span className="truncate text-xs">Free Plan</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="gap-0">
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                size="lg"
                variant="outline"
                className="flex items-center justify-center text-center text-foreground border mb-2 bg-blue-700 hover:bg-blue-700/80"
              >
                <Link href={`/chat/new`}>
                  <span>New Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SearchForm className="mb-4" />
            {chats.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/chat/${item.id}`}>
                    {isUpdating === item.id ? (
                      <Skeleton className="h-4 w-full" />
                    ) : (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate">{item.title}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction>
                      <MoreHorizontal />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem
                      onClick={() => handleClick(item.id)}
                      disabled={isUpdating === item.id}
                    >
                      <Sparkles />
                      <span>
                        {isUpdating === item.id
                          ? "Updating..."
                          : "Update Title"}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 />
                      <span>Delete Thread</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {session ? <NavUser user={userData} /> : <LoginButton />}
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
}
