import { AppSidebar } from "@/app/(chats)/_components/AppSidebar";
import { LoginButton } from "@/app/(chats)/_components/LoginButton";
import { ModeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ChatProvider } from "@/contexts/ChatContext";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <ChatProvider initialChats={[]}>
      <div className=" w-full flex justify-center items-center h-screen">
        {/* <AppSidebar session={null} chats={[]} /> */}
        <main className="w-full h-full border flex flex-col">
          <div className="flex items-center p-2 border-b">
            {/* <SidebarTrigger /> */}
            <ModeToggle />
          </div>
          <div className="flex-1 overflow-auto">
            <div className="mx-auto max-w-6xl px-6 py-8 md:py-12 grid gap-8 md:gap-12 md:grid-cols-2 items-center">
              {/* Left: Hero + Features */}
              <div className="space-y-6">
                <Badge className="w-fit" variant="secondary">
                  New
                </Badge>
                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                    Chat smarter. Build faster.
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Your AI workspace for brainstorming, coding, and getting
                    answers without the busywork.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/globe.svg"
                      alt="Realtime"
                      width={24}
                      height={24}
                    />
                    <div>
                      <p className="font-medium">Realtime conversations</p>
                      <p className="text-sm text-muted-foreground">
                        Fast, contextual replies tailored to your work.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      src="/window.svg"
                      alt="Artifacts"
                      width={24}
                      height={24}
                    />
                    <div>
                      <p className="font-medium">Shareable outputs</p>
                      <p className="text-sm text-muted-foreground">
                        Code, docs, and snippets you can reuse instantly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      src="/file.svg"
                      alt="Memory"
                      width={24}
                      height={24}
                    />
                    <div>
                      <p className="font-medium">Stay organized</p>
                      <p className="text-sm text-muted-foreground">
                        Keep chats, drafts, and ideas in one place.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {/* <Button asChild size="lg"> */}
                  {/* Primary CTA uses existing auth flow */}
                  <span>
                    <LoginButton width={100} text="Get Started" />
                  </span>
                  {/* </Button> */}
                  <Button variant="outline" size="lg" asChild>
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
              </div>

              {/* Right: Auth Card */}
              {/* <Card className="border-muted">
                <CardHeader>
                  <CardTitle>Welcome to TChat</CardTitle>
                  <CardDescription>
                    Sign in to start your first conversation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border bg-muted/20 p-4 flex items-center gap-4">
                    <Image
                      src="/next.svg"
                      alt="Preview"
                      width={32}
                      height={32}
                    />
                    <div className="text-sm text-muted-foreground">
                      Lightning-fast UI powered by Next.js and modern tooling.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Image
                      src="/vercel.svg"
                      alt="Deploy"
                      width={24}
                      height={24}
                    />
                    <p className="text-sm text-muted-foreground">
                      Deploy-ready and privacy-friendly by default.
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Get started</p>
                    <LoginButton />
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  By continuing you agree to our terms and privacy policy.
                </CardFooter>
              </Card> */}
            </div>

            {/* How it works anchor */}
            <div id="how-it-works" className="mx-auto max-w-6xl px-6 pb-12">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="rounded-lg border p-5">
                  <p className="text-sm font-medium mb-1">1. Ask</p>
                  <p className="text-sm text-muted-foreground">
                    Describe what you need in plain language.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <p className="text-sm font-medium mb-1">2. Iterate</p>
                  <p className="text-sm text-muted-foreground">
                    Refine ideas with quick follow-ups and examples.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <p className="text-sm font-medium mb-1">3. Ship</p>
                  <p className="text-sm text-muted-foreground">
                    Copy results into your workflow and keep moving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ChatProvider>
  );
}
