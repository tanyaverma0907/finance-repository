import { useState, useMemo } from 'react';
import { Transaction, TransactionFilters } from '../types/transaction';

const defaultFilters: TransactionFilters = {
  search: '',
  category: 'All Categories',
  type: 'All Types',
  sortBy: 'date',
  sortOrder: 'desc',
};

export const useFilters = (transactions: Transaction[]) => {
  const [filters, setFilters] = useState<TransactionFilters>(defaultFilters);

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        t =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (filters.category !== 'All Categories') {
      result = result.filter(t => t.category === filters.category);
    }

    if (filters.type !== 'All Types') {
      result = result.filter(t => t.type === filters.type);
    }

    result.sort((a, b) => {
      let diff = 0;
      if (filters.sortBy === 'date') diff = a.date.localeCompare(b.date);
      else if (filters.sortBy === 'amount') diff = a.amount - b.amount;
      else diff = a.category.localeCompare(b.category);
      return filters.sortOrder === 'asc' ? diff : -diff;
    });

    return result;
  }, [transactions, filters]);

  const updateFilter = <K extends keyof TransactionFilters>(
    key: K,
    value: TransactionFilters[K]
  ) => setFilters(prev => ({ ...prev, [key]: value }));

  const resetFilters = () => setFilters(defaultFilters);

  return { filters, filtered, updateFilter, resetFilters };
};