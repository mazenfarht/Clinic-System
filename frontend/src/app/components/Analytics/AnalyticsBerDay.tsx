import { useDate } from "../../../context/DateContext";
import { useAnalytics } from "../../../hooks/useAnalytics";

export default function AnalyticsBerDay() {
  const { date } = useDate();
  const { totalPatientsToday, totalServedToday, waitingPatients } =
    useAnalytics(date);

  return (
    <div className="w-full p-4 sm:p-5 md:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Patients */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between min-h-[140px]">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Total Patients Today
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#1A2B45]">
            {totalPatientsToday}
          </h2>
        </div>

        {/* Total Served */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between min-h-[140px]">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Total Served Today
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-green-600">
            {totalServedToday}
          </h2>
        </div>

        {/* Waiting Patients */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between min-h-[140px] sm:col-span-2 lg:col-span-1">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Waiting Patients
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-orange-500">
            {waitingPatients}
          </h2>
        </div>
      </div>
    </div>
  );
}
