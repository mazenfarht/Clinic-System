import { api } from "../lib/axios";

export const login = async (username: string, password: string) => {
  try {
    const res = await api.post("/auth/login", {
      username,
      password,
    });
    console.log("API RESPONSE:", res.data);
    return res.data.data;
  } catch (error) {
    console.log("The Error Is : ", error);
  }
};
