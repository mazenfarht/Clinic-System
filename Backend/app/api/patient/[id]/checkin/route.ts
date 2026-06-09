import { NextRequest } from "next/server";
import { checkInPatient } from "@/lib/queue";
import { requireAuth, successResponse, errorResponse } from "@/lib/middleware";

// ─── POST /api/patient/[id]/checkin (protected) ─────────────────────────────
// Moves patient from "scheduled" → "waiting"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof Response) return auth;

  const { id } = await params;

  if (!id || id.trim().length === 0) {
    return errorResponse("Patient ID is required.", 400, "MISSING_ID");
  }

  const patient = checkInPatient(id);

  if (!patient) {
    return errorResponse(
      "Patient not found or not in scheduled state.",
      404,
      "PATIENT_NOT_FOUND"
    );
  }

  return successResponse(
    {
      patient,
      movedBy: auth.payload.username,
      movedAt: new Date().toISOString(),
    },
    "Patient checked in successfully (scheduled → waiting)."
  );
}
