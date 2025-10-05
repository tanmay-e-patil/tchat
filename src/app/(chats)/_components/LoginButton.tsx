"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

type LoginButtonProps = {
  text?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export const LoginButton = ({
  text = "Log in",
  width,
  height,
  className,
}: LoginButtonProps) => {
  return (
    <Button onClick={signIn} className={className} style={{ width, height }}>
      {text}
    </Button>
  );
};
