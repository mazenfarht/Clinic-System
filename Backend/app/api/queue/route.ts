import { NextRequest } from "next/server";
import { getQueueSnapshot } from "@/lib/queue";
import { successResponse } from "@/lib/middleware";

// ─── GET /api/queue (public) ──────────────────────────────────────────────────
// Returns the full current queue state. No authentication required.

export async function GET(_request: NextRequest) {
  const snapshot = getQueueSnapshot();
  return successResponse(snapshot);
}
