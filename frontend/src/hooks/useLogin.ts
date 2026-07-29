"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { notifyError, notifySuccess } from "@/src/lib/notify";
import { login } from "@/src/services/auth";

export function useLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "patient">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await login(userName, password);

      localStorage.setItem("clinic_token", data.token);

      notifySuccess("Logged in successfully 🎉");

      document.cookie = `clinic_token=${data.token}; path=/; max-age=86400`;

      router.replace("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      notifyError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    userName,
    password,
    role,
    loading,
    error,
    setUserName,
    setPassword,
    setRole,
    handleLogin,
  };
}
