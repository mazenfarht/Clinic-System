type LoginInputProps = {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function LoginInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: LoginInputProps) {
  return (
    <div>
      <label className="text-xs text-[#6B7A92] font-medium">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full h-12 px-4 rounded-xl border border-[#E2E8EF] bg-white text-[#1A2B45] focus:outline-none focus:ring-4 focus:ring-[#EBF3FF] focus:border-[#1A6BCC]"
      />
    </div>
  );
}
