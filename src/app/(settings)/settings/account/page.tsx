import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Profile from "../_components/Profile";
import { Suspense } from "react";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import PrivacyToggle from "./privacy-toggle";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoint might require headers
  });

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        <Suspense fallback={<TypingIndicator />}>
          <Profile session={session}></Profile>
        </Suspense>
        <Tabs defaultValue="account" className="w-full px-4 lg:px-8">
          <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide">
            <TabsTrigger
              value="account"
              className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="customization"
              className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              Customization
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              History & Sync
            </TabsTrigger>
            <TabsTrigger
              value="models"
              className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              Models
            </TabsTrigger>
            <TabsTrigger
              value="keys"
              className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
            >
              Contact us
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <div className="flex flex-col gap-8 py-6">
              <section className="rounded-xl border bg-card text-card-foreground p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Privacy Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Blur personal info (email) in the UI for screenshots.
                    </p>
                  </div>
                  <PrivacyToggle />
                </div>
              </section>
              <section className="rounded-xl border bg-card text-card-foreground p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      Upgrade to Pro
                    </h3>
                    <p className="text-sm text-muted-foreground">$8/month</p>
                  </div>
                  <Button className="shrink-0 w-full sm:w-auto">Upgrade</Button>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium">Access to All Models</h4>
                    <p className="text-sm text-muted-foreground">
                      Get access to our full suite of models including Claude,
                      o3-mini-high, and more!
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Generous Limits</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive 1500 standard credits per month, plus 100 premium
                      credits* per month.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Priority Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Get faster responses and dedicated assistance from the
                      team whenever you need help!
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  *Premium credits are used for models marked with a gem icon in
                  the model selector. This includes: o3, Claude Sonnet, Gemini
                  2.5 Pro, GPT 5 (Reasoning), Grok 3/4, and all image generation
                  models. Additional Premium credits can be purchased separately
                  for $8 per 100.
                </p>
              </section>

              <section className="rounded-xl border bg-card text-card-foreground p-4 sm:p-6 shadow-sm">
                <h3 className="text-lg font-semibold">Billing Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Manage how we communicate with you about payments and
                  receipts.
                </p>
                <Separator className="my-4" />
                <div className="flex items-start gap-3">
                  <input
                    id="email-receipts"
                    type="checkbox"
                    className="h-4 w-4 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="email-receipts">Email me receipts</Label>
                    <p className="text-sm text-muted-foreground">
                      Send receipts to your account email when a payment
                      succeeds.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border bg-card text-card-foreground p-4 sm:p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-destructive">
                  Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
                <Separator className="my-4" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone. Please type your email to
                    confirm.
                  </p>
                  <div className="flex flex-col sm:flex-row w-full gap-2 sm:w-auto">
                    <Input
                      placeholder="your@email.com"
                      aria-label="Confirm email"
                      className="w-full sm:w-auto"
                    />
                    <Button variant="destructive" className="w-full sm:w-auto">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
