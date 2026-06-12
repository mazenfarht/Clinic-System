import { NextRequest } from "next/server";
import { advanceQueue } from "@/lib/queue";
import { getTodayDate } from "@/lib/store";
import { requireAuth, successResponse } from "@/lib/middleware";

// ─── POST /api/next (protected) ───────────────────────────────────────────────
// Advances the queue to the next waiting patient for a specific date.
// Accepts optional ?date=YYYY-MM-DD query param; defaults to today.
// Requires a valid doctor JWT token.

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof Response) return auth;

  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const date = dateParam || getTodayDate();

  const nextPatient = advanceQueue(date);

  if (!nextPatient) {
    return successResponse(
      { currentPatient: null, queueEmpty: true, date },
      "No more patients in the waiting queue."
    );
  }

  return successResponse(
    { currentPatient: nextPatient, queueEmpty: false, date },
    `Now serving queue number ${nextPatient.queueNumber} — ${nextPatient.name}.`
  );
}
