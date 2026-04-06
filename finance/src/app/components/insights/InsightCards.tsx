import React from "react";
import Card from "../ui/Card";

interface InsightData {
  monthlySaved: number;
  monthlyChangePercent: number;
  savingsRate: number;
  highestCategory: string;
  highestCategoryAmount: number;
  financialHealthScore: "Excellent" | "Good" | "Fair" | "Poor";
}

const healthScoreConfig = {
  Excellent: { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: "✓" },
  Good: { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", icon: "↑" },
  Fair: { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: "~" },
  Poor: { color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", icon: "!" },
};

interface InsightCardsProps {
  data: InsightData;
}

const InsightCards: React.FC<InsightCardsProps> = ({ data }) => {
  const health = healthScoreConfig[data.financialHealthScore];

  const cards = [
    {
      title: "Monthly Spending Trend",
      subtitle: `Great job! You spent ${Math.abs(data.monthlyChangePercent)}% less this month.`,
      value: `₹${data.monthlySaved.toLocaleString("en-IN")} saved`,
      valueColor: "text-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Savings Rate",
      subtitle: "Excellent! Your savings rate is healthy and above recommended levels.",
      value: `${data.savingsRate}%`,
      valueColor: "text-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Highest Spending Category",
      subtitle: `${data.highestCategory} is your biggest expense. Consider setting a budget limit.`,
      value: `₹${data.highestCategoryAmount.toLocaleString("en-IN")}`,
      valueColor: "text-purple-700",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "Financial Health Score",
      subtitle: "Your finances are in great shape! Keep up the good work.",
      value: data.financialHealthScore,
      valueColor: health.color,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      iconBg: `${health.bg} ${health.color}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="p-5 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${card.iconBg}`}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-700">{card.title}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{card.subtitle}</p>
              <p className={`text-lg font-bold mt-2 ${card.valueColor}`}>{card.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InsightCards;