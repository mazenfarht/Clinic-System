type Props = {
  role: "admin" | "patient";
  onChange: (role: "admin" | "patient") => void;
};

export default function RoleSelector({ role, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <button
        onClick={() => onChange("admin")}
        className={`p-4 rounded-xl border text-center transition ${
          role === "admin"
            ? "bg-[#EBF3FF] border-[#1A6BCC] text-[#1A6BCC]"
            : "bg-white border-[#E2E8EF] text-[#6B7A92]"
        }`}
      >
        👨‍⚕️ Admin / Doctor
      </button>

      {/*
        <button
          onClick={() => onChange("patient")}
          className={`p-4 rounded-xl border text-center transition ${
            role === "patient"
              ? "bg-[#EBF3FF] border-[#1A6BCC] text-[#1A6BCC]"
              : "bg-white border-[#E2E8EF] text-[#6B7A92]"
          }`}
        >
          🙋 Patient
        </button>
        */}
    </div>
  );
}
