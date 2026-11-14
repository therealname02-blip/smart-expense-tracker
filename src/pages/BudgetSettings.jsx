import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sliders, Save, AlertTriangle, CheckCircle2, ShieldCheck, IndianRupee } from 'lucide-react';
import { updateBudget } from '../redux/slices/expenseSlice';
import { formatCurrency } from '../utils/formatters';
import { useFinancialInsights } from '../hooks/useFinancialInsights';

export default function BudgetSettings() {
  const dispatch = useDispatch();
  const { budget } = useSelector((state) => state.expenses);
  const { totalSpending, isBudgetExceeded, budgetUtilizationPercent } = useFinancialInsights();

  const [monthlyLimit, setMonthlyLimit] = useState(budget.monthlyLimit || 60000);
  const [monthlyIncome, setMonthlyIncome] = useState(budget.monthlyIncome || 80000);
  const [categoryLimits, setCategoryLimits] = useState({ ...budget.categoryLimits });
  const [saveMessage, setSaveMessage] = useState('');

  const handleCategoryLimitChange = (cat, val) => {
    setCategoryLimits(prev => ({
      ...prev,
      [cat]: parseFloat(val) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBudget({
      monthlyLimit: parseFloat(monthlyLimit) || 0,
      monthlyIncome: parseFloat(monthlyIncome) || 0,
      categoryLimits
    }));
    setSaveMessage('Budget settings successfully saved!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-serif font-bold text-nectar-forest dark:text-nectar-mint">
          Budget Settings & Thresholds
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Configure spending ceilings and threshold alerts to protect your savings.
        </p>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-2xl bg-nectar-wasabi dark:bg-emerald-950/30 border border-nectar-mint dark:border-emerald-800 text-nectar-forest dark:text-nectar-mint text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-nectar-emerald" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Live Threshold Status Banner */}
      <div className={`p-6 rounded-3xl border ${
        isBudgetExceeded 
          ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40 text-red-900 dark:text-red-200' 
          : 'bg-white dark:bg-nectar-darkCard border-nectar-forest/10 dark:border-nectar-darkBorder'
      } shadow-nectar flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            isBudgetExceeded ? 'bg-red-100 text-red-600' : 'bg-nectar-wasabi text-nectar-forest'
          }`}>
            {isBudgetExceeded ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="font-bold text-sm">
              {isBudgetExceeded ? 'Budget Exceeded Warning' : 'Budget Health Status: Normal'}
            </h4>
            <p className="text-xs opacity-80 mt-0.5">
              Current total spend: <span className="font-bold font-mono">{formatCurrency(totalSpending)}</span> of <span className="font-bold font-mono">{formatCurrency(monthlyLimit)}</span> limit ({budgetUtilizationPercent}% utilized).
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monthly Limits Grid */}
        <div className="bg-white dark:bg-nectar-darkCard p-6 sm:p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-6">
          <div className="flex items-center gap-2 text-nectar-forest dark:text-nectar-mint font-bold text-sm">
            <Sliders className="w-4 h-4" />
            <span>Macro Financial Ceilings</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                Monthly Spending Ceiling (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="500"
                  min="1000"
                  value={monthlyLimit}
                  onChange={(e) => setMonthlyLimit(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Triggers an alert when total month-to-date expenses exceed this value.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
                Monthly Take-Home Income (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="500"
                  min="1000"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                  required
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Used to calculate your 50% Needs, 30% Wants, and 20% Growth targets.</p>
            </div>
          </div>
        </div>

        {/* Category Budget Caps */}
        <div className="bg-white dark:bg-nectar-darkCard p-6 sm:p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-nectar-forest dark:text-nectar-mint">
              Category Spending Caps
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Set targeted budgets for individual spending categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.keys(categoryLimits).map((cat) => (
              <div key={cat} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-nectar-darkBg border border-gray-100 dark:border-nectar-darkBorder">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {cat}
                </label>
                <div className="relative">
                  <span className="text-xs text-gray-400 absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                  <input
                    type="number"
                    step="100"
                    min="0"
                    value={categoryLimits[cat]}
                    onChange={(e) => handleCategoryLimitChange(cat, e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-nectar-darkBorder bg-white dark:bg-nectar-darkCard text-xs font-semibold font-mono focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="btn-nectar btn-nectar-primary"
            >
              <Save className="w-4 h-4" />
              <span>Save Budget Configurations</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
