import { api } from "../lib/axios";

export const checkInPatient = async (id: string) => {
  return await api.post(`/patient/${id}/checkin`);
};
export const donePatient = async () => {
  return await api.post(`/next`);
};
