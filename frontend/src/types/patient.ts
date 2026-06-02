export interface Patient {
  id: string;
  name: string;
  queueNumber: number;
  status: "waiting" | "current" | "done";
  bookedAt: string; // ISO string
}
