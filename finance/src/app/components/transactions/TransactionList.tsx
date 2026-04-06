import React, { useState, useMemo } from "react";
import TransactionItem from "./TransactionItem";
import TransactionFilters from "./TransactionFilters";
import SearchBar from "./SearchBar";
import AddTransactionModal from "./AddTransactionModal";
import Button from "../ui/Button";
import Card from "../ui/Card";

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface FilterState {
  category: string;
  type: string;
  sortBy: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  isAdmin?: boolean;
  onAddTransaction?: (tx: Omit<Transaction, "id">) => void;
  onDeleteTransaction?: (id: string) => void;
  onEditTransaction?: (tx: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isAdmin = false,
  onAddTransaction,
  onDeleteTransaction,
  onEditTransaction,
}) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    type: "",
    sortBy: "date-desc",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setSearch("");
    setFilters({ category: "", type: "", sortBy: "date-desc" });
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTx(null);
  };

  const handleAdd = (tx: Omit<Transaction, "id">) => {
    if (editingTx && onEditTransaction) {
      onEditTransaction({ ...tx, id: editingTx.id });
    } else if (onAddTransaction) {
      onAddTransaction(tx);
    }
  };

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (search) {
      result = result.filter((tx) =>
        tx.title.toLowerCase().includes(search.toLowerCase()) ||
        tx.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filters.category) {
      result = result.filter((tx) => tx.category === filters.category);
    }
    if (filters.type) {
      result = result.filter((tx) => tx.type === filters.type);
    }

    switch (filters.sortBy) {
      case "date-asc":
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "amount-desc":
        result.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        break;
      case "amount-asc":
        result.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
        break;
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    return result;
  }, [transactions, search, filters]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">All Transactions</h2>
          <p className="text-sm text-slate-400 mt-0.5">Manage and track your financial activities</p>
        </div>
        <div className="flex items-center gap-3">
          {!isAdmin && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Viewer mode – Read only
            </span>
          )}
          {isAdmin && (
            <Button
              onClick={() => { setEditingTx(null); setIsModalOpen(true); }}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <TransactionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </div>
      </Card>

      {/* Transaction Items */}
      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-500">No transactions found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search</p>
          </div>
        ) : (
          <div className="divide-y divide-purple-50/60 p-2">
            {filtered.map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={onDeleteTransaction}
              />
            ))}
          </div>
        )}
      </Card>

      <p className="text-xs text-slate-400 text-center">
        Showing {filtered.length} of {transactions.length} transactions
      </p>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onAdd={handleAdd}
        editingTransaction={editingTx}
      />
    </div>
  );
};

export default TransactionList;