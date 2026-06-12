import { v4 as uuidv4 } from "uuid";
import {
  store,
  getWaitingPatients,
  getSortedQueue,
  getOrCreateDailyQueue,
  getWaitingPatientsByDate,
  getSortedQueueByDate,
  getTodayDate,
} from "@/lib/store";
import type { Patient } from "@/types";

// ─── Queue Operations ─────────────────────────────────────────────────────────

/**
 * Books a new patient into the correct date-based queue.
 * Uses appointmentDate if provided, otherwise defaults to today.
 * Returns the newly created patient record.
 */
export function bookPatient(name: string, appointmentDate?: string): Patient {
  const date = appointmentDate || getTodayDate();
  const dailyQueue = getOrCreateDailyQueue(date);

  const patient: Patient = {
    id: uuidv4(),
    name: name.trim(),
    queueNumber: dailyQueue.nextQueueNumber,
    status: "waiting",
    bookedAt: new Date().toISOString(),
    appointmentDate: date,
  };

  dailyQueue.patients.push(patient);
  dailyQueue.nextQueueNumber += 1;

  return patient;
}

/**
 * Advances the queue for a specific date to the next waiting patient.
 * - Marks the current patient as "done"
 * - Sets the next waiting patient as "current"
 * Returns the new current patient, or null if queue is empty.
 */
export function advanceQueue(date?: string): Patient | null {
  const targetDate = date || getTodayDate();
  const dailyQueue = getOrCreateDailyQueue(targetDate);

  // Mark existing current patient as done
  if (dailyQueue.currentPatient) {
    const idx = dailyQueue.patients.findIndex(
      (p) => p.id === dailyQueue.currentPatient!.id
    );
    if (idx !== -1) {
      dailyQueue.patients[idx].status = "done";
    }
    dailyQueue.totalServedToday += 1;
    dailyQueue.currentPatient = null;
  }

  // Get next patient from waiting list (lowest queue number first)
  const waiting = getWaitingPatientsByDate(targetDate).sort(
    (a, b) => a.queueNumber - b.queueNumber
  );

  if (waiting.length === 0) {
    return null;
  }

  const next = waiting[0];
  const idx = dailyQueue.patients.findIndex((p) => p.id === next.id);
  dailyQueue.patients[idx].status = "current";
  dailyQueue.currentPatient = dailyQueue.patients[idx];

  return dailyQueue.currentPatient;
}

/**
 * Removes a specific patient from the queue by ID.
 * Searches across all date queues.
 * Returns true if found and removed, false otherwise.
 */
export function removePatient(id: string): boolean {
  // Search across all date queues
  for (const date of Object.keys(store.queues)) {
    const dailyQueue = store.queues[date];
    const idx = dailyQueue.patients.findIndex((p) => p.id === id);
    if (idx === -1) continue;

    // If removing the current patient, clear it
    if (dailyQueue.currentPatient?.id === id) {
      dailyQueue.currentPatient = null;
    }

    dailyQueue.patients.splice(idx, 1);
    return true;
  }

  return false;
}

/**
 * Returns the full public queue snapshot for a specific date.
 * Defaults to today if no date is provided.
 */
export function getQueueSnapshot(date?: string) {
  const targetDate = date || getTodayDate();
  const dailyQueue = store.queues[targetDate];

  if (!dailyQueue) {
    return {
      date: targetDate,
      currentPatient: null,
      waiting: [],
      done: [],
      totalWaiting: 0,
      totalServedToday: 0,
      nextQueueNumber: 1,
    };
  }

  const sorted = getSortedQueueByDate(targetDate);
  return {
    date: targetDate,
    currentPatient: dailyQueue.currentPatient,
    waiting: sorted.filter((p) => p.status === "waiting"),
    done: sorted.filter((p) => p.status === "done"),
    totalWaiting: sorted.filter((p) => p.status === "waiting").length,
    totalServedToday: dailyQueue.totalServedToday,
    nextQueueNumber: dailyQueue.nextQueueNumber,
  };
}
