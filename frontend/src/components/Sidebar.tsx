import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Stethoscope,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#1A6BCC] flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Clinic<span className="text-[#1A6BCC]">Q</span>
          </span>
        </Link>
      </div>

      {/* User */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="font-semibold">Dr. Ahmed</h2>
        <p className="text-sm text-slate-400">General Practice</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
            >
              <LayoutDashboard size={20} />
              Overview
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/queue"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
            >
              <Users size={20} />
              Queue
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
            >
              <BarChart3 size={20} />
              Analytics
            </Link>
          </li>

          {/* <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
            >
              <Settings size={20} />
              Settings
            </Link>
          </li> */}
        </ul>
      </nav>

      {/* Logout */}
      {/* <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800">
          <LogOut size={20} />
          Sign Out
        </button>
      </div> */}
    </aside>
  );
}
