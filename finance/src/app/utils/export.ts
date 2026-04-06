import type { Transaction } from '../../app/types/transaction';

export const exportToCSV = (transactions: Transaction[]) => {
  const headers = ['ID', 'Title', 'Amount', 'Type', 'Category', 'Date'];
  const rows = transactions.map(t => [
    t.id, t.title, t.amount, t.type, t.category, t.date,
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.csv';
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToJSON = (transactions: Transaction[]) => {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions.json';
  a.click();
  URL.revokeObjectURL(url);
};