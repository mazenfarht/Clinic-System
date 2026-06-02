import { v4 as uuidv4 } from "uuid";
import { store, getWaitingPatients, getSortedQueue } from "@/lib/store";
import type { Patient } from "@/types";

// ─── Queue Operations ─────────────────────────────────────────────────────────

/**
 * Books a new patient into the queue.
 * Returns the newly created patient record.
 */
export function bookPatient(name: string): Patient {
  const patient: Patient = {
    id: uuidv4(),
    name: name.trim(),
    queueNumber: store.nextQueueNumber,
    status: "waiting",
    bookedAt: new Date().toISOString(),
  };

  store.patients.push(patient);
  store.nextQueueNumber += 1;

  return patient;
}

/**
 * Advances the queue to the next waiting patient.
 * - Marks the current patient as "done"
 * - Sets the next waiting patient as "current"
 * Returns the new current patient, or null if queue is empty.
 */
export function advanceQueue(): Patient | null {
  // Mark existing current patient as done
  if (store.currentPatient) {
    const idx = store.patients.findIndex((p) => p.id === store.currentPatient!.id);
    if (idx !== -1) {
      store.patients[idx].status = "done";
    }
    store.totalServedToday += 1;
    store.currentPatient = null;
  }

  // Get next patient from waiting list (lowest queue number first)
  const waiting = getWaitingPatients().sort((a, b) => a.queueNumber - b.queueNumber);

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

  const patient = store.patients[idx];

  // If removing the current patient, clear it
  if (store.currentPatient?.id === id) {
    store.currentPatient = null;
  }

  store.patients.splice(idx, 1);
  return true;
}

/**
 * Returns the full public queue snapshot.
 */
export function getQueueSnapshot() {
  const sorted = getSortedQueue();
  return {
    currentPatient: store.currentPatient,
    waiting: sorted.filter((p) => p.status === "waiting"),
    done: sorted.filter((p) => p.status === "done"),
    totalWaiting: sorted.filter((p) => p.status === "waiting").length,
    totalServedToday: store.totalServedToday,
    nextQueueNumber: store.nextQueueNumber,
  };
}
