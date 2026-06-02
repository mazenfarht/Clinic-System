"use client";

import { getQueue } from "@/src/services/queue";
import { useEffect, useState } from "react";

export default function Queue() {
  const [queue, setQueue] = useState<any>(null);
  useEffect(() => {
    console.log("COMPONENT MOUNTED");

    const fetchData = async () => {
      try {
        console.log("CALLING API...");
        const data = await getQueue();
        console.log("DATA FROM SERVICE:", data);

        setQueue(data);
      } catch (err) {
        console.log("ERROR IN COMPONENT:", err);
      }
    };

    fetchData();
  }, []);

  if (!queue) return <p>Loading...</p>;

  return (
    <>
      <h1>Queue Page</h1>

      <h2>
        Current Patient: {queue.currentPatient?.name || "No Current Patient"}
      </h2>

      <div>
        {queue.waiting?.map((patient: any) => (
          <div key={patient.id}>
            #{patient.queueNumber} - {patient.name}
          </div>
        ))}
      </div>
    </>
  );
}
