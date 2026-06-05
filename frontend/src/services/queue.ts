import { api } from "../lib/axios";

export const getQueue = async () => {
  try {
    const res = await api.get("/queue");
    console.log("API RESPONSE:", res.data);
    return res.data.data;
  } catch (err) {
    console.log("API ERROR:", err);
  }
};

export const bookPatient = async (data: {
  name: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
}) => {
  try {
    const res = await api.post("/book", data);

    console.log("API RESPONSE:", res.data);

    return res.data.data;
  } catch (error: any) {
    console.log("Booking Error:", error?.response?.data || error.message);

    throw error;
  }
};

export const nextPatient = async () => {
  const response = await api.post("/next");

  return response.data;
};

export const resetQueue = async () => {
  const response = await api.post("/reset");

  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await api.delete(`/patient/${id}`);

  return response.data;
};
