import React from "react";
import SummaryCards from "../../components/dashboard/SummaryCards";
import BalanceTrendChart from "../../components/dashboard/BalanceTrendChart";
import SpendingPieChart from "../../components/dashboard/SpendingPieChart";
import WeeklyHeatmap from "../../components/dashboard/WeeklyHeatmap";
import RecentTransactionsMini from "../../components/dashboard/RecentTransactionsMini";
import SpendingOverview from "../../components/dashboard/SpendingOverview";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useNavigate } from "react-router-dom";


// ── Derived helpers ──────────────────────────────────────────────────────────
function calcSummary(transactions: any[]) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
  return { income, expenses, balance, savingsRate, transactionCount: transactions.length };
}

function buildBalanceTrend(transactions: any[]) {
  // Group by month and compute running balance
  const monthly: Record<string, number> = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
    monthly[key] = (monthly[key] || 0) + (t.type === "income" ? t.amount : -t.amount);
  });
  let running = 0;
  return Object.entries(monthly).map(([month, delta]) => {
    running += delta;
    return { month, balance: running > 0 ? running : 0 };
  });
}

function buildCategorySpending(transactions: any[]) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((s, t) => s + t.amount, 0);
  const byCategory: Record<string, number> = {};
  expenses.forEach((t) => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
  });
  return Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({
      name,
      value,
      percentage: total > 0 ? Math.round((value / total) * 100) : 0,
    }));
}

function buildWeeklyHeatmap(transactions: any[]): number[][] {
  // Returns [week][day] grid (4 weeks × 7 days)
  const grid: number[][] = Array.from({ length: 4 }, () => Array(7).fill(0));
  const expenses = transactions.filter((t) => t.type === "expense");
  expenses.forEach((t) => {
    const d = new Date(t.date);
    const dayOfWeek = d.getDay(); // 0=Sun
    const dayOfMonth = d.getDate();
    const weekIdx = Math.min(Math.floor((dayOfMonth - 1) / 7), 3);
    grid[weekIdx][dayOfWeek] += t.amount;
  });
  return grid;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export const DashboardPage: React.FC = () => {
  const { transactions } = useTransactionStore();
  const navigate = useNavigate();

  const summary = calcSummary(transactions);
  const balanceTrend = buildBalanceTrend(transactions);
  const categoryData = buildCategorySpending(transactions);
  const weeklyData = buildWeeklyHeatmap(transactions);

  return (
    <div className="space-y-5">
      {/* Row 1 – Summary KPI Cards */}
      <SummaryCards
        data={{
          currentBalance: summary.balance,
          totalIncome: summary.income,
          totalExpenses: summary.expenses,
          transactionCount: summary.transactionCount,
        }}
      />

      {/* Row 2 – Balance Trend + Spending Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <BalanceTrendChart data={balanceTrend} />
        </div>
        <div className="lg:col-span-2">
          <SpendingPieChart data={categoryData} />
        </div>
      </div>

      {/* Row 3 – Spending Overview (progress bars) */}
      <SpendingOverview
        totalIncome={summary.income}
        totalExpenses={summary.expenses}
        savingsRate={summary.savingsRate}
      />

      {/* Row 4 – Weekly Heatmap + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <WeeklyHeatmap data={weeklyData} />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactionsMini
            transactions={transactions}
            onViewAll={() => navigate("/transactions")}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;