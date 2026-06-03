import { NextRequest } from "next/server";
import { validateCredentials, generateToken } from "@/lib/auth";
import { successResponse, errorResponse } from "@/lib/middleware";

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400, "INVALID_JSON");
  }

  const { username, password } = body as Record<string, unknown>;

  if (typeof username !== "string" || typeof password !== "string") {
    return errorResponse(
      "Both 'username' and 'password' fields are required and must be strings.",
      400,
      "MISSING_FIELDS"
    );
  }

  if (!validateCredentials(username, password)) {
    return errorResponse(
      "Invalid username or password.",
      401,
      "INVALID_CREDENTIALS"
    );
  }

  const token = await generateToken(username);

  return successResponse(
    {
      token,
      tokenType: "Bearer",
      expiresIn: 28800, // 8 hours in seconds
      doctor: { username, role: "doctor" },
    },
    "Login successful"
  );
}
