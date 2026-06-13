import { store } from "@/lib/store";
import { NextResponse } from "next/server";

// ─── GET /api/patient ─────────────────────────────────────
// Returns all patients across all dates.

export async function GET() {
  const allPatients = Object.values(store.queues).flatMap(
    (queue) => queue.patients
  );

  return NextResponse.json({
    success: true,
    data: allPatients,
  });
}
