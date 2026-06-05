import { NextRequest } from "next/server";
import { getAvailableSlots } from "@/lib/slots";
import { successResponse, errorResponse } from "@/lib/middleware";

// ─── GET /api/slots (public) ──────────────────────────────────────────────────
// Returns available appointment slots for a given date.
//
// Query params:
//   date  — required, YYYY-MM-DD format
//
// Success (200):
//   { success: true, data: { date, availableSlots: ["09:00", ...] } }

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return errorResponse(
      "Query parameter 'date' is required.",
      400,
      "MISSING_APPOINTMENT_DATE"
    );
  }

  if (!ISO_DATE_RE.test(date) || isNaN(Date.parse(date))) {
    return errorResponse(
      "Query parameter 'date' must be a valid date in YYYY-MM-DD format.",
      400,
      "INVALID_APPOINTMENT_DATE"
    );
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  if (date < todayStr) {
    return errorResponse(
      "Cannot query available slots for a past date.",
      400,
      "PAST_APPOINTMENT_DATE"
    );
  }

  const availableSlots = getAvailableSlots(date);

  return successResponse({ date, availableSlots });
}
