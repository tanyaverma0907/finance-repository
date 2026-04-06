import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../ui/Card";

interface SpendingCategory {
  name: string;
  value: number;
  percentage: number;
}

interface SpendingPieChartProps {
  data: SpendingCategory[];
}

const COLORS = [
  "#9333ea", "#6366f1", "#ec4899", "#f59e0b",
  "#10b981", "#3b82f6", "#ef4444", "#8b5cf6",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-purple-100 rounded-xl shadow-lg p-3">
        <p className="text-xs font-bold text-slate-700">{payload[0].name}</p>
        <p className="text-sm font-bold text-purple-600 mt-0.5">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-slate-400">{payload[0].payload.percentage}%</p>
      </div>
    );
  }
  return null;
};

const SpendingPieChart: React.FC<SpendingPieChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Card className="p-5">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">Spending by Category</h3>
        <p className="text-xs text-slate-400 mt-0.5">Where your money goes</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-44 h-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          {data.slice(0, 6).map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs text-slate-600 font-medium truncate">{item.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-700 shrink-0">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SpendingPieChart;