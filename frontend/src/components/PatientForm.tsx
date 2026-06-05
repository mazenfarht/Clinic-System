import { useState } from "react";
import { boking } from "../services/book";

export default function PatientForm() {
  const [name, setName] = useState("");

  const handelBokking = async () => {
    const data = await boking(name);
    localStorage.setItem("clinic_token", data.token);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4">
      {/* Mobile-optimized card container */}
      <div className="w-full max-w-[480px] mx-auto">
        {/* Step Progress Indicator (simplified for single-step form) */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#1A6BCC] flex items-center justify-center">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div className="w-12 h-[2px] bg-[#1A6BCC] mx-1" />
              <div className="w-8 h-8 rounded-full bg-[#E2E8EF] flex items-center justify-center">
                <span className="text-[#A0AABB] text-sm font-bold">2</span>
              </div>
              <div className="w-12 h-[2px] bg-[#E2E8EF] mx-1" />
              <div className="w-8 h-8 rounded-full bg-[#E2E8EF] flex items-center justify-center">
                <span className="text-[#A0AABB] text-sm font-bold">3</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <span className="text-xs font-medium text-[#1A6BCC]">
              Patient Info
            </span>
            <span className="text-xs font-medium text-[#A0AABB]">
              Select Slot
            </span>
            <span className="text-xs font-medium text-[#A0AABB]">Confirm</span>
          </div>
        </div>

        {/* Soft Banner Illustration */}
        <div className="bg-[#EBF3FF] rounded-2xl h-20 mb-6 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-[#1A6BCC] opacity-70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="ml-2 text-[#1A2B45] font-medium text-sm">
            Complete your booking details
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-[20px] font-bold text-[#1A2B45] mb-2">
          Tell us about you
        </h2>
        <p className="text-[14px] text-[#6B7A92] mb-6">
          Please provide your information below
        </p>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8EF] p-6 shadow-sm">
          {/* Name Field with icon */}
          <div className="mb-5">
            <label className="block text-[12px] font-medium text-[#6B7A92] mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-[#A0AABB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45] text-[14px] placeholder:text-[#A0AABB] focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC] transition-all duration-150"
                placeholder="e.g., Ahmad K."
              />
            </div>
          </div>

          {/* Date of Birth Field */}
          <div className="mb-5">
            <label className="block text-[12px] font-medium text-[#6B7A92] mb-2">
              Date of Birth
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-[#A0AABB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="date"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45] text-[14px] focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC] transition-all duration-150"
              />
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="mb-5">
            <label className="block text-[12px] font-medium text-[#6B7A92] mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-[#A0AABB]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <input
                type="tel"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45] text-[14px] placeholder:text-[#A0AABB] focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC] transition-all duration-150"
                placeholder="+20 XXX XXX XXX"
              />
            </div>
          </div>

          {/* Visit Type - Segmented Control */}
          <div className="mb-6">
            <label className="block text-[12px] font-medium text-[#6B7A92] mb-2">
              Visit Type
            </label>
            <div className="flex gap-2">
              {["New Visit", "Follow-up", "Lab Results"].map((type) => (
                <button
                  key={type}
                  className={`flex-1 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-150 ${
                    type === "New Visit"
                      ? "bg-[#1A6BCC] text-white shadow-sm"
                      : "bg-[#F0F3F7] text-[#6B7A92] hover:bg-[#E2E8EF]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button with icon */}
          <button
            onClick={handelBokking}
            className="w-full h-12 bg-[#1A6BCC] text-white text-[15px] font-semibold rounded-xl shadow-md shadow-blue-200 hover:bg-[#155AB5] hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Next Step</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {/* Footer note */}
          <p className="text-center text-[11px] text-[#A0AABB] mt-6">
            By continuing, you agree to our clinic's terms and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}
