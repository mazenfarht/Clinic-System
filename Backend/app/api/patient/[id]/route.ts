import { NextRequest } from "next/server";
import { removePatient } from "@/lib/queue";
import { requireAuth, successResponse, errorResponse } from "@/lib/middleware";

// ─── DELETE /api/patient/[id] (protected) ─────────────────────────────────────
// Removes a specific patient from the queue by their UUID.
// Requires a valid doctor JWT token.

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(request);
  if (auth instanceof Response) return auth;

  const { id } = await params;

  if (!id || id.trim().length === 0) {
    return errorResponse("Patient ID is required.", 400, "MISSING_ID");
  }

  const removed = removePatient(id);

  if (!removed) {
    return errorResponse(
      `No patient found with ID: ${id}`,
      404,
      "PATIENT_NOT_FOUND"
    );
  }

  return successResponse(
    { removedId: id, removedBy: auth.payload.username, removedAt: new Date().toISOString() },
    "Patient has been removed from the queue."
  );
}
