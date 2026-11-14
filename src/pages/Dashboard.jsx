import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  TrendingUp, 
  Calendar, 
  ShieldAlert, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Send,
  Zap,
  Sparkles
} from 'lucide-react';
import { useFinancialInsights } from '../hooks/useFinancialInsights';
import { addExpense } from '../redux/slices/expenseSlice';
import { formatCurrency, formatPercent } from '../utils/formatters';
import CategoryPieChart from '../components/CategoryPieChart';
import DailyTrendChart from '../components/DailyTrendChart';
import InsightCard from '../components/InsightCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePointerMotion } from '../hooks/usePointerMotion';

export default function Dashboard() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);
  usePointerMotion(pageRef);

  const dispatch = useDispatch();
  const {
    totalSpending,
    needsTotal,
    wantsTotal,
    savingsTotal,
    categoryData,
    dailyTrendData,
    topCategory,
    momChange,
    monthlyLimit,
    isBudgetExceeded,
    budgetUtilizationPercent,
    dailySafeSpend,
    insights
  } = useFinancialInsights();

  const [quickInput, setQuickInput] = useState('');

  // Natural Language Quick Add Handler
  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickInput.trim()) return;

    let text = quickInput.trim();
    let amount = 250.00;
    const amountMatch = text.match(/(?:₹|rs\.?|\$|usd)?\s*(\d+(?:\.\d{1,2})?)/i);
    if (amountMatch) {
      amount = parseFloat(amountMatch[1]);
      text = text.replace(amountMatch[0], '').trim();
    }

    const lower = text.toLowerCase();
    let category = 'Dining';
    let type = 'wants';

    if (lower.includes('grocer') || lower.includes('food') || lower.includes('market') || lower.includes('apple')) {
      category = 'Groceries';
      type = 'needs';
    } else if (lower.includes('rent') || lower.includes('apartment')) {
      category = 'Housing';
      type = 'needs';
    } else if (lower.includes('uber') || lower.includes('transit') || lower.includes('gas') || lower.includes('flight')) {
      category = 'Transport';
      type = 'needs';
    } else if (lower.includes('netflix') || lower.includes('spotify') || lower.includes('sub')) {
      category = 'Subscriptions';
      type = 'wants';
    } else if (lower.includes('bill') || lower.includes('utility') || lower.includes('electric') || lower.includes('wifi')) {
      category = 'Utilities';
      type = 'needs';
    } else if (lower.includes('gym') || lower.includes('health') || lower.includes('doctor')) {
      category = 'Wellness';
      type = 'wants';
    } else if (lower.includes('save') || lower.includes('invest') || lower.includes('stock')) {
      category = 'Savings';
      type = 'savings';
    }

    let title = text.replace(/^for\s+|^at\s+|^on\s+/i, '').trim();
    if (!title) title = `${category} Expense`;
    title = title.charAt(0).toUpperCase() + title.slice(1);

    dispatch(addExpense({
      id: `tx-${Date.now()}`,
      title,
      amount,
      category,
      type,
      paymentMethod: 'Credit Card',
      date: new Date().toISOString().split('T')[0],
      notes: 'Quick AI Parsed'
    }));

    setQuickInput('');
  };

  return (
    <div ref={pageRef} className="space-y-8 animate-fadeIn">
      {/* Hero Welcome & Quick Smart Entry */}
      <div data-reveal data-parallax-area className="bg-gradient-to-r from-nectar-forest via-nectar-emerald to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-nectar-float relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-nectar-mint text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Natural Language Parser</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight mb-2">
            Turn everyday spending into clarity.
          </h2>
          <p className="text-sm text-gray-200 mb-6">
            Type anything into the smart input bar e.g. <span className="text-nectar-mint font-semibold">"₹450 dinner at Social"</span> or <span className="text-nectar-mint font-semibold">"Uber ₹280"</span>.
          </p>

          <form onSubmit={handleQuickAdd} className="flex items-center gap-2 bg-white rounded-full p-1.5 pl-5 shadow-lg max-w-lg text-gray-800">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="e.g. ₹650 electricity, ₹240 lunch..."
              className="w-full text-xs sm:text-sm font-medium bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-nectar-forest hover:bg-nectar-emerald text-white transition-transform active:scale-95"
              title="Quick Add Expense"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Decorative backdrop glow */}
        <div data-parallax="24" className="absolute -right-10 -bottom-10 w-64 h-64 bg-nectar-mint/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div data-reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* KPI 1: Monthly Total Spending */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Total Monthly Spend</span>
            <Calendar className="w-4 h-4 text-nectar-emerald" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-nectar-forest dark:text-nectar-mint mb-2">
            {formatCurrency(totalSpending)}
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`flex items-center font-bold ${Number(momChange) >= 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {Number(momChange) >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {Math.abs(Number(momChange))}% MoM
            </span>
            <span className="text-gray-400">vs benchmark</span>
          </div>
        </div>

        {/* KPI 2: Daily Safe Spend */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Daily Safe-to-Spend</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
            {formatCurrency(dailySafeSpend)}
          </div>
          <p className="text-xs text-gray-400">
            Per day allowance without exceeding target
          </p>
        </div>

        {/* KPI 3: Top Category */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Top Category</span>
            <PieChart className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-nectar-forest dark:text-nectar-mint mb-2 truncate">
            {topCategory.name}
          </div>
          <p className="text-xs text-gray-400">
            {formatCurrency(topCategory.value)} ({totalSpending > 0 ? formatPercent((topCategory.value / totalSpending) * 100) : '0%'} of total)
          </p>
        </div>

        {/* KPI 4: Budget Capacity */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>Budget Utilization</span>
            <ShieldAlert className={`w-4 h-4 ${isBudgetExceeded ? 'text-red-500' : 'text-nectar-emerald'}`} />
          </div>
          <div className={`text-2xl sm:text-3xl font-serif font-bold mb-2 ${isBudgetExceeded ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
            {budgetUtilizationPercent}%
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-nectar-darkBg rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isBudgetExceeded ? 'bg-red-500' : 'bg-nectar-emerald'}`}
              style={{ width: `${Math.min(100, budgetUtilizationPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid: Pie/Donut & Trend Curve */}
      <div data-reveal className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Pie Chart Card */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 sm:p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-nectar-forest dark:text-nectar-mint">
                Category Distribution
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Expenditure breakdown across distinct spending pillars
              </p>
            </div>
          </div>
          <CategoryPieChart data={categoryData} />
        </div>

        {/* Daily Spending Trend Line Card */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 sm:p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold font-serif text-nectar-forest dark:text-nectar-mint">
                Daily Spending Trajectory
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cumulative velocity across current cycle
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-nectar-forest dark:text-nectar-mint bg-nectar-wasabi dark:bg-nectar-forest/20 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>30-Day Curve</span>
            </div>
          </div>
          <DailyTrendChart data={dailyTrendData} />
        </div>
      </div>

      {/* 50/30/20 Rule Progress & Insights Section */}
      <div data-reveal className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 50/30/20 Breakdown (2 cols) */}
        <div className="interactive-card lg:col-span-2 bg-white dark:bg-nectar-darkCard p-6 sm:p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-6">
          <div>
            <h3 className="text-lg font-bold font-serif text-nectar-forest dark:text-nectar-mint">
              50/30/20 Financial Equilibrium
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Nectar guideline for balanced lifestyle and compound growth
            </p>
          </div>

          <div className="space-y-4">
            {/* Needs */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700 dark:text-gray-300">Essential Needs (50% Target)</span>
                <span className="font-mono text-nectar-forest dark:text-nectar-mint">{formatCurrency(needsTotal)}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-nectar-darkBg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-nectar-forest dark:bg-nectar-emerald rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (needsTotal / (monthlyLimit * 0.5)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Wants */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700 dark:text-gray-300">Lifestyle Wants (30% Target)</span>
                <span className="font-mono text-amber-700 dark:text-amber-400">{formatCurrency(wantsTotal)}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-nectar-darkBg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (wantsTotal / (monthlyLimit * 0.3)) * 100)}%` }}
                />
              </div>
            </div>

            {/* Savings */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-gray-700 dark:text-gray-300">Savings & Growth (20% Goal)</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{formatCurrency(savingsTotal)}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-nectar-darkBg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (savingsTotal / (monthlyLimit * 0.2)) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rule-Based Insights (1 col) */}
        <div className="interactive-card bg-white dark:bg-nectar-darkCard p-6 sm:p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-4">
          <div>
            <h3 className="text-lg font-bold font-serif text-nectar-forest dark:text-nectar-mint">
              Smart Advice
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Rule-based real-time insights
            </p>
          </div>

          <div className="space-y-3">
            {insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
