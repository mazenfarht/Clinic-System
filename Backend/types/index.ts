// ─── Patient & Queue Types ───────────────────────────────────────────────────

export interface Patient {
  id: string;
  name: string;
  queueNumber: number;
  status: "waiting" | "current" | "done";
  bookedAt: string; // ISO string
  appointmentDate: string; // YYYY-MM-DD
}

export interface QueueState {
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
}

export interface DailyQueueState {
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
}

export interface StoreState {
  // Legacy global queue fields — kept for backward compatibility
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
  // Per-date queues: store.queues["YYYY-MM-DD"]
  queues: Record<string, DailyQueueState>;
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
