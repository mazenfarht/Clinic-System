"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";
import { useQueue } from "../hooks/useQueue";

export default function AnalyticsChart({ chartData }: any) {
  // =========================
  // TOTAL
  // =========================
  const total = useMemo(() => {
    return chartData.reduce((sum: number, item: any) => sum + item.count, 0);
  }, [chartData]);

  // =========================
  // PERCENTAGE DATA
  // =========================
  const data = useMemo(() => {
    return chartData.map((item: any) => ({
      ...item,
      value: (item.count / total) * 100,
    }));
  }, [chartData, total]);

  // =========================
  // COLORS
  // =========================
  const COLORS = ["#1A6BCC", "#34D399", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* =========================
          BAR CHART (LEFT - BIG)
      ========================= */}
      <div className="bg-white p-5 rounded-xl border lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Patients per Day</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
            />
            <Bar dataKey="count" fill="#1A6BCC" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* =========================
          DONUT + LEGEND (RIGHT)
      ========================= */}
      <div className="bg-white p-5 rounded-xl border flex flex-col items-center justify-center gap-6">
        {/* DONUT */}
        <div className="w-[180px] h-[180px]">
          <div className="relative w-[200px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="date"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {data.map((_: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* =========================
      CENTER TOTAL PATIENTS
  ========================= */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-gray-500">Total Patients</p>

              <h2 className="text-2xl font-bold text-[#1A2B45]">{total}</h2>

              <p className="text-[10px] text-gray-400">All days combined</p>
            </div>
          </div>
        </div>

        {/* LEGEND */}
        <div className="flex flex-col gap-3 w-full">
          {data.map((item: any, index: number) => (
            <div key={item.date} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />

              <span className="text-sm text-[#1A2B45]">
                {item.date} — {item.count} patients ({item.value.toFixed(1)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
