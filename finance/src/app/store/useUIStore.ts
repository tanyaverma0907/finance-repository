import { create } from 'zustand';
import type { UserRole } from '../types/user';

interface UIStore {
  role: UserRole;
  sidebarCollapsed: boolean;
  setRole: (role: UserRole) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  role: 'viewer',
  sidebarCollapsed: false,
  setRole: (role) => set({ role }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));