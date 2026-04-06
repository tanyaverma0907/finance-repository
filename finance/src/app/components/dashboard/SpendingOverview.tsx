import React from "react";
import Card from "../ui/Card";

interface SpendingOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
}

const SpendingOverview: React.FC<SpendingOverviewProps> = ({
  totalIncome,
  totalExpenses,
  savingsRate,
}) => {
  const spendingRate = 100 - savingsRate;

  return (
    <Card className="p-5">
      <div className="mb-5">
        <h3 className="text-base font-bold text-slate-800">Financial Overview</h3>
        <p className="text-xs text-slate-400 mt-0.5">Income vs spending breakdown</p>
      </div>

      <div className="space-y-4">
        {/* Income Bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Income</span>
            <span className="text-xs font-bold text-emerald-600">₹{totalIncome.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full" style={{ width: "100%" }} />
          </div>
        </div>

        {/* Expenses Bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Expenses</span>
            <span className="text-xs font-bold text-rose-500">₹{totalExpenses.toLocaleString("en-IN")}</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${spendingRate}%` }}
            />
          </div>
        </div>

        {/* Savings Bar */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Savings Rate</span>
            <span className="text-xs font-bold text-purple-600">{savingsRate}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700"
              style={{ width: `${savingsRate}%` }}
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-purple-50 flex items-center justify-between">
          <div className="text-center">
            <p className="text-lg font-bold text-emerald-600">{savingsRate}%</p>
            <p className="text-xs text-slate-400">Savings Rate</p>
          </div>
          <div className="w-px h-8 bg-purple-100" />
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600">
              ₹{(totalIncome - totalExpenses).toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-slate-400">Net Savings</p>
          </div>
          <div className="w-px h-8 bg-purple-100" />
          <div className="text-center">
            <p className="text-lg font-bold text-slate-700">{spendingRate}%</p>
            <p className="text-xs text-slate-400">Spent</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpendingOverview;