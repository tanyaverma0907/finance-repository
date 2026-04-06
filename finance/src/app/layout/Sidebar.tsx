import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, ChevronsLeft, ChevronsRight, Sparkles } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { useUIStore } from '../../app/store/useUIStore';

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <aside
      className={`sidebar-glass flex flex-col h-screen sticky top-0 transition-all duration-300 z-30 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-purple-100/50">
        <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div>
            <p className="text-sm font-extrabold gradient-text tracking-tight">FinanceHub</p>
            <p className="text-xs text-slate-400">Personal Finance</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <SidebarItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" collapsed={sidebarCollapsed} />
        <SidebarItem to="/transactions" icon={<ArrowLeftRight size={18} />} label="Transactions" collapsed={sidebarCollapsed} />
        <SidebarItem to="/insights" icon={<Lightbulb size={18} />} label="Insights" collapsed={sidebarCollapsed} />
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 pb-5 border-t border-purple-100/50 pt-3">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:bg-purple-50 hover:text-purple-600 transition-colors"
        >
          {sidebarCollapsed ? <ChevronsRight size={15} /> : <><ChevronsLeft size={15} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
};
