import React from "react";
import Card from "../ui/Card";

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface CategoryBreakdownProps {
  transactions: Transaction[];
}

const CATEGORY_COLORS: Record<string, string> = {
  "Bills & Utilities": "#9333ea",
  Shopping: "#ec4899",
  "Food & Dining": "#f59e0b",
  Travel: "#06b6d4",
  Entertainment: "#8b5cf6",
  Transport: "#f97316",
  Education: "#3b82f6",
  Health: "#10b981",
  Salary: "#10b981",
  Freelance: "#6366f1",
};

const FALLBACK_COLORS = [
  "#9333ea", "#ec4899", "#f59e0b", "#06b6d4",
  "#8b5cf6", "#f97316", "#3b82f6", "#10b981",
];

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ transactions }) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((s, t) => s + t.amount, 0);

  const byCategory: Record<string, number> = {};
  expenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });

  const sorted = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value], idx) => ({
      name,
      value,
      percentage: total > 0 ? Math.round((value / total) * 100) : 0,
      color: CATEGORY_COLORS[name] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length],
    }));

  return (
    <Card className="p-5 h-full">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">Category Breakdown</h3>
        <p className="text-xs text-slate-400 mt-0.5">Expense distribution by category</p>
      </div>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <svg className="w-10 h-10 mb-3 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-sm font-semibold">No expense data</p>
          <p className="text-xs mt-1">Add some transactions to see breakdown</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {sorted.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm font-semibold text-slate-700">{cat.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400">{cat.percentage}%</span>
                  <span className="text-sm font-bold text-slate-800 min-w-17.5 text-right">
                    ₹{cat.value.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-purple-50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-2 pt-4 border-t border-purple-50 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Total Expenses</span>
            <span className="text-base font-extrabold text-purple-700">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CategoryBreakdown;