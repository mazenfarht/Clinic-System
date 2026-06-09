"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { checkInPatient, donePatient } from "@/src/services/patient";

export default function Queue() {
  const { queue, loading, refetch } = useQueue();

  if (loading) return <p>Loading...</p>;
  if (!queue) return <p>No data</p>;
  console.log(localStorage.getItem("clinic_token"));
  return (
    <>
      <h1>Queue Page</h1>

      <h2>
        Current Patient: {queue.currentPatient?.name || "No Current Patient"}
      </h2>

      <div>
        <h1>Scheduled</h1>

        {queue.scheduled.length === 0 ? (
          <p>No scheduled patients</p>
        ) : (
          queue.scheduled?.map((patient: any) => (
            <div key={patient.id} className="p-2">
              #{patient.queueNumber} - {patient.name}
              <button
                onClick={async () => {
                  await checkInPatient(patient.id);
                  refetch();
                }}
              >
                Check In
              </button>
            </div>
          ))
        )}
        <div>
          <h1>Waiting</h1>

          {queue.waiting.length === 0 ? (
            <p>No waiting patients</p>
          ) : (
            queue.waiting?.map((patient: any) => (
              <div key={patient.id} className="p-2">
                #{patient.queueNumber} - {patient.name}
                <button
                  onClick={async () => {
                    await donePatient();
                    refetch();
                  }}
                >
                  Check In
                </button>
              </div>
            ))
          )}
        </div>
        <div>
          <h1>Done</h1>

          {queue.done.length === 0 ? (
            <p>No done patients</p>
          ) : (
            queue.done?.map((patient: any) => (
              <div key={patient.id} className="p-2">
                #{patient.queueNumber} - {patient.name}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
