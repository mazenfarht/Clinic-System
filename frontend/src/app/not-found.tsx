import Link from "next/link";
import { Home, ArrowLeft, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFB] px-6">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border border-[#E2E8EF] bg-white p-12 text-center shadow-lg">
          {/* Logo */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EBF3FF]">
            <Stethoscope className="h-10 w-10 text-[#1A6BCC]" />
          </div>

          {/* 404 */}
          <h1 className="mt-8 text-7xl font-bold tracking-tight text-[#1A6BCC]">
            404
          </h1>

          <h2 className="mt-3 text-3xl font-bold text-[#1A2B45]">
            Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#6B7A92]">
            The page you're looking for doesn't exist or may have been moved.
            Please return to the Homepage to continue managing the clinic queue.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A6BCC] px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-[#155AB5] hover:shadow-lg"
            >
              <Home size={18} />
              Home
            </Link>
          </div>

          {/* Bottom info */}
          <div className="mt-10 rounded-2xl bg-[#EBF3FF] p-5">
            <p className="text-sm text-[#6B7A92]">
              Need help? Contact your clinic administrator if you believe this
              page should exist.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
