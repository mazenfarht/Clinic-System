import { useDate } from "../context/DateContext";
import { useAnalytics } from "../hooks/useAnalytics";

export default function AnalyticsBerDay() {
  const { date } = useDate();
  const { totalPatientsToday, totalServedToday, waitingPatients } =
    useAnalytics(date);

  return (
    <div className="p-6">
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
    </div>
  );
}
