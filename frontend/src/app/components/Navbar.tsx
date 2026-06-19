"use client";

import { useState } from "react";
import { Menu, X, Calendar, LogIn, Stethoscope } from "lucide-react";
import { NAV_LINKS } from "./constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8EF] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#1A6BCC] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-[#1A2B45] tracking-tight">
              Clinic<span className="text-[#1A6BCC]">Q</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#6B7A92] hover:text-[#1A6BCC] font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E2E8EF] text-[#1A2B45] text-sm font-medium hover:border-[#1A6BCC] hover:text-[#1A6BCC] transition-all"
            >
              <LogIn className="w-4 h-4" />
              دخول الدكتور
            </a>
            <a
              href="/book"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#1A6BCC] text-white text-sm font-semibold hover:bg-[#155bb5] transition-all shadow-md shadow-[#1A6BCC]/25"
            >
              <Calendar className="w-4 h-4" />
              حجز موعد
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#6B7A92] hover:bg-[#F8FAFB] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E2E8EF]">
            <nav className="flex flex-col gap-1 mb-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-[#6B7A92] hover:bg-[#F8FAFB] hover:text-[#1A6BCC] font-medium text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8EF] text-[#1A2B45] text-sm font-medium"
              >
                <LogIn className="w-4 h-4" /> دخول الدكتور
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A6BCC] text-white text-sm font-semibold"
              >
                <Calendar className="w-4 h-4" /> حجز موعد
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
