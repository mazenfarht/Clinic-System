"use client";

import AnalyticsChart from "@/src/components/AnalyticsChart";
import { useDate } from "@/src/context/DateContext";
import { useAnalytics } from "@/src/hooks/useAnalytics";

import "react-circular-progressbar/dist/styles.css";

export default function Analytics() {
  const { date } = useDate();

  const { chartData } = useAnalytics(date);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <AnalyticsChart chartData={chartData} />
    </div>
  );
}
