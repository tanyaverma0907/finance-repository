import React from "react";
import Card from "../ui/Card";

interface SummaryCardProps {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: React.ReactNode;
  gradient?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  change,
  changePositive,
  icon,
  gradient = false,
}) => (
  <Card hover gradient={gradient} className="p-5">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${gradient ? "text-purple-100" : "text-slate-400"}`}>
          {title}
        </p>
        <p className={`text-2xl font-bold ${gradient ? "text-white" : "text-slate-800"}`}>
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-xl ${gradient ? "bg-white/20" : "bg-linear-to-br from-purple-50 to-indigo-100"}`}>
        <span className={gradient ? "text-white" : "text-purple-600"}>{icon}</span>
      </div>
    </div>
    <div className="flex items-center gap-1.5">
      <span className={`flex items-center gap-0.5 text-xs font-bold ${changePositive ? "text-emerald-500" : "text-rose-500"}`}>
        {changePositive ? (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
        {change}
      </span>
      <span className={`text-xs ${gradient ? "text-purple-200" : "text-slate-400"}`}>vs last month</span>
    </div>
  </Card>
);

interface SummaryData {
  currentBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactionCount: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

const formatCurrency = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  const cards = [
    {
      title: "Current Balance",
      value: formatCurrency(data.currentBalance),
      change: "68.2%",
      changePositive: false,
      gradient: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      title: "Total Income",
      value: formatCurrency(data.totalIncome),
      change: "12.5%",
      changePositive: true,
      gradient: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Total Expenses",
      value: formatCurrency(data.totalExpenses),
      change: "8.3%",
      changePositive: false,
      gradient: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
    },
    {
      title: "Transactions",
      value: String(data.transactionCount),
      change: "5.2%",
      changePositive: true,
      gradient: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;