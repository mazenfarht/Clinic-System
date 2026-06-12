import { api } from "../lib/axios";

export const checkInPatient = async (id: string) => {
  return await api.post(`/patient/${id}/checkin`);
};
export const nextPatient = async () => {
  return await api.post(`/next`);
};
