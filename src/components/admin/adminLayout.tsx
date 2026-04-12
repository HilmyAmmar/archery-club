'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Wallet, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Activity // <-- Tambahan icon buat log
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Data Member', href: '/admin/members', icon: Users },
  { name: 'Iuran Bulanan', href: '/admin/billing', icon: CreditCard },
  { name: 'Kas Harian', href: '/admin/cash', icon: Wallet },
  { name: 'Laporan Keuangan', href: '/admin/reports', icon: BarChart3 },
  // Tambahin rute log di sini
  { name: 'Riwayat Sistem', href: '/admin/logs', icon: Activity }, 
];

export default function AdminLayout({ 
  children, 
  title, 
  subtitle,
  action 
}: { 
  children: React.ReactNode; 
  title: string; 
  subtitle: string;
  action?: React.ReactNode;
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter(); 
  const [adminName, setAdminName] = useState('Admin');
  const [role, setRole] = useState('');

  // --- Fungsi Logout Baru ---
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
      router.refresh(); 
    } catch (error) {
      console.error('Gagal logout:', error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0f172a] text-white w-64 md:w-72">
      <div className="p-6 flex items-center gap-3">
        <img src="/favicon.ico" alt="FAST Logo" className="w-10 h-10 object-contain shrink-0" />
        <div className="flex flex-col">
          <span className="font-black text-xl leading-none tracking-wide text-white">FAST</span>
          <span className="text-blue-400 text-xs font-medium">Admin Portal</span>
        </div>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">
            {/* Tampilkan inisial huruf pertama dari nama admin */}
            {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-white">{adminName}</span>
            <span className="text-xs text-blue-400 font-medium uppercase">{role}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          suppressHydrationWarning
          className="flex items-center gap-3 px-4 py-2 w-full text-left text-sm font-medium text-slate-400 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setAdminName(userObj.name || userObj.username || 'Admin');
        setRole(userObj.role || 'User');
      } catch (e) {
        console.error("Gagal parse user data");
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileOpen(false)}
          >
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="relative z-10 animate-in slide-in-from-left duration-300 shadow-2xl h-full">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shadow-xl z-20">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow-sm border-b border-slate-100 z-10">
          <div className="flex items-center gap-3">
            <img src="/favicon.ico" alt="FAST Logo" className="w-8 h-8 object-contain shrink-0" />
            <div className="flex flex-col">
              <span className="font-black text-lg leading-none tracking-wide text-slate-800">FAST</span>
              <span className="text-blue-600 text-[10px] font-bold uppercase tracking-wider">Admin Portal</span>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 relative">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
              <p className="text-slate-500 text-sm md:text-base font-medium mt-1">{subtitle}</p>
            </div>
            {action && (
              <div>{action}</div>
            )}
          </div>
          {children}
        </main>
      </div>

    </div>
  );
}