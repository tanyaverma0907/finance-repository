export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Bills & Utilities'
  | 'Entertainment'
  | 'Travel'
  | 'Health'
  | 'Education'
  | 'Other';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string; // ISO string
  note?: string;
}

export interface TransactionFilters {
  search: string;
  category: TransactionCategory | 'All Categories';
  type: TransactionType | 'All Types';
  sortBy: 'date' | 'amount' | 'category';
  sortOrder: 'asc' | 'desc';
}