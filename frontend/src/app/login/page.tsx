"use client";

import { notifyError, notifySuccess } from "@/src/lib/notify";
import { login } from "@/src/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
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

      // 👇 ده المهم للميدلوير

      document.cookie = `clinic_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      window.location.href = "/dashboard";
    } catch (err) {
      notifyError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFB]">
      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex w-[55%] bg-gradient-to-br from-[#1A2B45] via-[#1A6BCC] to-[#0EB5A2] text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="max-w-md z-10">
          <h1 className="text-5xl font-bold mb-3">ClinicQ</h1>

          <h2 className="text-2xl font-semibold mb-4 text-[#EBF3FF]">
            Clinic Queue System
          </h2>

          <p className="text-[#B8D4F0] text-base">
            Streamlining patient care, one queue at a time.
          </p>

          <div className="mt-12 bg-white/10 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-2">
              Modern Queue Management
            </h3>
            <p className="text-sm text-[#B8D4F0]">
              Manage patients, monitor waiting times, and streamline clinic
              operations from one dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full lg:w-[45%] flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <h1 className="text-[28px] font-bold text-[#1A2B45]">Welcome back</h1>

          <p className="text-[#6B7A92] text-sm mt-1 mb-8">
            Sign in to your dashboard
          </p>

          {/* ROLE SELECTOR */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setRole("admin")}
              className={`p-4 rounded-xl border text-center transition ${
                role === "admin"
                  ? "bg-[#EBF3FF] border-[#1A6BCC] text-[#1A6BCC]"
                  : "bg-white border-[#E2E8EF] text-[#6B7A92]"
              }`}
            >
              👨‍⚕️ Admin / Doctor
            </button>

            {/* <button
              onClick={() => setRole("patient")}
              className={`p-4 rounded-xl border text-center transition ${
                role === "patient"
                  ? "bg-[#EBF3FF] border-[#1A6BCC] text-[#1A6BCC]"
                  : "bg-white border-[#E2E8EF] text-[#6B7A92]"
              }`}
            >
              🙋 Patient
            </button> */}
          </div>

          {/* FORM */}
          <div className="space-y-5">
            {/* USERNAME */}
            <div>
              <label className="text-xs text-[#6B7A92] font-medium">
                Username
              </label>

              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter username"
                className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45] focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs text-[#6B7A92] font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45] focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
              />

              <div className="flex justify-end mt-2">
                <button className="text-xs text-[#1A6BCC] hover:underline">
                  Forgot password?
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] text-sm p-3 rounded-xl">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-[#1A6BCC] text-white font-medium shadow-lg shadow-blue-200 hover:bg-[#155AB5] transition disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </div>

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#6B7A92]">Don’t have an account?</p>

            <button className="text-sm text-[#1A6BCC] font-medium hover:underline">
              Contact your clinic admin
            </button>

            <div className="mt-6 text-xs text-[#A0AABB]">
              © 2026 ClinicQ · Privacy · Terms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
