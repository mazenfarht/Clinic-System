import { NextRequest } from "next/server";
import { bookPatient, validateBookingInput } from "@/lib/queue";
import { successResponse, errorResponse } from "@/lib/middleware";

// ─── POST /api/book (public) ──────────────────────────────────────────────────
// Allows any patient to book an appointment slot.
// No authentication required.
//
// Request body:
//   { name, phone, appointmentDate, appointmentTime }
//
// Success (201):
//   { success: true, message: "Appointment booked successfully.", data: { patient } }

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body.", 400, "INVALID_JSON");
  }

  const input = body as Record<string, unknown>;

  const validation = validateBookingInput({
    name: input.name as string,
    phone: input.phone as string,
    appointmentDate: input.appointmentDate as string,
    appointmentTime: input.appointmentTime as string,
  });

  if (!validation.valid) {
    return errorResponse(validation.error, 400, validation.code);
  }

  const patient = bookPatient({
    name: input.name as string,
    phone: input.phone as string,
    appointmentDate: input.appointmentDate as string,
    appointmentTime: input.appointmentTime as string,
  });

  return successResponse({ patient }, "Appointment booked successfully.", 201);
}
