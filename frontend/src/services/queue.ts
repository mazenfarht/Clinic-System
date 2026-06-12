import { api } from "../lib/axios";

// ─── Get Queue (date-based) ─────────────────────────────
export const getQueue = async (date: string) => {
  try {
    const res = await api.get(`/queue?date=${date}`);
    return res.data.data;
  } catch (err) {
    console.log("API ERROR:", err);
    throw err;
  }
};

// ─── Book Patient (UPDATED) ─────────────────────────────
// Backend supports ONLY: name + optional appointmentDate
export const bookPatient = async (data: {
  name: string;
  appointmentDate?: string;
}) => {
  try {
    const res = await api.post("/book", data);
    return res.data.data;
  } catch (error: any) {
    console.log("Booking Error:", error?.response?.data || error.message);
    throw error;
  }
};

// ─── Next Patient (date-based queue) ────────────────────
export const nextPatient = async (date: string) => {
  const response = await api.post("/next", { date });
  return response.data;
};

// ─── Reset Queue ─────────────────────────────────────────
export const resetQueue = async () => {
  const response = await api.post("/reset");
  return response.data;
};

// ─── Delete Patient ──────────────────────────────────────
export const deletePatient = async (id: string) => {
  const response = await api.delete(`/patient/${id}`);
  return response.data;
};

// ─── Check-in (optional if backend supports it) ─────────
export const checkInPatient = async (id: string) => {
  const response = await api.post(`/checkin/${id}`);
  return response.data;
};
