import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

export const SidebarItem: React.FC<Props> = ({ to, icon, label, collapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
        isActive
          ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-200'
          : 'text-slate-500 hover:bg-purple-50 hover:text-purple-700'
      }`
    }
    title={collapsed ? label : undefined}
  >
    <span className="shrink-0 w-5 h-5 flex items-center justify-center">{icon}</span>
    {!collapsed && <span className="truncate">{label}</span>}
  </NavLink>
);