import type { Transaction } from '../../app/types/transaction';

export const getTotalIncome = (transactions: Transaction[]) =>
  transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

export const getTotalExpenses = (transactions: Transaction[]) =>
  transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

export const getBalance = (transactions: Transaction[]) =>
  getTotalIncome(transactions) - getTotalExpenses(transactions);

export const getSpendingByCategory = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

export const getMonthlyData = (transactions: Transaction[]) => {
  const map: Record<string, { income: number; expense: number }> = {};
  transactions.forEach(t => {
    const key = t.date.slice(0, 7);
    if (!map[key]) map[key] = { income: 0, expense: 0 };
    if (t.type === 'income') map[key].income += t.amount;
    else map[key].expense += t.amount;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }));
};

export const getBalanceTrend = (transactions: Transaction[]) => {
  const monthly = getMonthlyData(transactions);
  let running = 0;
  return monthly.map(m => {
    running += m.income - m.expense;
    return { month: m.month, balance: running };
  });
};

export const getWeeklyHeatmap = (transactions: Transaction[]) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeks = 13; // last 13 weeks
  const result: { day: number; week: number; value: number }[] = [];

  const now = new Date('2026-04-05');
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(now.getDate() - w * 7 - (6 - d));
      const dateStr = date.toISOString().slice(0, 10);
      const value = transactions
        .filter(t => t.date === dateStr && t.type === 'expense')
        .reduce((s, t) => s + t.amount, 0);
      result.push({ day: d, week: weeks - 1 - w, value });
    }
  }
  return { data: result, days };
};

export const getSavingsRate = (transactions: Transaction[]) => {
  const income = getTotalIncome(transactions);
  const expense = getTotalExpenses(transactions);
  if (income === 0) return 0;
  return Math.round(((income - expense) / income) * 100);
};