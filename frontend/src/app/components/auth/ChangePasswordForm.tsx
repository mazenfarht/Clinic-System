"use client";

import { useState } from "react";
import LoginInput from "./LoginInput";

type ChangePasswordFormProps = {
  loading: boolean;
  onBack: () => void;
  onSubmit: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => void;
};

export default function ChangePasswordForm({
  loading,
  onBack,
  onSubmit,
}: ChangePasswordFormProps) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    onSubmit(oldPassword, newPassword, confirmPassword);
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-[28px] font-bold text-[#1A2B45]">Change Password</h1>

      <p className="text-[#6B7A92] text-sm mt-1 mb-8">
        Update your password to keep your account secure.
      </p>

      <div className="space-y-5">
        <LoginInput
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          value={oldPassword}
          onChange={setOldPassword}
        />

        <LoginInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={setNewPassword}
        />

        <LoginInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        {error && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] text-[#EF4444] text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#1A6BCC] text-white font-medium shadow-lg shadow-blue-200 hover:bg-[#155AB5] transition disabled:opacity-70"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-sm text-[#1A6BCC] hover:underline"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}
