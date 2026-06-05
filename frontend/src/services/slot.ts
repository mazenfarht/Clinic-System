import { api } from "../lib/axios";

export const getSlots = async (date: string) => {
  try {
    const res = await api.get(`/slots?date=${date}`);

    return res?.data?.data?.availableSlots || [];
  } catch (error) {
    console.log("Slots error:", error);
    return [];
  }
};
