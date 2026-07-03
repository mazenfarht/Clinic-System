// hooks/useAnalytics.ts

import { useEffect, useMemo, useState } from "react";
import { useQueue } from "./useQueue";
import { getAllPatients } from "../services/patient";
import { Patient } from "../types/patient";

export function useAnalytics(date: string) {
  const { fullQueue } = useQueue(date);
  const [patients, setPatients] = useState<Patient[]>([]);

  const totalPatientsToday = fullQueue.length;

  const totalServedToday = useMemo(
    () => fullQueue.filter((p) => p.status === "done").length,
    [fullQueue]
  );

  const waitingPatients = useMemo(
    () => fullQueue.filter((p) => p.status === "waiting").length,
    [fullQueue]
  );

  useEffect(() => {
    async function loadPatients() {
      const res = await getAllPatients();
      setPatients(res?.data ?? []);
    }

    loadPatients();
  }, []);

  const groupedPatients = useMemo(() => {
    return patients.reduce((acc: Record<string, number>, patient) => {
      acc[patient.appointmentDate] = (acc[patient.appointmentDate] || 0) + 1;

      return acc;
    }, {});
  }, [patients]);

  const chartData = useMemo(() => {
    return Object.entries(groupedPatients).map(([date, count]) => ({
      date,
      count,
    }));
  }, [groupedPatients]);
  return {
    totalPatientsToday,
    totalServedToday,
    waitingPatients,
    chartData,
    patients,
  };
}
