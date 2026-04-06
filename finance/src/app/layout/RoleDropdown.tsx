import React from 'react';
import { Shield, Eye, ChevronDown } from 'lucide-react';
import { useUIStore } from '../../app/store/useUIStore';
import type { UserRole } from '../../app/types/user';

export const RoleDropdown: React.FC = () => {
  const { role, setRole } = useUIStore();

  return (
    <div className="relative flex items-center gap-2">
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
        role === 'admin'
          ? 'bg-purple-100 text-purple-700'
          : 'bg-slate-100 text-slate-600'
      }`}>
        {role === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
        {role === 'admin' ? 'Admin' : 'Viewer'}
      </div>
      <div className="relative group">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-purple-100 rounded-xl hover:bg-purple-50 text-slate-600 transition-colors">
          Switch Role <ChevronDown size={12} />
        </button>
        <div className="absolute right-0 top-full mt-1 w-36 glass-card rounded-xl shadow-xl overflow-hidden z-50 hidden group-hover:block border border-purple-100">
          {(['admin', 'viewer'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors ${
                role === r ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-purple-50 text-slate-600'
              }`}
            >
              {r === 'admin' ? <Shield size={13} /> : <Eye size={13} />}
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};