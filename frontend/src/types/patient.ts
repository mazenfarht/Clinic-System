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
