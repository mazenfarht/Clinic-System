"use client";

import Analytics from "./analytics/page";
import Queue from "./queue/page";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Queue />
      <Analytics />
    </>
  );
}
