import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Home,
  LayoutDashboard, 
  Receipt, 
  Sliders, 
  LogOut, 
  Leaf, 
  ShieldCheck, 
  X 
} from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

export default function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/expenses', label: 'Expenses (CRUD)', icon: Receipt },
    { to: '/budget', label: 'Budget Settings', icon: Sliders },
    { to: '/', label: 'Landing Home', icon: Home },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-nectar-darkCard border-r border-nectar-forest/10 dark:border-nectar-darkBorder flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Logo Brand Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-nectar-forest/10 dark:border-nectar-darkBorder">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nectar-emerald to-nectar-forest flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5 text-nectar-mint" />
              </div>
              <div>
                <h1 className="font-bold text-nectar-forest dark:text-nectar-mint tracking-tight text-base leading-tight">
                  Nectar Finance
                </h1>
                <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
                  Smart Expense & Insights
                </span>
              </div>
            </NavLink>

            <button 
              onClick={onClose} 
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-nectar-darkBg"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Overview & Controls
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                    ${isActive 
                      ? 'bg-nectar-wasabi text-nectar-forest dark:bg-nectar-forest/30 dark:text-nectar-mint shadow-sm font-bold' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-nectar-darkBg hover:text-nectar-forest dark:hover:text-white'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-nectar-forest/10 dark:border-nectar-darkBorder">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-nectar-canvas dark:bg-nectar-darkBg border border-nectar-forest/10 dark:border-nectar-darkBorder mb-3">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
              alt={user?.name || 'User'} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-nectar-emerald/20"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-nectar-forest dark:text-nectar-mint truncate">
                {user?.name || 'Alex Morgan'}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {user?.email || 'alex@nectar.com'}
              </p>
            </div>
            <ShieldCheck className="w-4 h-4 text-nectar-emerald flex-shrink-0" />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
