import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

interface ChatSkeletonProps {
  className?: string;
}

export function ChatSkeleton({ className }: ChatSkeletonProps) {
  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Chat messages area */}
      <div className="flex-1 overflow-hidden">
        <div className="relative flex-1 overflow-y-auto">
          <div className="p-4 max-w-[80%] mx-auto space-y-6">
            {/* User message skeleton */}
            <div className="flex justify-end">
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-3 w-24 bg-primary/10 rounded-full animate-pulse" />
                <Skeleton className="h-16 w-64 rounded-2xl bg-primary/5 animate-pulse" />
              </div>
            </div>

            {/* Assistant message skeleton */}
            <div className="flex justify-start">
              <div className="max-w-[70%] space-y-3">
                <Skeleton className="h-3 w-20 bg-muted/50 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg animate-pulse" />
                  <Skeleton className="h-4 w-5/6 rounded-lg animate-pulse" />
                  <Skeleton className="h-4 w-4/5 rounded-lg animate-pulse" />
                  <Skeleton className="h-4 w-3/4 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-6 w-12 rounded-full bg-muted/30 animate-pulse" />
                  <Skeleton className="h-6 w-12 rounded-full bg-muted/30 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Another user message */}
            <div className="flex justify-end">
              <div className="max-w-[70%] space-y-2">
                <Skeleton className="h-3 w-28 bg-primary/10 rounded-full animate-pulse" />
                <Skeleton className="h-12 w-48 rounded-2xl bg-primary/5 animate-pulse" />
              </div>
            </div>

            {/* Assistant response skeleton */}
            <div className="flex justify-start">
              <div className="max-w-[70%] space-y-3">
                <Skeleton className="h-3 w-20 bg-muted/50 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg animate-pulse" />
                  <Skeleton className="h-4 w-5/6 rounded-lg animate-pulse" />
                  <Skeleton className="h-4 w-4/5 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2 mt-3">
                  <Skeleton className="h-6 w-12 rounded-full bg-muted/30 animate-pulse" />
                  <Skeleton className="h-6 w-12 rounded-full bg-muted/30 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Typing indicator skeleton */}
            <div className="flex justify-start">
              <div className="max-w-[70%] space-y-3">
                <Skeleton className="h-3 w-20 bg-muted/50 rounded-full animate-pulse" />
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-muted/40 animate-pulse" />
                    <div
                      className="h-2 w-2 rounded-full bg-muted/40 animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="h-2 w-2 rounded-full bg-muted/40 animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input area skeleton */}
      <div className="flex-shrink-0 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Skeleton className="h-16 w-full rounded-2xl bg-muted/20 animate-pulse" />
            <div className="absolute right-3 top-3 flex gap-2">
              <Skeleton className="h-8 w-8 rounded-lg bg-muted/30 animate-pulse" />
              <Skeleton className="h-8 w-8 rounded-lg bg-muted/30 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Typing indicator skeleton
export function TypingSkeleton() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[70%] space-y-3">
        <Skeleton className="h-4 w-24 bg-muted" />
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <Skeleton className="h-2 w-2 rounded-full animate-pulse" />
            <Skeleton
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <Skeleton
              className="h-2 w-2 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
