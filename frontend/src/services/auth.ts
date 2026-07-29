import { api } from "../lib/axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });
    console.log("API RESPONSE:", res.data);
    return res.data.data;
  } catch (error) {
    console.log("The Error Is : ", error);
  }
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const { data } = await api.patch("/auth/change-password", {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  console.log(localStorage.getItem("clinic_token"));

  return data;
};
