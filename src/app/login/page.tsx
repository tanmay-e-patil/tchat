"use client";
import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { experimental__simple, dark } from "@clerk/themes";

export default function LoginPage() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex justify-center items-center w-full h-full m-auto min-h-screen">
      <SignIn
        routing="hash"
        appearance={{
          baseTheme:
            resolvedTheme === "dark"
              ? dark // or use a valid BaseTheme object for dark mode
              : experimental__simple, // or use a valid BaseTheme object for light mode
        }}
      ></SignIn>
    </div>
  );
}
