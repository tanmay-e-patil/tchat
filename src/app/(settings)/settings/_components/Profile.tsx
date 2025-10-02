"use client";
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
  const profileImageUrl =
    props.session?.user.image?.replace("s96-c", "s384-c") ?? "";
  return (
    <div className="md:max-w-[20%] sm:w-full mx-8">
      <div className="flex flex-col justify-center items-center">
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
            <CardDescription>Resets today at 4:59 PM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Standard</span>
              <span className="font-medium">10/20</span>
            </div>
            <Progress value={(10 / 20) * 100} className="h-2" />
            <div className="mt-2 text-xs text-muted-foreground">
              20 messages remaining
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
