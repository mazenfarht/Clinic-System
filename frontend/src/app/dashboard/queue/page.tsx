"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { checkInPatient, nextPatient } from "@/src/services/patient";

export default function Queue() {
  const { queue, loading, fullQueue } = useQueue();

  if (loading) return <p>Loading...</p>;
  if (!queue) return <p>No data</p>;

  return (
    <>
      <h1>Queue Page</h1>

      <div className="bg-white rounded-xl border border-[#E2E8EF] p-4">
        <h3 className="text-lg text-black font-semibold mb-4">Full Queue</h3>

        <table className="w-full text-left">
          <thead className="bg-[#F8FAFB] text-[#6B7A92] text-sm">
            <tr>
              <th className="p-3">Number</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {fullQueue.map((patient: any) => (
              <tr key={patient.id} className="border-b border-[#F0F3F7]">
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
                          : patient.status === "current"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-green-100 text-green-600"
                      }`}
                  >
                    {patient.status}
                  </span>
                </td>

                <td className="p-3">
                  {patient.status === "scheduled" && (
                    <button
                      onClick={() => checkInPatient(patient.id)}
                      className="bg-green-800 hover:bg-green-950 text-white px-3 py-1 rounded"
                    >
                      Check-In
                    </button>
                  )}

                  {patient.status === "current" && (
                    <button
                      onClick={() => nextPatient()}
                      className="bg-blue-800 hover:bg-blue-950 text-white px-3 py-1 rounded"
                    >
                      Done
                    </button>
                  )}

                  {patient.status === "waiting" && (
                    <span className="text-blue-600 font-medium">Waiting</span>
                  )}

                  {patient.status === "done" && (
                    <span className="text-green-600 font-medium">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
