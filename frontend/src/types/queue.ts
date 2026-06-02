import { Patient } from "./patient";

export interface QueueState {
  patients: Patient[];
  currentPatient: Patient | null;
  nextQueueNumber: number;
  totalServedToday: number;
}
