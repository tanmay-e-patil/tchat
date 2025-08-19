import { AppSidebar } from "@/components/app-sidebar";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Settings2 } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
