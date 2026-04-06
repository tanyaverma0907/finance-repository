import React from "react";
import InsightCards from "../../components/insights/InsightCards";
import IncomeExpenseChart from "../../components/insights/IncomeExpenseChart";
import CategoryBreakdown from "../../components/insights/CategoryBreakdown";
import SavingsRateCard from "../../components/insights/SavingsRateCard";
import { useTransactionStore } from "../../store/useTransactionStore";

// ── Derived helpers ──────────────────────────────────────────────────────────
function buildMonthlyData(transactions: any[]) {
  const monthly: Record<string, { income: number; expenses: number }> = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
    if (!monthly[key]) monthly[key] = { income: 0, expenses: 0 };
    if (t.type === "income") monthly[key].income += t.amount;
    else monthly[key].expenses += t.amount;
  });

  return Object.entries(monthly).map(([month, vals]) => ({
    month,
    ...vals,
  }));
}

function buildInsightData(transactions: any[]) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const saved = income - expenses;
  const savingsRate = income > 0 ? Math.round((saved / income) * 100) : 0;

  const byCategory: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

  const sorted = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const [highestCategory, highestCategoryAmount] = sorted[0] ?? ["N/A", 0];

  const healthScore =
    savingsRate >= 70
      ? "Excellent"
      : savingsRate >= 50
      ? "Good"
      : savingsRate >= 30
      ? "Fair"
      : "Poor";

  return {
    monthlySaved: saved,
    monthlyChangePercent: -68.2, // can be wired to real month-over-month diff
    savingsRate,
    highestCategory,
    highestCategoryAmount,
    financialHealthScore: healthScore as "Excellent" | "Good" | "Fair" | "Poor",
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export const InsightsPage: React.FC = () => {
  const { transactions } = useTransactionStore();

  const insightData = buildInsightData(transactions);
  const monthlyData = buildMonthlyData(transactions);

  return (
    <div className="space-y-5">
      {/* Page heading */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-800">Financial Insights</h2>
        <p className="text-sm text-slate-400 mt-0.5">
          Smart analysis of your spending patterns and financial health
        </p>
      </div>

      {/* Row 1 – 4 Insight KPI cards */}
      <InsightCards data={insightData} />

      {/* Row 2 – Savings Rate card (full width) */}
      <SavingsRateCard transactions={transactions} />

      {/* Row 3 – Income vs Expenses bar chart + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <IncomeExpenseChart data={monthlyData} />
        </div>
        <div className="lg:col-span-2">
          <CategoryBreakdown transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;