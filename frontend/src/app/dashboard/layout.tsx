"use client";

import Sidebar from "@/src/components/Sidebar";
import { DateProvider } from "@/src/context/DateContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-slate-50 min-h-screen p-6">
        <DateProvider>{children}</DateProvider>
      </main>
    </div>
  );
}
