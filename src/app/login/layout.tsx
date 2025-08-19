import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "ghost",
          size: "default",
          class: "m-4",
        })}
      >
        <ArrowLeft size="icon"></ArrowLeft>Back to chats
      </Link>
      {children}
    </div>
  );
}
