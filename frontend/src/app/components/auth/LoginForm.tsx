"use client";

import LoginFooter from "./LoginFooter";
import LoginInput from "./LoginInput";
import RoleSelector from "./RoleSelector";

import { useLogin } from "@/src/hooks/useLogin";

export default function LoginForm() {
  const {
    userName,
    password,
    role,
    loading,
    error,
    setUserName,
    setPassword,
    setRole,
    handleLogin,
  } = useLogin();

  return (
    <div className="w-full max-w-md">
      <h1 className="text-[28px] font-bold text-[#1A2B45]">Welcome back</h1>

      <p className="text-[#6B7A92] text-sm mt-1 mb-8">
        Sign in to your dashboard
      </p>

      <RoleSelector role={role} onChange={setRole} />

      <div className="space-y-5">
        <LoginInput
          label="Username"
          placeholder="Enter username"
          value={userName}
          onChange={setUserName}
        />

        <div>
          <LoginInput
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={setPassword}
          />

          <div className="flex justify-end mt-2">
            <button className="text-xs text-[#1A6BCC] hover:underline">
              Forgot password?
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#1A6BCC] text-white font-medium shadow-lg shadow-blue-200 hover:bg-[#155AB5] transition disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>
      </div>

      <LoginFooter />
    </div>
  );
}
