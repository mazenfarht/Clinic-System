"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handelButton = () => {
    router.push("/book");
  };

  return (
    <>
      {/* // **************** Navbar ************************** */}
      <nav className="bg-white border-b border-[#E2E8EF] px-6 py-4 flex items-center justify-between relative">
        {/* Logo - Left */}
        <h1 className="text-2xl font-bold text-[#1A2B45]">ClinicQ</h1>

        {/* Center - Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 font-bold text-[#1A2B45]">
          <li>
            <Link href="/" className="hover:text-[#1A6BCC] transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#1A6BCC] transition">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#1A6BCC] transition">
              Services
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#1A6BCC] transition">
              Information
            </Link>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Booking Button (Primary Style from system) */}
          <button
            onClick={handelButton}
            className="bg-[#1A6BCC] text-white px-4 py-2 rounded-[10px] text-sm font-medium shadow-[0_4px_12px_rgba(26,107,204,0.25)] hover:bg-[#155AB5] transition"
          >
            Booking
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden text-2xl text-[#1A2B45]"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-full font-bold left-0 w-full bg-white border border-[#E2E8EF] shadow-[0_8px_24px_rgba(0,0,0,0.10)] rounded-b-[12px] p-4 flex flex-col gap-3 md:hidden">
            <Link className="text-[#1A2B45] hover:text-[#1A6BCC]" href="/">
              Home
            </Link>

            <Link className="text-[#1A2B45] hover:text-[#1A6BCC]" href="/">
              About Us
            </Link>

            <Link className="text-[#1A2B45] hover:text-[#1A6BCC]" href="/">
              Services
            </Link>

            <Link className="text-[#1A2B45] hover:text-[#1A6BCC]" href="/">
              Information
            </Link>
          </div>
        )}
      </nav>
      {/* Grid 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 p-10 bg-[#F8FAFB]">
        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-[#1A2B45]">
            Smart Clinic Queue System
          </h1>

          <p className="mt-4 text-[#6B7A92]">
            Reduce waiting time and manage patients efficiently with a modern
            dashboard.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-[#1A6BCC] text-white px-5 py-2 rounded-[10px]">
              Book Appointment
            </button>

            <button className="border border-[#1A6BCC] text-[#1A6BCC] px-5 py-2 rounded-[10px]">
              Learn More
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"
            alt="doctor"
            width={500}
            height={500}
            priority
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </>
  );
}
