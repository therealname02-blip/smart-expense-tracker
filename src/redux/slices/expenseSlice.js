import { createSlice } from '@reduxjs/toolkit';
import { localStorageService, INITIAL_EXPENSES } from '../../services/localStorageService';

const initialState = {
  items: localStorageService.getExpenses(),
  budget: localStorageService.getBudget(),
  filters: {
    search: '',
    category: 'All',
    startDate: '',
    endDate: ''
  },
  sort: {
    field: 'date',
    order: 'desc' // 'desc' | 'asc'
  },
  pagination: {
    page: 1,
    pageSize: 8
  }
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.items.unshift(action.payload);
      localStorageService.saveExpenses(state.items);
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorageService.saveExpenses(state.items);
      }
    },
    deleteExpense: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorageService.saveExpenses(state.items);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to page 1 on filter change
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        category: 'All',
        startDate: '',
        endDate: ''
      };
      state.pagination.page = 1;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    updateBudget: (state, action) => {
      state.budget = { ...state.budget, ...action.payload };
      localStorageService.saveBudget(state.budget);
    },
    resetToDemoData: (state) => {
      state.items = [...INITIAL_EXPENSES];
      localStorageService.saveExpenses(state.items);
      state.pagination.page = 1;
    },
    clearAllExpenses: (state) => {
      state.items = [];
      localStorageService.saveExpenses([]);
      state.pagination.page = 1;
    }
  }
});

export const {
  addExpense,
  updateExpense,
  deleteExpense,
  setFilters,
  resetFilters,
  setSort,
  setPage,
  updateBudget,
  resetToDemoData,
  clearAllExpenses
} = expenseSlice.actions;

export default expenseSlice.reducer;
