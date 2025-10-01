"use client";
import { SignOutButton } from "./SignOutButton";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsNavbar() {
  const router = useRouter();
  return (
    <div className="flex justify-between mb-8">
      <Button variant={"ghost"} size={"lg"} onClick={() => router.back()}>
        <ArrowLeft />
        Back to chat
      </Button>

      <div className="flex gap-2 justify-center items-center">
        <ModeToggle />
        <SignOutButton />
      </div>
    </div>
  );
}
