import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Download, User, ChevronDown } from 'lucide-react';
import { RoleDropdown } from './RoleDropdown';
import Button  from '../components/ui/Button';
import { useTransactionStore } from '../store/useTransactionStore';
import { exportToCSV, exportToJSON } from '../utils/export';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

export const Header: React.FC = () => {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'Dashboard';
  const { transactions } = useTransactionStore();
  const [showExport, setShowExport] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white/70 backdrop-blur-xl border-b border-purple-100/60">
      <h1 className="text-xl font-extrabold text-slate-800">{title}</h1>

      <div className="flex items-center gap-3">
        <RoleDropdown />

        {/* Export button */}
        <div className="relative">
          <Button
            variant="secondary"
            size="sm"
            icon={<Download size={13} />}
            onClick={() => setShowExport(p => !p)}
          >
            Export <ChevronDown size={12} />
          </Button>
          {showExport && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExport(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 glass-card rounded-xl shadow-xl overflow-hidden z-50 border border-purple-100">
                <button onClick={() => { exportToCSV(transactions); setShowExport(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 text-slate-600 font-medium transition-colors">
                  Export CSV
                </button>
                <button onClick={() => { exportToJSON(transactions); setShowExport(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-purple-50 text-slate-600 font-medium transition-colors">
                  Export JSON
                </button>
              </div>
            </>
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <User size={14} className="text-white" />
        </div>
      </div>
    </header>
  );
};
