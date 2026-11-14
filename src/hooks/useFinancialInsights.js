import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../utils/formatters';

export const CATEGORY_COLORS = {
  Housing: '#054F31',
  Groceries: '#0B7443',
  Dining: '#D97706',
  Transport: '#2563EB',
  Subscriptions: '#7C3AED',
  Utilities: '#0284C7',
  Shopping: '#EA580C',
  Wellness: '#10B981',
  Savings: '#047857'
};

export function useFinancialInsights() {
  const { items: expenses, budget } = useSelector((state) => state.expenses);

  return useMemo(() => {
    let totalSpending = 0;
    let needsTotal = 0;
    let wantsTotal = 0;
    let savingsTotal = 0;

    const categoryMap = {};
    const dailyMap = {};

    // Determine current month and days
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - now.getDate());

    // Initialize daily map for days 1 to daysInMonth
    for (let day = 1; day <= daysInMonth; day++) {
      dailyMap[day] = 0;
    }

    expenses.forEach((item) => {
      const amount = parseFloat(item.amount) || 0;
      totalSpending += amount;

      // Group totals
      const type = item.type || 'wants';
      if (type === 'needs') needsTotal += amount;
      else if (type === 'wants') wantsTotal += amount;
      else if (type === 'savings') savingsTotal += amount;

      // Category totals
      const cat = item.category || 'Other';
      categoryMap[cat] = (categoryMap[cat] || 0) + amount;

      // Daily aggregation
      if (item.date) {
        const itemDate = new Date(item.date + 'T00:00:00');
        const day = itemDate.getDate();
        if (day && day >= 1 && day <= daysInMonth) {
          dailyMap[day] += amount;
        }
      }
    });

    // Format for Recharts Pie
    const categoryData = Object.keys(categoryMap).map((cat) => ({
      name: cat,
      value: parseFloat(categoryMap[cat].toFixed(2)),
      color: CATEGORY_COLORS[cat] || '#64748B'
    })).sort((a, b) => b.value - a.value);

    // Format for Recharts Trend
    let cumulative = 0;
    const dailyTrendData = Object.keys(dailyMap).map((day) => {
      cumulative += dailyMap[day];
      return {
        day: `Day ${day}`,
        dayNum: parseInt(day, 10),
        daily: parseFloat(dailyMap[day].toFixed(2)),
        cumulative: parseFloat(cumulative.toFixed(2))
      };
    });

    // Top Category
    const topCategory = categoryData.length > 0 ? categoryData[0] : { name: 'None', value: 0 };

    // Month over Month (simulated comparison with baseline or previous month)
    const baselinePrevMonth = (budget.monthlyLimit || 60000) * 0.92;
    const momChange = baselinePrevMonth > 0 
      ? (((totalSpending - baselinePrevMonth) / baselinePrevMonth) * 100).toFixed(1)
      : '0.0';

    // Budget utilization
    const monthlyLimit = budget.monthlyLimit || 60000;
    const isBudgetExceeded = totalSpending > monthlyLimit;
    const budgetUtilizationPercent = Math.min(100, Math.round((totalSpending / monthlyLimit) * 100));

    // Daily safe spend: remaining wants budget divided by days remaining
    const wantsBudget = (budget.monthlyIncome || 80000) * 0.30;
    const remainingWants = Math.max(0, wantsBudget - wantsTotal);
    const dailySafeSpend = (remainingWants / daysRemaining).toFixed(2);

    // Rule-Based Insights
    const insights = [];

    if (isBudgetExceeded) {
      insights.push({
        id: 'budget-exceeded',
        type: 'danger',
        title: 'Monthly Budget Threshold Exceeded',
        description: `Current spending of ${formatCurrency(totalSpending)} is above your configured limit of ${formatCurrency(monthlyLimit)}.`
      });
    } else if (budgetUtilizationPercent >= 80) {
      insights.push({
        id: 'budget-warning',
        type: 'warning',
        title: 'Budget Alert: 80%+ Consumed',
        description: `You've utilized ${budgetUtilizationPercent}% of your monthly allowance with ${daysRemaining} days left in the month.`
      });
    } else {
      insights.push({
        id: 'budget-healthy',
        type: 'success',
        title: 'Budget Pace is Healthy',
        description: `Spending velocity is currently safe. You have ${formatCurrency(monthlyLimit - totalSpending)} remaining before hitting your monthly cap.`
      });
    }

    if (topCategory.value > 0) {
      const topCatPercent = Math.round((topCategory.value / totalSpending) * 100);
      insights.push({
        id: 'top-category',
        type: 'info',
        title: `Dominant Category: ${topCategory.name}`,
        description: `${topCategory.name} accounts for ${topCatPercent}% (${formatCurrency(topCategory.value)}) of total monthly expenditure.`
      });
    }

    if (savingsTotal > 0) {
      insights.push({
        id: 'savings-insight',
        type: 'success',
        title: 'Compound Wealth Growth',
        description: `You've funneled ${formatCurrency(savingsTotal)} into savings and investments this month.`
      });
    }

    return {
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
      daysRemaining,
      insights
    };
  }, [expenses, budget]);
}
