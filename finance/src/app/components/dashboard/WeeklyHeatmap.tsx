import React from "react";
import Card from "../ui/Card";

interface WeeklyHeatmapProps {
  data: number[][]; // [week][day] spending amounts
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKS = ["W1", "W2", "W3", "W4"];

const getIntensityClass = (value: number, max: number): string => {
  if (value === 0) return "bg-purple-50";
  const ratio = value / max;
  if (ratio < 0.25) return "bg-purple-200";
  if (ratio < 0.5) return "bg-purple-400";
  if (ratio < 0.75) return "bg-purple-600";
  return "bg-purple-800";
};

const WeeklyHeatmap: React.FC<WeeklyHeatmapProps> = ({ data }) => {
  const allValues = data.flat();
  const maxValue = Math.max(...allValues, 1);

  return (
    <Card className="p-5">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">Weekly Spending Heatmap</h3>
        <p className="text-xs text-slate-400 mt-0.5">Daily spending intensity</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-70">
          {/* Week headers */}
          <div className="flex items-center mb-2">
            <div className="w-10" />
            {WEEKS.map((w) => (
              <div key={w} className="flex-1 text-center text-xs text-slate-400 font-medium">
                {w}
              </div>
            ))}
          </div>

          {/* Grid */}
          {DAYS.map((day, dayIdx) => (
            <div key={day} className="flex items-center gap-0 mb-1.5">
              <div className="w-10 text-xs text-slate-400 font-medium shrink-0">{day}</div>
              <div className="flex gap-1.5 flex-1">
                {WEEKS.map((_, weekIdx) => {
                  const value = data[weekIdx]?.[dayIdx] ?? 0;
                  return (
                    <div
                      key={weekIdx}
                      className="flex-1 aspect-square rounded-md transition-all duration-200 hover:scale-110 cursor-pointer group relative"
                      style={{ minWidth: 28, maxWidth: 44 }}
                    >
                      <div
                        className={`w-full h-full rounded-md ${getIntensityClass(value, maxValue)}`}
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-10">
                        <div className="bg-slate-800 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap font-medium">
                          ₹{value.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-xs text-slate-400">Less</span>
            {["bg-purple-50", "bg-purple-200", "bg-purple-400", "bg-purple-600", "bg-purple-800"].map(
              (cls) => (
                <div key={cls} className={`w-4 h-4 rounded-sm ${cls}`} />
              )
            )}
            <span className="text-xs text-slate-400">More</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyHeatmap;