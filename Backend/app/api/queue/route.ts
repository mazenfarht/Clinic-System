import { NextRequest } from "next/server";
import { getQueueSnapshot } from "@/lib/queue";
import { getTodayDate } from "@/lib/store";
import { successResponse } from "@/lib/middleware";

// ─── GET /api/queue (public) ──────────────────────────────────────────────────
// Returns the queue state for a specific date.
// Accepts optional ?date=YYYY-MM-DD query param.
// Defaults to today's date if no date is provided.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  // Use provided date or fall back to today
  const date = dateParam || getTodayDate();

  const snapshot = getQueueSnapshot(date);
  return successResponse(snapshot);
}
