import type { Transaction } from '../../app/types/transaction';

export const mockTransactions: Transaction[] = [
  // January 2026
  { id: '1',  title: 'Monthly salary',        amount: 85000, type: 'income',  category: 'Salary',          date: '2026-01-01' },
  { id: '2',  title: 'Web design project',    amount: 15000, type: 'income',  category: 'Freelance',       date: '2026-01-05' },
  { id: '3',  title: 'Grocery shopping',      amount: 2500,  type: 'expense', category: 'Food & Dining',   date: '2026-01-03' },
  { id: '4',  title: 'Uber rides',            amount: 1500,  type: 'expense', category: 'Transport',       date: '2026-01-04' },
  { id: '5',  title: 'New headphones',        amount: 5000,  type: 'expense', category: 'Shopping',        date: '2026-01-08' },
  { id: '6',  title: 'Electricity bill',      amount: 3200,  type: 'expense', category: 'Bills & Utilities', date: '2026-01-10' },
  { id: '7',  title: 'Netflix subscription',  amount: 649,   type: 'expense', category: 'Entertainment',   date: '2026-01-12' },
  { id: '8',  title: 'Flight tickets',        amount: 12000, type: 'expense', category: 'Travel',          date: '2026-01-15' },
  { id: '9',  title: 'Online course',         amount: 3500,  type: 'expense', category: 'Education',       date: '2026-01-18' },
  { id: '10', title: 'Doctor visit',          amount: 1200,  type: 'expense', category: 'Health',          date: '2026-01-20' },
  { id: '11', title: 'Restaurant dinner',     amount: 2100,  type: 'expense', category: 'Food & Dining',   date: '2026-01-22' },
  { id: '12', title: 'Mobile bill',           amount: 800,   type: 'expense', category: 'Bills & Utilities', date: '2026-01-25' },
  { id: '13', title: 'Investment returns',    amount: 5000,  type: 'income',  category: 'Investment',      date: '2026-01-28' },

  // February 2026
  { id: '14', title: 'Monthly salary',        amount: 85000, type: 'income',  category: 'Salary',          date: '2026-02-01' },
  { id: '15', title: 'Grocery shopping',      amount: 3100,  type: 'expense', category: 'Food & Dining',   date: '2026-02-03' },
  { id: '16', title: 'Internet bill',         amount: 1200,  type: 'expense', category: 'Bills & Utilities', date: '2026-02-05' },
  { id: '17', title: 'Clothes shopping',      amount: 7500,  type: 'expense', category: 'Shopping',        date: '2026-02-08' },
  { id: '18', title: 'Gym membership',        amount: 2000,  type: 'expense', category: 'Health',          date: '2026-02-10' },
  { id: '19', title: 'Spotify subscription',  amount: 119,   type: 'expense', category: 'Entertainment',   date: '2026-02-12' },
  { id: '20', title: 'Taxi rides',            amount: 2200,  type: 'expense', category: 'Transport',       date: '2026-02-14' },
  { id: '21', title: 'Hotel booking',         amount: 8000,  type: 'expense', category: 'Travel',          date: '2026-02-16' },
  { id: '22', title: 'Freelance logo design', amount: 8000,  type: 'income',  category: 'Freelance',       date: '2026-02-18' },
  { id: '23', title: 'Water & gas bill',      amount: 1500,  type: 'expense', category: 'Bills & Utilities', date: '2026-02-20' },
  { id: '24', title: 'Books',                 amount: 1200,  type: 'expense', category: 'Education',       date: '2026-02-22' },

  // March 2026
  { id: '25', title: 'Monthly salary',        amount: 85000, type: 'income',  category: 'Salary',          date: '2026-03-01' },
  { id: '26', title: 'Bonus payment',         amount: 20000, type: 'income',  category: 'Salary',          date: '2026-03-05' },
  { id: '27', title: 'Grocery shopping',      amount: 2800,  type: 'expense', category: 'Food & Dining',   date: '2026-03-04' },
  { id: '28', title: 'Electricity bill',      amount: 3500,  type: 'expense', category: 'Bills & Utilities', date: '2026-03-07' },
  { id: '29', title: 'Shopping mall',         amount: 9500,  type: 'expense', category: 'Shopping',        date: '2026-03-10' },
  { id: '30', title: 'Weekend trip',          amount: 15000, type: 'expense', category: 'Travel',          date: '2026-03-13' },
  { id: '31', title: 'Cab rides',             amount: 3200,  type: 'expense', category: 'Transport',       date: '2026-03-15' },
  { id: '32', title: 'Movie tickets',         amount: 1200,  type: 'expense', category: 'Entertainment',   date: '2026-03-18' },
  { id: '33', title: 'Medical checkup',       amount: 2500,  type: 'expense', category: 'Health',          date: '2026-03-20' },
  { id: '34', title: 'Investment returns',    amount: 7000,  type: 'income',  category: 'Investment',      date: '2026-03-25' },
  { id: '35', title: 'Mobile bill',           amount: 800,   type: 'expense', category: 'Bills & Utilities', date: '2026-03-28' },

  // April 2026
  { id: '36', title: 'Monthly salary',        amount: 85000, type: 'income',  category: 'Salary',          date: '2026-04-01' },
  { id: '37', title: 'Dining out',            amount: 3500,  type: 'expense', category: 'Food & Dining',   date: '2026-04-02' },
  { id: '38', title: 'Taxi rides',            amount: 2200,  type: 'expense', category: 'Transport',       date: '2026-04-03' },
  { id: '39', title: 'Electronics',           amount: 7000,  type: 'expense', category: 'Shopping',        date: '2026-04-04' },
  { id: '40', title: 'UI/UX design work',     amount: 18000, type: 'income',  category: 'Freelance',       date: '2026-04-05' },
];