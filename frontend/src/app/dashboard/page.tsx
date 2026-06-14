"use client";

import AnalyticsBerDay from "@/src/components/AnalyticsBerDay";
import Analytics from "./analytics/page";
import Queue from "./queue/page";

export default function Dashboard() {
  return (
    <>
      <AnalyticsBerDay />
      <Queue />
      <Analytics />
    </>
  );
}
