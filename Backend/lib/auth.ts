import type { TokenPayload, DoctorCredentials } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECRET_KEY = process.env.JWT_SECRET ?? "clinic-dev-secret-change-in-prod";
const TOKEN_EXPIRY_SECONDS = 8 * 60 * 60; // 8 hours

// Hardcoded doctor credentials (replace with DB lookup in production)
const DOCTOR_CREDENTIALS: DoctorCredentials = {
  username: "admin",
  password: "1234",
};

// ─── Simple HMAC-based JWT (no external dependency) ───────────────────────────
// Uses the Web Crypto API available in Next.js Edge / Node 18+ environments.

async function hmacSign(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  );
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, ""); // URL-safe base64
}

function base64UrlEncode(obj: object): string {
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = 4 - (padded.length % 4);
  return atob(padding === 4 ? padded : padded + "=".repeat(padding));
}

// ─── Token Generation ─────────────────────────────────────────────────────────

/**
 * Generates a signed JWT-style token for the given username.
 * Format: base64Header.base64Payload.signature
 */
export async function generateToken(username: string): Promise<string> {
  const header = base64UrlEncode({ alg: "HS256", typ: "JWT" });
  const now = Math.floor(Date.now() / 1000);
  const payload: TokenPayload = {
    username,
    role: "doctor",
    iat: now,
    exp: now + TOKEN_EXPIRY_SECONDS,
  };
  const encodedPayload = base64UrlEncode(payload);
  const signingInput = `${header}.${encodedPayload}`;
  const signature = await hmacSign(signingInput, SECRET_KEY);
  return `${signingInput}.${signature}`;
}

// ─── Token Verification ───────────────────────────────────────────────────────

export type VerifyResult =
  | { valid: true; payload: TokenPayload }
  | { valid: false; reason: "malformed" | "expired" | "invalid_signature" };

/**
 * Verifies a token string and returns its payload if valid.
 */
export async function verifyToken(token: string): Promise<VerifyResult> {
  const parts = token.split(".");
  if (parts.length !== 3) return { valid: false, reason: "malformed" };

  const [header, encodedPayload, signature] = parts;
  const signingInput = `${header}.${encodedPayload}`;

  // Re-compute expected signature
  const expectedSig = await hmacSign(signingInput, SECRET_KEY);
  if (expectedSig !== signature) {
    return { valid: false, reason: "invalid_signature" };
  }

  // Decode payload
  let payload: TokenPayload;
  try {
    payload = JSON.parse(base64UrlDecode(encodedPayload)) as TokenPayload;
  } catch {
    return { valid: false, reason: "malformed" };
  }

  // Check expiry
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true, payload };
}

// ─── Credential Validation ────────────────────────────────────────────────────

export function validateCredentials(
  username: string,
  password: string
): boolean {
  return (
    username === DOCTOR_CREDENTIALS.username &&
    password === DOCTOR_CREDENTIALS.password
  );
}
