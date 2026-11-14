import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Sun, Moon, Plus, Sparkles } from 'lucide-react';
import { toggleTheme } from '../redux/slices/themeSlice';

export default function Navbar({ onOpenSidebar, onOpenAddModal }) {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 h-20 bg-nectar-canvas/80 dark:bg-nectar-darkBg/80 backdrop-blur-md border-b border-nectar-forest/10 dark:border-nectar-darkBorder flex items-center justify-between px-6 lg:px-10 transition-colors">
      <div className="flex items-center gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-nectar-darkCard"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg lg:text-xl font-bold font-serif text-nectar-forest dark:text-nectar-mint">
              Welcome, {user?.name?.split(' ')[0] || 'Member'}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-nectar-mint text-nectar-forest dark:bg-nectar-emerald/20 dark:text-nectar-mint">
              <Sparkles className="w-3 h-3" />
              Automated 50/30/20
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
            Your finances organized into peace of mind.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2.5 rounded-full bg-white dark:bg-nectar-darkCard border border-nectar-forest/10 dark:border-nectar-darkBorder text-gray-700 dark:text-gray-300 hover:text-nectar-forest dark:hover:text-nectar-mint transition-all shadow-sm active:scale-95"
          title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle dark mode"
        >
          {mode === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-nectar-forest" />
          )}
        </button>

        {/* Add Expense Primary Pill Button */}
        <button
          onClick={onOpenAddModal}
          className="btn-nectar btn-nectar-primary shadow-nectar hover:shadow-nectar-float"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Expense</span>
        </button>
      </div>
    </header>
  );
}
