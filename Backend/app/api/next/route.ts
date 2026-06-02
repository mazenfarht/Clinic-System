import { NextRequest } from "next/server";
import { advanceQueue } from "@/lib/queue";
import { requireAuth, successResponse } from "@/lib/middleware";

// ─── POST /api/next (protected) ───────────────────────────────────────────────
// Advances the queue to the next waiting patient.
// Requires a valid doctor JWT token.

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof Response) return auth;

  const nextPatient = advanceQueue();

  if (!nextPatient) {
    return successResponse(
      { currentPatient: null, queueEmpty: true },
      "No more patients in the waiting queue."
    );
  }

  return successResponse(
    { currentPatient: nextPatient, queueEmpty: false },
    `Now serving queue number ${nextPatient.queueNumber} — ${nextPatient.name}.`
  );
}
