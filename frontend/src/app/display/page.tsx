"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { useEffect, useMemo, useState } from "react";
import Loading from "./loading";
import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function Display() {
  const today = new Date().toLocaleDateString("en-CA");
  const { queue, loading } = useQueue(today);

  const [now, setNow] = useState(new Date());

  const fullQueue = useMemo(() => {
    return [
      ...(queue?.waiting || []),
      ...(queue?.done || []),
      ...(queue?.currentPatient ? [queue.currentPatient] : []),
    ].sort((a, b) => a.queueNumber - b.queueNumber);
  }, [queue]);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("DATE:", today);
      // console.log("QUEUE:", queue);
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (loading) return <Loading />;
  if (!queue) return <div className="p-6">No data available</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFB] p-6">
      {/* HEADER */}
      <div className="bg-[#1A2B45] text-white p-4 rounded-xl mb-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#1A6BCC] flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold text-white tracking-tight">
            Clinic<span className="text-[#1A6BCC]">Q</span>
          </span>
        </Link>

        <div className="text-right">
          <p className="text-sm text-[#8DA0B8]">{date}</p>
          <p className="text-lg font-semibold">{time}</p>
        </div>
      </div>
      {/* CURRENT PATIENT */}
      <div className="bg-gradient-to-r from-[#EBF3FF] to-white border-l-4 border-[#1A6BCC] p-6 rounded-xl mb-6">
        <p className="text-sm text-[#6B7A92]">NOW SERVING</p>

        <h2 className="text-4xl font-bold text-[#1A6BCC] mt-2">
          {queue.currentPatient?.queueNumber || "---"}
        </h2>

        <p className="text-lg font-semibold text-[#1A2B45]">
          {queue.currentPatient?.name || "No Current Patient"}
        </p>
      </div>

      {/* QUEUE TABLE */}
      <div className="bg-white rounded-xl border border-[#E2E8EF] p-4">
        <h3 className="text-lg text-black font-semibold mb-4">Full Queue</h3>

        <table className="w-full text-left">
          <thead className="bg-[#F8FAFB] text-[#6B7A92] text-sm">
            <tr>
              <th className="p-3">Number</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {fullQueue.map((patient: any) => (
              <tr
                key={patient.id}
                className="border-b border-[#F0F3F7] hover:bg-[#EBF3FF]"
              >
                <td className="p-3 font-mono text-black font-bold">
                  {patient.queueNumber}
                </td>

                <td className="p-3 font-medium text-[#1A2B45]">
                  {patient.name}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        patient.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-600"
                          : patient.status === "waiting"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
