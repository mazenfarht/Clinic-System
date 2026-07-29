import { Stethoscope } from "lucide-react";

export default function LoginBrandPanel() {
  return (
    <div className="hidden lg:flex w-[55%] bg-gradient-to-br from-[#1A2B45] via-[#1A6BCC] to-[#0EB5A2] text-white flex-col justify-center items-center p-12 relative overflow-hidden">
      <div className="max-w-md z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-15 h-15 rounded-xl bg-[#1A6BCC] flex items-center justify-center">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>

          <span className="text-5xl font-bold tracking-tight">
            Clinic<span className="text-[#BEE3FF]">Q</span>
          </span>
        </div>

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
  );
}
