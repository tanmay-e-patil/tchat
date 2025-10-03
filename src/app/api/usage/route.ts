import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { messages } from "@/lib/db/schema";
import { and, eq, gte, count as _count } from "drizzle-orm";

function getLastResetAtFivePM(now: Date): Date {
  const lastReset = new Date(now);
  lastReset.setMinutes(0, 0, 0);
  lastReset.setHours(17); // 5 PM local time
  if (now < lastReset) {
    // use yesterday 5 PM
    lastReset.setDate(lastReset.getDate() - 1);
  }
  return lastReset;
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const periodStart = getLastResetAtFivePM(now);

  // Basic free plan limit; adjust if plans are added later
  const limit = 5;

  const [{ count }] = (await db
    .select({ count: _count(messages.id) })
    .from(messages)
    .where(
      and(
        eq(messages.userId, session.user.id),
        eq(messages.role, "user"),
        gte(messages.createdAt, periodStart)
      )
    )) as unknown as Array<{ count: number }>;

  const used = Number(count ?? 0);
  const remaining = Math.max(0, limit - used);

  console.log("num_messages", count);

  return NextResponse.json({
    used,
    limit,
    remaining,
    periodStart: periodStart.toISOString(),
    resetAt: (() => {
      const nextReset = new Date(periodStart);
      nextReset.setDate(periodStart.getDate() + 1);
      return nextReset.toISOString();
    })(),
    now: now.toISOString(),
  });
}
