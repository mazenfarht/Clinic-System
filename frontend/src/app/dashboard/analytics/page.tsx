"use client";
import { useDate } from "@/src/context/DateContext";
import { useQueue } from "@/src/hooks/useQueue";

export default function Analytics() {
  const { date } = useDate();

  const { fullQueue } = useQueue(date);

  const totalPatientsToday = fullQueue.length;

  const totalServedToday = fullQueue.filter(
    (patient) => patient.status === "done"
  ).length;

  const waitingPatients = fullQueue.filter(
    (patient) => patient.status === "waiting"
  ).length;

  return (
    <div>
      <h1>Analytics</h1>

      <div className="bg-white p-5 rounded-xl border">
        <p className="text-sm text-gray-500">Total Patients Today</p>
        <h2 className="text-3xl font-bold text-[#1A2B45]">
          {totalPatientsToday}
        </h2>

        <p className="text-sm text-gray-500 mt-4">Total Served Today</p>
        <h2 className="text-3xl font-bold text-[#1A2B45]">
          {totalServedToday}
        </h2>

        <p className="text-sm text-gray-500 mt-4">Waiting Patients</p>
        <h2 className="text-3xl font-bold text-[#1A2B45]">{waitingPatients}</h2>
      </div>
    </div>
  );
}
