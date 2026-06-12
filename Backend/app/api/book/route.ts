import { NextRequest } from "next/server";
import { bookPatient } from "@/lib/queue";
import { successResponse, errorResponse } from "@/lib/middleware";

// ─── POST /api/book (public) ──────────────────────────────────────────────────
// Allows any patient to book a queue number. No authentication required.
// Accepts optional appointmentDate (YYYY-MM-DD); defaults to today.

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400, "INVALID_JSON");
  }

  const { name, appointmentDate } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return errorResponse(
      "Field 'name' is required and must be a non-empty string.",
      400,
      "MISSING_NAME"
    );
  }

  if (name.trim().length > 100) {
    return errorResponse(
      "Name must be 100 characters or fewer.",
      400,
      "NAME_TOO_LONG"
    );
  }

  // Validate appointmentDate format if provided
  if (appointmentDate !== undefined) {
    if (
      typeof appointmentDate !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)
    ) {
      return errorResponse(
        "Field 'appointmentDate' must be a valid date string in YYYY-MM-DD format.",
        400,
        "INVALID_DATE"
      );
    }
  }

  const patient = bookPatient(name, appointmentDate as string | undefined);

  return successResponse(
    {
      patient,
      message: `Queue number ${patient.queueNumber} has been assigned to ${patient.name}.`,
    },
    "Booking successful",
    201
  );
}
