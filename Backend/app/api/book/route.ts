import { NextRequest } from "next/server";
import { bookPatient } from "@/lib/queue";
import { successResponse, errorResponse } from "@/lib/middleware";

// ─── POST /api/book (public) ──────────────────────────────────────────────────
// Allows any patient to book a queue number. No authentication required.

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400, "INVALID_JSON");
  }

  const { name } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return errorResponse(
      "Field 'name' is required and must be a non-empty string.",
      400,
      "MISSING_NAME"
    );
  }

  if (name.trim().length > 100) {
    return errorResponse("Name must be 100 characters or fewer.", 400, "NAME_TOO_LONG");
  }

  const patient = bookPatient(name);

  return successResponse(
    {
      patient,
      message: `Queue number ${patient.queueNumber} has been assigned to ${patient.name}.`,
    },
    "Booking successful",
    201
  );
}
