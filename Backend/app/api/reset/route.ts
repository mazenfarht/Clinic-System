import { NextRequest } from "next/server";
import { resetStore } from "@/lib/store";
import { requireAuth, successResponse } from "@/lib/middleware";

// ─── POST /api/reset (protected) ─────────────────────────────────────────────
// Clears all queue data and resets counters to initial state.
// Requires a valid doctor JWT token.

export async function POST(request: NextRequest) {
  const auth = await requireAuth(request);
  if (auth instanceof Response) return auth;

  resetStore();

  return successResponse(
    {
      resetAt: new Date().toISOString(),
      resetBy: auth.payload.username,
    },
    "Queue has been fully reset. All data cleared."
  );
}
