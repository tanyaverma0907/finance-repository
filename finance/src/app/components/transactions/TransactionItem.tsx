import React from "react";

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface TransactionItemProps {
  transaction: Transaction;
  isAdmin?: boolean;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
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

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  isAdmin = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-50/50 transition-colors duration-150 group border border-transparent hover:border-purple-100">
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          transaction.type === "income"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-500"
        }`}
      >
        {transaction.type === "income" ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{transaction.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${
              categoryColors[transaction.category] || "bg-slate-100 text-slate-500"
            }`}
          >
            {transaction.category}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-lg font-semibold ${
              transaction.type === "income"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-600"
            }`}
          >
            {transaction.type === "income" ? "Income" : "Expense"}
          </span>
          <span className="text-xs text-slate-400">{transaction.date}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-3 shrink-0">
        <span
          className={`text-base font-bold ${
            transaction.type === "income" ? "text-emerald-600" : "text-rose-500"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}₹
          {Math.abs(transaction.amount).toLocaleString("en-IN")}
        </span>

        {/* Admin actions */}
        {isAdmin && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit?.(transaction)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-100 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete?.(transaction.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionItem;