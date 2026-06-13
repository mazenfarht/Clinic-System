"use client";

import AnalyticsChart from "@/src/components/AnalyticsChart";
import { useDate } from "@/src/context/DateContext";
import { useQueue } from "@/src/hooks/useQueue";
import { getAllPatients } from "@/src/services/patient";
import { useEffect, useMemo, useState } from "react";

import "react-circular-progressbar/dist/styles.css";

export default function Analytics() {
  const { date } = useDate();
  const { fullQueue } = useQueue(date);

  const [patients, setPatients] = useState<Patient[]>([]);

  // =========================
  // TODAY ANALYTICS (from queue)
  // =========================
  const totalPatientsToday = fullQueue.length;

  const totalServedToday = useMemo(
    () => fullQueue.filter((p) => p.status === "done").length,
    [fullQueue]
  );

  const waitingPatients = useMemo(
    () => fullQueue.filter((p) => p.status === "waiting").length,
    [fullQueue]
  );

  const totalAllPatients = patients.length;

  // =========================
  // FETCH ALL PATIENTS
  // =========================
  useEffect(() => {
    async function loadPatients() {
      const res = await getAllPatients();
      setPatients(res?.data ?? []);
      // console.log("patients:", patients);
    }

    loadPatients();
  }, []);

  // =========================
  // GROUP BY DATE
  // =========================
  const groupedPatients = useMemo(() => {
    return patients.reduce((acc: Record<string, number>, patient) => {
      const appointmentDate = patient.appointmentDate;

      acc[appointmentDate] = (acc[appointmentDate] || 0) + 1;

      return acc;
    }, {});
  }, [patients]);

  // =========================
  // FORMAT FOR UI / CHARTS
  // =========================
  const chartData = useMemo(() => {
    return Object.entries(groupedPatients).map(([date, count]) => ({
      date,
      count,
    }));
  }, [groupedPatients]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* ===================== */}
      {/* TODAY STATS */}
      {/* ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Total Patients Today</p>
          <h2 className="text-3xl font-bold text-[#1A2B45]">
            {totalPatientsToday}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Total Served Today</p>
          <h2 className="text-3xl font-bold text-green-600">
            {totalServedToday}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl border">
          <p className="text-sm text-gray-500">Waiting Patients</p>
          <h2 className="text-3xl font-bold text-orange-500">
            {waitingPatients}
          </h2>
        </div>
      </div>

      <AnalyticsChart chartData={chartData} />
    </div>
  );
}
