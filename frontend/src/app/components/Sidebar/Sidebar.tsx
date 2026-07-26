"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Stethoscope,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const closeSidebar = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("clinic_token");

    document.cookie =
      "clinic_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    closeSidebar();

    router.replace("/admin/login");
  };

  const linkClass = (href: string) =>
    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
      pathname === href
        ? "bg-[#1A6BCC] text-white"
        : "hover:bg-slate-800 text-slate-200"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-slate-900
          text-white
          flex flex-col
          overflow-y-auto
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:fixed
        `}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1A6BCC] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold">
              Clinic<span className="text-[#1A6BCC]">Q</span>
            </span>
          </Link>
        </div>

        {/* User */}
        <div className="p-6 border-b border-slate-800">
          <h2 className="font-semibold">Dr. Ahmed</h2>
          <p className="text-sm text-slate-400">General Practice</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                onClick={closeSidebar}
                className={linkClass("/dashboard")}
              >
                <LayoutDashboard size={20} />
                Overview
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/queue"
                onClick={closeSidebar}
                className={linkClass("/dashboard/queue")}
              >
                <Users size={20} />
                Queue
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/analytics"
                onClick={closeSidebar}
                className={linkClass("/dashboard/analytics")}
              >
                <BarChart3 size={20} />
                Analytics
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
