import { api } from "../lib/axios";

export const boking = async (name: string) => {
  try {
    const res = await api.post("/book", {
      name,
    });
    console.log("API RESPONSE:", res.data);
    return res.data.data;
  } catch (error) {
    console.log("The Error Is : ", error);
  }
};
