import { v4 as uuidv4 } from "uuid";
import { store, getWaitingPatients, getSortedQueue } from "@/lib/store";
import { isValidSlot, isSlotBooked } from "@/lib/slots";
import type { Patient } from "@/types";

// ─── Validation Helpers ───────────────────────────────────────────────────────

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const PHONE_RE = /^\d{10,15}$/;

export type BookingInput = {
  name: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
};

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string; code: string };

/**
 * Validates all fields required for a booking.
 * Returns the first validation failure encountered, or { valid: true }.
 */
export function validateBookingInput(
  input: Partial<BookingInput>
): ValidationResult {
  const { name, phone, appointmentDate, appointmentTime } = input;

  // ── name ──────────────────────────────────────────────────────────────────
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return {
      valid: false,
      error: "Field 'name' is required and must be a non-empty string.",
      code: "MISSING_NAME",
    };
  }
  if (name.trim().length > 100) {
    return {
      valid: false,
      error: "Name must be 100 characters or fewer.",
      code: "NAME_TOO_LONG",
    };
  }

  // ── phone ─────────────────────────────────────────────────────────────────
  if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
    return {
      valid: false,
      error: "Field 'phone' is required.",
      code: "MISSING_PHONE",
    };
  }
  if (!PHONE_RE.test(phone.trim())) {
    return {
      valid: false,
      error: "Phone must contain only digits and be 10–15 characters.",
      code: "INVALID_PHONE",
    };
  }

  // ── appointmentDate ───────────────────────────────────────────────────────
  if (!appointmentDate || typeof appointmentDate !== "string") {
    return {
      valid: false,
      error: "Field 'appointmentDate' is required.",
      code: "MISSING_APPOINTMENT_DATE",
    };
  }
  if (
    !ISO_DATE_RE.test(appointmentDate) ||
    isNaN(Date.parse(appointmentDate))
  ) {
    return {
      valid: false,
      error:
        "Field 'appointmentDate' must be a valid date in YYYY-MM-DD format.",
      code: "INVALID_APPOINTMENT_DATE",
    };
  }

  // Normalise: compare date strings in UTC to avoid timezone drift
  const todayStr = new Date().toISOString().slice(0, 10);
  if (appointmentDate < todayStr) {
    return {
      valid: false,
      error: "Appointment date cannot be in the past.",
      code: "PAST_APPOINTMENT_DATE",
    };
  }

  // ── appointmentTime ───────────────────────────────────────────────────────
  if (!appointmentTime || typeof appointmentTime !== "string") {
    return {
      valid: false,
      error: "Field 'appointmentTime' is required.",
      code: "MISSING_APPOINTMENT_TIME",
    };
  }
  if (!TIME_RE.test(appointmentTime)) {
    return {
      valid: false,
      error: "Field 'appointmentTime' must be in HH:mm format.",
      code: "INVALID_APPOINTMENT_TIME",
    };
  }
  if (!isValidSlot(appointmentTime)) {
    return {
      valid: false,
      error: "Selected time is not a valid clinic slot.",
      code: "INVALID_SLOT",
    };
  }

  // ── double-booking ────────────────────────────────────────────────────────
  if (isSlotBooked(appointmentDate, appointmentTime)) {
    return {
      valid: false,
      error: "Selected appointment slot is already booked.",
      code: "SLOT_ALREADY_BOOKED",
    };
  }

  return { valid: true };
}

// ─── Queue Operations ─────────────────────────────────────────────────────────

/**
 * Books a new patient with appointment details.
 * Assumes input has already been validated via validateBookingInput().
 */
export function bookPatient(input: BookingInput): Patient {
  const patient: Patient = {
    id: uuidv4(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    appointmentDate: input.appointmentDate,
    appointmentTime: input.appointmentTime,
    queueNumber: store.nextQueueNumber,
    status: "scheduled",
    bookedAt: new Date().toISOString(),
  };

  store.patients.push(patient);
  store.nextQueueNumber += 1;

  return patient;
}

/**
 * Transitions a patient from "scheduled" → "waiting".
 * Called when the patient's appointment time arrives.
 * Returns the updated patient, or null if not found / already past "scheduled".
 */
export function checkInPatient(id: string): Patient | null {
  const idx = store.patients.findIndex(
    (p) => p.id === id && p.status === "scheduled"
  );
  if (idx === -1) return null;

  store.patients[idx].status = "waiting";
  return store.patients[idx];
}

/**
 * Advances the queue to the next waiting patient.
 * - Marks the current patient as "done"
 * - Sets the next waiting patient (lowest queueNumber) as "current"
 * Returns the new current patient, or null if the waiting list is empty.
 */
export function advanceQueue(): Patient | null {
  // Mark existing current patient as done
  if (store.currentPatient) {
    const idx = store.patients.findIndex(
      (p) => p.id === store.currentPatient!.id
    );
    if (idx !== -1) {
      store.patients[idx].status = "done";
    }
    store.totalServedToday += 1;
    store.currentPatient = null;
  }

  // Get next patient from waiting list (lowest queue number first)
  const waiting = getWaitingPatients().sort(
    (a, b) => a.queueNumber - b.queueNumber
  );

  if (waiting.length === 0) {
    return null;
  }

  const next = waiting[0];
  const idx = store.patients.findIndex((p) => p.id === next.id);
  store.patients[idx].status = "current";
  store.currentPatient = store.patients[idx];

  return store.currentPatient;
}

/**
 * Removes a specific patient from the queue by ID.
 * Returns true if found and removed, false otherwise.
 */
export function removePatient(id: string): boolean {
  const idx = store.patients.findIndex((p) => p.id === id);
  if (idx === -1) return false;

  if (store.currentPatient?.id === id) {
    store.currentPatient = null;
  }

  store.patients.splice(idx, 1);
  return true;
}

/**
 * Returns the full public queue snapshot, grouped by status.
 */
export function getQueueSnapshot() {
  const sorted = getSortedQueue();

  // 🔥 AUTO PROMOTION LOGIC
  if (!store.currentPatient) {
    const waiting = sorted
      .filter((p) => p.status === "waiting")
      .sort((a, b) => a.queueNumber - b.queueNumber);

    if (waiting.length > 0) {
      const next = waiting[0];

      const idx = store.patients.findIndex((p) => p.id === next.id);

      store.patients[idx].status = "current";
      store.currentPatient = store.patients[idx];
    }
  }

  return {
    currentPatient: store.currentPatient,
    scheduled: sorted.filter((p) => p.status === "scheduled"),
    waiting: sorted.filter((p) => p.status === "waiting"),
    done: sorted.filter((p) => p.status === "done"),
    totalScheduled: sorted.filter((p) => p.status === "scheduled").length,
    totalWaiting: sorted.filter((p) => p.status === "waiting").length,
    totalServedToday: store.totalServedToday,
    nextQueueNumber: store.nextQueueNumber,
  };
}
