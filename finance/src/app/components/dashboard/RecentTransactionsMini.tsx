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

interface RecentTransactionsMiniProps {
  transactions: Transaction[];
  onViewAll?: () => void;
}

const categoryColors: Record<string, string> = {
  Salary: "bg-emerald-100 text-emerald-700",
  Freelance: "bg-teal-100 text-teal-700",
  "Food & Dining": "bg-amber-100 text-amber-700",
  Transport: "bg-blue-100 text-blue-700",
  Shopping: "bg-pink-100 text-pink-700",
  Entertainment: "bg-violet-100 text-violet-700",
  "Bills & Utilities": "bg-slate-100 text-slate-600",
  Health: "bg-rose-100 text-rose-700",
  Travel: "bg-cyan-100 text-cyan-700",
  Education: "bg-indigo-100 text-indigo-700",
};

const RecentTransactionsMini: React.FC<RecentTransactionsMiniProps> = ({
  transactions,
  onViewAll,
}) => {
  const recent = transactions.slice(0, 5);

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-0.5">Latest financial activity</p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors flex items-center gap-1"
          >
            View all
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">No transactions yet</div>
      ) : (
        <div className="space-y-3">
          {recent.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between gap-3 py-2 border-b border-purple-50 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.type === "income"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-500"
                  }`}
                >
                  {tx.type === "income" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{tx.title}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                        categoryColors[tx.category] || "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tx.category}
                    </span>
                    <span className="text-xs text-slate-400">{tx.date}</span>
                  </div>
                </div>
              </div>
              <span
                className={`text-sm font-bold shrink-0 ${
                  tx.type === "income" ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}₹
                {Math.abs(tx.amount).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentTransactionsMini;