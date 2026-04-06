import React, { useState } from "react";
import TransactionList from "../../components/transactions/TransactionList";
import AddTransactionModal from "../../components/transactions/AddTransactionModal";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useTransactionStore } from "../../store/useTransactionStore";
import { useUIStore } from "../../store/useUIStore";

// ── Types (mirrors your transaction type) ────────────────────────────────────
interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

// ── Page ─────────────────────────────────────────────────────────────────────
export const TransactionsPage: React.FC = () => {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactionStore();
  const { role } = useUIStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const isAdmin = role === "admin";

  const handleEdit = (t: Transaction) => {
    setEditTx(t);
    setModalOpen(true);
  };

  const handleSave = (data: Omit<Transaction, "id">) => {
    if (editTx) {
      updateTransaction(editTx.id, data);
    } else {
      addTransaction(data);
    }
    setEditTx(null);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this transaction?")) {
      deleteTransaction(id);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditTx(null);
  };

  return (
    <div className="space-y-4">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">All Transactions</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage and track your financial activities
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isAdmin && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-xl">
              {/* Eye icon */}
              <svg
                className="w-3.5 h-3.5 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-xs font-semibold text-indigo-600">
                Viewer mode – Read only
              </span>
            </div>
          )}

          {isAdmin && (
            <Button
              icon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              }
              onClick={() => {
                setEditTx(null);
                setModalOpen(true);
              }}
            >
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* ── Transaction List (contains its own search + filter bar) ─────── */}
      {/*
        TransactionList already renders the search bar, filter dropdowns,
        the transaction items, and empty states internally.
        We pass all the data and admin capabilities down as props.
      */}
      <TransactionList
        transactions={transactions}
        isAdmin={isAdmin}
        onAddTransaction={isAdmin ? (data) => addTransaction(data) : undefined}
        onDeleteTransaction={isAdmin ? handleDelete : undefined}
        onEditTransaction={isAdmin ? (tx) => handleEdit(tx) : undefined}
      />

      {/* ── Add / Edit Modal ─────────────────────────────────────────────── */}
      <AddTransactionModal
        isOpen={modalOpen}
        onClose={handleClose}
        onAdd={handleSave}
        editingTransaction={editTx}
      />
    </div>
  );
};

export default TransactionsPage;