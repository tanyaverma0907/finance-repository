import React from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";

interface FilterState {
  category: string;
  type: string;
  sortBy: string;
}

interface TransactionFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

const CATEGORY_OPTIONS = [
  { value: "", label: "All Categories" },
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
  { value: "", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const SORT_OPTIONS = [
  { value: "date-desc", label: "Date (Newest)" },
  { value: "date-asc", label: "Date (Oldest)" },
  { value: "amount-desc", label: "Amount (High-Low)" },
  { value: "amount-asc", label: "Amount (Low-High)" },
];

const hasActiveFilters = (filters: FilterState) =>
  filters.category !== "" || filters.type !== "" || filters.sortBy !== "date-desc";

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-35">
        <Select
          options={CATEGORY_OPTIONS}
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        />
      </div>
      <div className="flex-1 min-w-30">
        <Select
          options={TYPE_OPTIONS}
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
        />
      </div>
      <div className="flex-1 min-w-40">
        <Select
          options={SORT_OPTIONS}
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
        />
      </div>
      {hasActiveFilters(filters) && (
        <Button variant="ghost" size="sm" onClick={onReset}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Reset
        </Button>
      )}
    </div>
  );
};

export default TransactionFilters;