"use client";

import { useQueue } from "@/src/hooks/useQueue";
import { nextPatient, checkInPatient } from "@/src/services/queue";
import { useDate } from "@/src/context/DateContext";

export default function Queue() {
  const { date, setDate } = useDate();
  const { queue, fullQueue, refetch } = useQueue(date);

  if (!queue) return <p className="p-6 text-[#6B7A92]">No data</p>;

  return (
    <div className=" bg-[#F8FAFB] p-6 space-y-6">
      {/* NOW SERVING CARD */}
      <div className="relative bg-[#EBF3FF] border-l-4 border-[#1A6BCC] rounded-xl p-6 shadow-sm">
        {/* DATE - TOP RIGHT */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          {/* DATE INPUT */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E2E8EF] shadow-sm">
            <span className="text-xs text-[#6B7A92]">Date</span>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-sm text-[#1A2B45] bg-transparent outline-none"
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div>
          <p className="text-xs text-[#6B7A92] uppercase tracking-widest">
            Now Serving
          </p>

          <h2 className="text-6xl font-bold text-[#1A6BCC] font-mono mt-2">
            {queue.currentPatient?.queueNumber || "---"}
          </h2>

          <p className="text-xl font-semibold text-[#1A2B45] mt-1">
            {queue.currentPatient?.name || "No Current Patient"}
          </p>

          <button
            onClick={async () => {
              await nextPatient(date);
              refetch();
            }}
            disabled={queue.waiting.length === 0}
            className="mt-5 bg-[#1A6BCC] hover:bg-[#155AB5] disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition shadow-sm"
          >
            Call Next Patient →
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border border-[#E2E8EF] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E2E8EF]">
          <h3 className="text-lg font-semibold text-[#1A2B45]">Queue List</h3>
        </div>

        {fullQueue.length === 0 ? (
          <div className="text-center text-[#6B7A92] py-8">
            No patients in queue
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFB] text-xs text-[#6B7A92] uppercase">
              <tr>
                <th className="p-3">Number</th>
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {fullQueue.map((patient: any) => (
                <tr
                  key={patient.id}
                  className="border-b border-[#F0F3F7] hover:bg-[#EBF3FF] transition"
                >
                  <td className="p-3 font-mono font-bold text-[#1A2B45]">
                    {patient.queueNumber}
                  </td>

                  <td className="p-3 font-medium text-[#1A2B45]">
                    {patient.name}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          patient.status === "waiting"
                            ? "bg-[#EBF3FF] text-[#1A6BCC]"
                            : patient.status === "current"
                            ? "bg-[#F0F0FF] text-[#6366F1]"
                            : "bg-[#E6F9F7] text-[#12B76A]"
                        }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {patient.status === "scheduled" && (
                      <button
                        onClick={async () => {
                          await checkInPatient(patient.id);
                          refetch();
                        }}
                        className="bg-[#12B76A] text-white px-3 py-1 rounded-md text-xs hover:bg-green-700 transition"
                      >
                        Check In
                      </button>
                    )}

                    {patient.status === "waiting" && (
                      <span className="text-[#1A6BCC] text-sm font-medium">
                        Waiting
                      </span>
                    )}

                    {patient.status === "current" && (
                      <span className="text-[#6366F1] text-sm font-medium">
                        In Progress
                      </span>
                    )}

                    {patient.status === "done" && (
                      <span className="text-[#12B76A] text-sm font-medium">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
