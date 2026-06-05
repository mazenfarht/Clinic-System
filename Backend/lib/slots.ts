// ─── Slot Generation & Availability ──────────────────────────────────────────

import { store } from "@/lib/store";

/** Clinic operating hours */
export const CLINIC_START = "09:00";
export const CLINIC_END = "17:00";
export const SLOT_INTERVAL_MINUTES = 30;

/**
 * Generates all possible clinic slots for a day.
 * Returns an array of "HH:mm" strings from 09:00 to 17:00 (inclusive),
 * spaced by SLOT_INTERVAL_MINUTES.
 */
export function generateAllSlots(): string[] {
  const slots: string[] = [];
  const [startH, startM] = CLINIC_START.split(":").map(Number);
  const [endH, endM] = CLINIC_END.split(":").map(Number);

  let currentMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  while (currentMinutes <= endMinutes) {
    const h = Math.floor(currentMinutes / 60);
    const m = currentMinutes % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    currentMinutes += SLOT_INTERVAL_MINUTES;
  }

  return slots;
}

/**
 * Returns all slots booked for a specific date.
 */
export function getBookedSlots(date: string): string[] {
  return store.patients
    .filter((p) => p.appointmentDate === date)
    .map((p) => p.appointmentTime);
}

/**
 * Returns available (unbooked) slots for a specific date.
 */
export function getAvailableSlots(date: string): string[] {
  const allSlots = generateAllSlots();
  const booked = getBookedSlots(date);
  return allSlots.filter((slot) => !booked.includes(slot));
}

/**
 * Checks whether a given slot exists in the clinic's schedule.
 */
export function isValidSlot(time: string): boolean {
  return generateAllSlots().includes(time);
}

/**
 * Checks whether a specific date+time slot is already booked.
 */
export function isSlotBooked(date: string, time: string): boolean {
  return store.patients.some(
    (p) => p.appointmentDate === date && p.appointmentTime === time
  );
}
