"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export const LoginButton = () => {
    return (
        <Button onClick={signIn}>Log in</Button>
    );
};
