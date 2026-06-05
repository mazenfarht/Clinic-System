import { NextRequest } from "next/server";
import { getAvailableSlots } from "@/lib/slots";
import { successResponse, errorResponse } from "@/lib/middleware";

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    // ─── Validation: required ─────────────────────
    if (!date) {
      return errorResponse(
        "Query parameter 'date' is required.",
        400,
        "MISSING_APPOINTMENT_DATE"
      );
    }

    // ─── Validation: format ───────────────────────
    if (!ISO_DATE_RE.test(date)) {
      return errorResponse(
        "Date must be in YYYY-MM-DD format.",
        400,
        "INVALID_APPOINTMENT_DATE"
      );
    }

    // ─── Validation: real date check ──────────────
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return errorResponse(
        "Invalid date provided.",
        400,
        "INVALID_APPOINTMENT_DATE"
      );
    }

    // ─── Prevent past dates (safe compare) ────────
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const input = new Date(date);
    input.setHours(0, 0, 0, 0);

    if (input < today) {
      return errorResponse(
        "Cannot query slots for past dates.",
        400,
        "PAST_APPOINTMENT_DATE"
      );
    }

    // ─── Core logic ───────────────────────────────
    const availableSlots = getAvailableSlots(date);

    return successResponse({
      date,
      availableSlots,
    });
  } catch (err: any) {
    console.log("Slots API Error:", err);

    return errorResponse(
      "Failed to fetch available slots.",
      500,
      "SLOTS_INTERNAL_ERROR"
    );
  }
}
