import type { StoreState, DailyQueueState } from "@/types";

// ─── Singleton In-Memory Store ────────────────────────────────────────────────
// This persists for the lifetime of the Next.js server process.
// In production, replace with a database (e.g., Redis, Postgres).

const createInitialState = (): StoreState => ({
  // Legacy global queue fields — kept for backward compatibility
  patients: [],
  currentPatient: null,
  nextQueueNumber: 1,
  totalServedToday: 0,
  // Per-date queues
  queues: {},
});

// Global store — survives hot reloads in development via globalThis
const globalStore = globalThis as typeof globalThis & {
  __clinicQueueStore?: StoreState;
};

if (!globalStore.__clinicQueueStore) {
  globalStore.__clinicQueueStore = createInitialState();
}

// Migrate existing store if it lacks the queues field (hot-reload safety)
if (!globalStore.__clinicQueueStore.queues) {
  globalStore.__clinicQueueStore.queues = {};
}

export const store = globalStore.__clinicQueueStore;

// ─── Per-Date Queue Helpers ───────────────────────────────────────────────────

/** Returns today's date as YYYY-MM-DD in local time. */
export const getTodayDate = (): string => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/** Initializes and returns the daily queue for a given date. */
export const getOrCreateDailyQueue = (date: string): DailyQueueState => {
  if (!store.queues[date]) {
    store.queues[date] = {
      patients: [],
      currentPatient: null,
      nextQueueNumber: 1,
      totalServedToday: 0,
    };
  }
  return store.queues[date];
};

/** Returns waiting patients for a given date queue (status = "waiting"). */
export const getWaitingPatientsByDate = (date: string) => {
  const q = store.queues[date];
  if (!q) return [];
  return q.patients.filter((p) => p.status === "waiting");
};

/** Returns the full queue list for a date sorted by queue number. */
export const getSortedQueueByDate = (date: string) => {
  const q = store.queues[date];
  if (!q) return [];
  return [...q.patients].sort((a, b) => a.queueNumber - b.queueNumber);
};

// ─── Legacy Store Helpers (kept for backward compatibility) ───────────────────

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
  store.queues = {};
};
