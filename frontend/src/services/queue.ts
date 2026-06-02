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

export const bookPatient = async (name: string) => {
  const response = await api.post("/book", {
    name,
  });

  return response.data;
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
