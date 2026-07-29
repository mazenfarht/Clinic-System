import { LoginBrandPanel, LoginForm } from "../../components/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-[#F8FAFB]">
      <LoginBrandPanel />

      <div className="w-full lg:w-[45%] flex items-center justify-center px-8">
        <LoginForm />
      </div>
    </div>
  );
}
