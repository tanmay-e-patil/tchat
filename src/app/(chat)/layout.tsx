import { AppSidebar } from "@/components/app-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Settings2 } from "lucide-react";

import Link from "next/link";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
