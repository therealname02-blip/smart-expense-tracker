import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Trash2, 
  Edit3, 
  Plus, 
  RotateCcw,
  SlidersHorizontal 
} from 'lucide-react';
import { 
  setFilters, 
  resetFilters, 
  setSort, 
  setPage, 
  deleteExpense, 
  resetToDemoData 
} from '../redux/slices/expenseSlice';
import { useDebounce } from '../hooks/useDebounce';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportExpensesToCSV } from '../utils/csvExport';
import Pagination from '../components/Pagination';
import ExpenseModal from '../components/ExpenseModal';

const CATEGORIES = ['All', 'Housing', 'Groceries', 'Dining', 'Transport', 'Subscriptions', 'Utilities', 'Shopping', 'Wellness', 'Savings'];

export default function Expenses() {
  const dispatch = useDispatch();
  const { items, filters, sort, pagination } = useSelector((state) => state.expenses);

  const [searchTerm, setSearchTerm] = useState(filters.search);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Sync debounced search to Redux
  React.useEffect(() => {
    dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  // Filtering and Sorting Memoization
  const filteredAndSortedExpenses = useMemo(() => {
    let result = [...items];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(item => 
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.notes && item.notes.toLowerCase().includes(q)) ||
        (item.paymentMethod && item.paymentMethod.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      result = result.filter(item => item.category === filters.category);
    }

    // Date range filter
    if (filters.startDate) {
      result = result.filter(item => item.date >= filters.startDate);
    }
    if (filters.endDate) {
      result = result.filter(item => item.date <= filters.endDate);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sort.field === 'date') {
        comparison = new Date(b.date || 0) - new Date(a.date || 0);
      } else if (sort.field === 'amount') {
        comparison = parseFloat(b.amount) - parseFloat(a.amount);
      } else if (sort.field === 'title') {
        comparison = (a.title || '').localeCompare(b.title || '');
      }
      return sort.order === 'asc' ? -comparison : comparison;
    });

    return result;
  }, [items, filters, sort]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSortedExpenses.length / pagination.pageSize);
  const paginatedExpenses = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredAndSortedExpenses.slice(start, start + pagination.pageSize);
  }, [filteredAndSortedExpenses, pagination.page, pagination.pageSize]);

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      dispatch(deleteExpense(id));
    }
  };

  const handleExport = () => {
    exportExpensesToCSV(filteredAndSortedExpenses, `nectar_expenses_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-nectar-forest dark:text-nectar-mint">
            Expense Ledger
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {filteredAndSortedExpenses.length} matching transaction{filteredAndSortedExpenses.length === 1 ? '' : 's'} found
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExport}
            className="btn-nectar btn-nectar-secondary text-xs"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Reset transactions to the Nectar initial demo data?')) {
                dispatch(resetToDemoData());
              }
            }}
            className="p-2.5 rounded-full border border-gray-200 dark:border-nectar-darkBorder bg-white dark:bg-nectar-darkCard text-gray-600 dark:text-gray-400 hover:text-nectar-forest dark:hover:text-nectar-mint"
            title="Reset Demo Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setExpenseToEdit(null);
              setIsModalOpen(true);
            }}
            className="btn-nectar btn-nectar-primary text-xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-nectar-darkCard p-4 sm:p-5 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Debounced Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search expenses by title, notes, method..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-gray-50 dark:bg-nectar-darkBg border border-gray-200 dark:border-nectar-darkBorder focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
            />
          </div>

          {/* Date Range Start */}
          <div className="md:col-span-3">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => dispatch(setFilters({ startDate: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-nectar-darkBg border border-gray-200 dark:border-nectar-darkBorder focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
              title="Start Date"
            />
          </div>

          {/* Date Range End */}
          <div className="md:col-span-3">
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => dispatch(setFilters({ endDate: e.target.value }))}
              className="w-full px-3 py-2 rounded-xl text-xs bg-gray-50 dark:bg-nectar-darkBg border border-gray-200 dark:border-nectar-darkBorder focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
              title="End Date"
            />
          </div>

          {/* Clear Filters */}
          <div className="md:col-span-1 flex justify-end">
            <button
              onClick={() => {
                setSearchTerm('');
                dispatch(resetFilters());
              }}
              className="p-2 text-xs text-gray-500 hover:text-nectar-forest dark:hover:text-nectar-mint"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setFilters({ category: cat }))}
              className={`
                px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                ${filters.category === cat 
                  ? 'bg-nectar-forest text-white dark:bg-nectar-mint dark:text-nectar-forest shadow-sm' 
                  : 'bg-gray-100 dark:bg-nectar-darkBg text-gray-600 dark:text-gray-400 hover:bg-gray-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table Card */}
      <div className="bg-white dark:bg-nectar-darkCard rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-nectar-darkBg/60 text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold border-b border-gray-100 dark:border-nectar-darkBorder">
              <tr>
                <th className="py-3.5 px-4">Title / Note</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Group</th>
                <th className="py-3.5 px-4 cursor-pointer select-none" onClick={() => {
                  const newOrder = sort.field === 'date' && sort.order === 'desc' ? 'asc' : 'desc';
                  dispatch(setSort({ field: 'date', order: newOrder }));
                }}>
                  <div className="flex items-center gap-1">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 cursor-pointer select-none text-right" onClick={() => {
                  const newOrder = sort.field === 'amount' && sort.order === 'desc' ? 'asc' : 'desc';
                  dispatch(setSort({ field: 'amount', order: newOrder }));
                }}>
                  <div className="flex items-center justify-end gap-1">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-nectar-darkBorder">
              {paginatedExpenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    <p className="text-sm font-medium">No expenses matching criteria</p>
                    <p className="text-xs mt-1">Try resetting search or adjusting filters.</p>
                  </td>
                </tr>
              ) : (
                paginatedExpenses.map((expense) => (
                  <tr 
                    key={expense.id}
                    className="hover:bg-nectar-wasabi/40 dark:hover:bg-nectar-darkBg/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900 dark:text-gray-100">
                        {expense.title}
                      </div>
                      {expense.notes && (
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-xs">
                          {expense.notes}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 dark:bg-nectar-darkBg text-gray-700 dark:text-gray-300">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 capitalize">
                      <span className={`
                        text-[11px] font-semibold
                        ${expense.type === 'needs' ? 'text-nectar-forest dark:text-nectar-mint' : ''}
                        ${expense.type === 'wants' ? 'text-amber-600 dark:text-amber-400' : ''}
                        ${expense.type === 'savings' ? 'text-emerald-600 dark:text-emerald-400' : ''}
                      `}>
                        {expense.type || 'wants'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatDate(expense.date)}
                    </td>
                    <td className="py-3 px-4 text-right font-serif font-bold text-sm text-gray-900 dark:text-gray-100">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-nectar-forest dark:hover:text-nectar-mint hover:bg-gray-100 dark:hover:bg-nectar-darkBg"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id, expense.title)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) => dispatch(setPage(page))}
        />
      </div>

      {/* Modal Drawer */}
      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        expenseToEdit={expenseToEdit}
      />
    </div>
  );
}
