import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import type { TokenPayload } from "@/types";

// ─── Auth Guard ───────────────────────────────────────────────────────────────

/**
 * Extracts and validates the Bearer token from the Authorization header.
 *
 * Usage in a route handler:
 *   const auth = await requireAuth(request);
 *   if (auth instanceof NextResponse) return auth; // 401 was returned
 *   // auth.payload is now available
 */
export async function requireAuth(
  request: NextRequest
): Promise<{ payload: TokenPayload } | NextResponse> {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        success: false,
        error: "Authorization header missing or malformed. Expected: Bearer <token>",
        code: "MISSING_TOKEN",
      },
      { status: 401 }
    );
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix
  const result = await verifyToken(token);

  if (!result.valid) {
    const messages: Record<string, string> = {
      expired: "Token has expired. Please log in again.",
      invalid_signature: "Token signature is invalid.",
      malformed: "Token is malformed.",
    };

    return NextResponse.json(
      {
        success: false,
        error: messages[result.reason] ?? "Unauthorized",
        code: result.reason.toUpperCase(),
      },
      { status: 401 }
    );
  }

  return { payload: result.payload };
}

// ─── Response Helpers ─────────────────────────────────────────────────────────

export function successResponse<T>(
  data: T,
  message?: string,
  status = 200
): NextResponse {
  return NextResponse.json({ success: true, data, ...(message && { message }) }, { status });
}

export function errorResponse(
  error: string,
  status: number,
  code?: string
): NextResponse {
  return NextResponse.json(
    { success: false, error, ...(code && { code }) },
    { status }
  );
}
