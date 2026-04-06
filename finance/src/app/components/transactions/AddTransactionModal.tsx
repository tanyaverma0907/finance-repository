import React, { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

interface TransactionFormData {
  title: string;
  amount: string;
  category: string;
  type: "income" | "expense";
  date: string;
}

interface Transaction {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, "id">) => void;
  editingTransaction?: Transaction | null;
}

const CATEGORY_OPTIONS = [
  { value: "Salary", label: "Salary" },
  { value: "Freelance", label: "Freelance" },
  { value: "Food & Dining", label: "Food & Dining" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Bills & Utilities", label: "Bills & Utilities" },
  { value: "Health", label: "Health" },
  { value: "Travel", label: "Travel" },
  { value: "Education", label: "Education" },
];

const TYPE_OPTIONS = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const INITIAL_FORM: TransactionFormData = {
  title: "",
  amount: "",
  category: "Salary",
  type: "income",
  date: new Date().toISOString().split("T")[0],
};

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  editingTransaction,
}) => {
  const [form, setForm] = useState<TransactionFormData>(
    editingTransaction
      ? {
          title: editingTransaction.title,
          amount: String(Math.abs(editingTransaction.amount)),
          category: editingTransaction.category,
          type: editingTransaction.type,
          date: editingTransaction.date,
        }
      : INITIAL_FORM
  );
  const [errors, setErrors] = useState<Partial<TransactionFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<TransactionFormData> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      newErrors.amount = "Valid amount required";
    if (!form.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type as "income" | "expense",
      date: new Date(form.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="e.g. Monthly Salary"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          error={errors.title}
        />
        <Input
          label="Amount (₹)"
          type="number"
          placeholder="0.00"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          error={errors.amount}
          icon={<span className="text-sm font-bold text-slate-500">₹</span>}
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Type"
            options={TYPE_OPTIONS}
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as "income" | "expense" })
            }
          />
          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <Input
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          error={errors.date}
        />
        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSubmit}>
            {editingTransaction ? "Update" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTransactionModal;