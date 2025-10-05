"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Session } from "@/lib/auth";
import Image from "next/image";

interface ProfileProps {
  session: Session | null;
}

export default function Profile(props: ProfileProps) {
  const [used, setUsed] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [resetAt, setResetAt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isActive = true;
    const loadUsage = async () => {
      try {
        const res = await fetch("/api/usage", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!isActive) return;
        setUsed(Number(data.used ?? 0));
        setLimit(Number(data.limit ?? 20));
        setResetAt(String(data.resetAt ?? null));
      } catch (e) {
        // ignore
      } finally {
        if (isActive) setLoading(false);
      }
    };
    loadUsage();
    return () => {
      isActive = false;
    };
  }, []);

  const profileImageUrl =
    props.session?.user.image?.replace("s96-c", "s384-c") ?? "";

  const remaining = Math.max(0, limit - used);
  const percentage = Math.min(100, Math.max(0, (used / (limit || 1)) * 100));

  const formatResetDescription = () => {
    if (!resetAt) return "Resets daily at 5:00 PM";
    const resetDate = new Date(resetAt);
    const now = new Date();
    const isSameDay =
      resetDate.getFullYear() === now.getFullYear() &&
      resetDate.getMonth() === now.getMonth() &&
      resetDate.getDate() === now.getDate();
    const dayLabel = isSameDay ? "today" : "tomorrow";
    const timeStr = resetDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return `Resets ${dayLabel} at ${timeStr}`;
  };
  return (
    <div className="md:max-w-[20%] sm:w-full mx-8">
      <div className="flex flex-col justify-center items-center pii-blur">
        <Image
          src={profileImageUrl}
          alt={"Profile image"}
          width={192}
          height={192}
          className="rounded-full"
        ></Image>
        <h1 className="mt-4 font-bold text-2xl">{props.session?.user.name}</h1>
        <h2 className="text-accent-foreground text-sm mb-2">
          {props.session?.user.email}
        </h2>
        <h2 className="text-accent-foreground text-xs bg-red-700 rounded-full p-2">
          Free Plan
        </h2>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Message Usage</CardTitle>
            <CardDescription>{formatResetDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Standard</span>
              <span className="font-medium">
                {loading ? "—/—" : `${used}/${limit}`}
              </span>
            </div>
            <Progress value={loading ? 0 : percentage} className="h-2" />
            <div className="mt-2 text-xs text-muted-foreground">
              {loading ? "Loading usage..." : `${remaining} messages remaining`}
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Each tool call (e.g. search grounding) used in a reply consumes an
              additional standard credit. Models may not always utilize enabled
              tools.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
