import type { QueueState } from "@/types";

// ─── Singleton In-Memory Store ────────────────────────────────────────────────
// This persists for the lifetime of the Next.js server process.
// In production, replace with a database (e.g., Redis, Postgres).

const createInitialState = (): QueueState => ({
  patients: [],
  currentPatient: null,
  nextQueueNumber: 1,
  totalServedToday: 0,
});

// Global store — survives hot reloads in development via globalThis
const globalStore = globalThis as typeof globalThis & {
  __clinicQueueStore?: QueueState;
};

if (!globalStore.__clinicQueueStore) {
  globalStore.__clinicQueueStore = createInitialState();
}

export const store = globalStore.__clinicQueueStore;

// ─── Store Helpers ────────────────────────────────────────────────────────────

/** Returns a snapshot of the current waiting list (status = "waiting"). */
export const getWaitingPatients = () =>
  store.patients.filter((p) => p.status === "waiting");

/** Returns the full queue list sorted by queue number. */
export const getSortedQueue = () =>
  [...store.patients].sort((a, b) => a.queueNumber - b.queueNumber);

/** Resets all queue data back to initial state. */
export const resetStore = (): void => {
  store.patients = [];
  store.currentPatient = null;
  store.nextQueueNumber = 1;
  store.totalServedToday = 0;
};
