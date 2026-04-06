import React from "react";
import Card from "../ui/Card";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
}

interface SavingsRateCardProps {
  transactions: Transaction[];
}

const getHealthLabel = (rate: number): { label: string; color: string; bg: string; desc: string } => {
  if (rate >= 70) return { label: "Excellent", color: "#059669", bg: "#d1fae5", desc: "Outstanding savings discipline!" };
  if (rate >= 50) return { label: "Good", color: "#2563eb", bg: "#dbeafe", desc: "Above average savings rate." };
  if (rate >= 30) return { label: "Fair", color: "#d97706", bg: "#fef3c7", desc: "Room to improve savings." };
  return { label: "Poor", color: "#dc2626", bg: "#fee2e2", desc: "Consider reducing expenses." };
};

const SavingsRateCard: React.FC<SavingsRateCardProps> = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const saved = income - expenses;
  const savingsRate = income > 0 ? Math.round((saved / income) * 100) : 0;
  const health = getHealthLabel(savingsRate);

  const chartData = [{ name: "Savings", value: savingsRate, fill: health.color }];

  const stats = [
    { label: "Total Income", value: `₹${income.toLocaleString("en-IN")}`, color: "#059669" },
    { label: "Total Spent", value: `₹${expenses.toLocaleString("en-IN")}`, color: "#e11d48" },
    { label: "Net Saved", value: `₹${saved.toLocaleString("en-IN")}`, color: "#7c3aed" },
  ];

  return (
    <Card className="p-5">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">Savings Rate</h3>
        <p className="text-xs text-slate-400 mt-0.5">How much of your income you keep</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Radial Chart */}
        <div className="relative w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={90 - 360 * (savingsRate / 100)}
              barSize={12}
              data={chartData}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                background={{ fill: "#f5f3ff" }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-slate-800">{savingsRate}%</span>
            <span className="text-xs font-semibold text-slate-400 mt-0.5">saved</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4 flex-1 w-full">
          {/* Health Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl self-start"
            style={{ backgroundColor: health.bg }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: health.color }}
            />
            <span className="text-sm font-bold" style={{ color: health.color }}>
              {health.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 -mt-2">{health.desc}</p>

          {/* Stats */}
          <div className="flex flex-col gap-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{s.label}</span>
                <span className="text-sm font-bold" style={{ color: s.color }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 font-semibold mb-1.5">
              <span>Spent ({100 - savingsRate}%)</span>
              <span>Saved ({savingsRate}%)</span>
            </div>
            <div className="h-3 bg-rose-100 rounded-full overflow-hidden flex">
              <div
                className="h-full transition-all duration-700 ease-out"
                style={{
                  width: `${100 - savingsRate}%`,
                  background: "linear-gradient(90deg,#f43f5e,#fb7185)",
                }}
              />
              <div
                className="h-full transition-all duration-700 ease-out"
                style={{
                  width: `${savingsRate}%`,
                  background: "linear-gradient(90deg,#a78bfa,#9333ea)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SavingsRateCard;