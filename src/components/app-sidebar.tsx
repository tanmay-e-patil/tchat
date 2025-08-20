import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LogInIcon } from "lucide-react";

export function AppSidebar() {
  const { user } = useUser();
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <Link href="/chat">Chat</Link>
        </SidebarGroup>

      </SidebarContent >
      <SidebarFooter>
        <SignedIn>
          {/* Get user information */}
          <div className="flex items-center gap-3 w-full">
            <UserButton appearance={{ elements: { avatarBox: "w-24 h-24" } }} />
            <div className="text-sm">
              {user && (
                <div>
                  <p>{user.fullName}</p>
                  <p>{user.emailAddresses[0].emailAddress}</p>
                </div>
              )}

            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="w-full">
            <Link
              href="/login"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "w-full",
              })}
            >
              <div className="flex w-full items-center justify-center gap-3">
                <LogInIcon className="size-4" />
                Login
              </div>
            </Link>
          </div>
        </SignedOut>
      </SidebarFooter>
    </Sidebar >
  );
}
