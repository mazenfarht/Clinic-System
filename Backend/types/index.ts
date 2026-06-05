// ─── Patient & Queue Types ────────────────────────────────────────────────────

export interface Patient {
  id: string;
  name: string;
  phone: string;

  appointmentDate: string; // ISO date string: "YYYY-MM-DD"
  appointmentTime: string; // "HH:mm"

  queueNumber: number;

  status: "scheduled" | "waiting" | "current" | "done";

  bookedAt: string; // ISO datetime string
}

export interface QueueState {
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
}

// ─── Slot Types ───────────────────────────────────────────────────────────────

export interface SlotsResponse {
  date: string;
  availableSlots: string[];
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface DoctorCredentials {
  username: string;
  password: string;
}

export interface TokenPayload {
  username: string;
  role: "doctor";
  iat: number; // issued at (unix timestamp)
  exp: number; // expiry (unix timestamp)
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;
