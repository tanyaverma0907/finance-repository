import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction } from '../../app/types/transaction';
import { mockTransactions } from '../data/mockTransactions';

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  resetToMock: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      addTransaction: (t) =>
        set((s) => ({
          transactions: [
            { ...t, id: Date.now().toString() },
            ...s.transactions,
          ],
        })),
      updateTransaction: (id, updated) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updated } : t
          ),
        })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),
      resetToMock: () => set({ transactions: mockTransactions }),
    }),
    { name: 'financehub-transactions' }
  )
);