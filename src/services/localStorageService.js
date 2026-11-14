/**
 * LocalStorage Service: Mock Backend & Persistent Data Layer
 */

const STORAGE_KEYS = {
  AUTH_USER: 'nectar_auth_user',
  REGISTERED_USERS: 'nectar_users',
  EXPENSES: 'nectar_inr_expenses',
  BUDGET: 'nectar_inr_budget',
  THEME: 'nectar_theme'
};

export const INITIAL_EXPENSES = [
  {
    id: 'tx-1',
    title: 'Nature\'s Basket Supermarket',
    amount: 3850.00,
    category: 'Groceries',
    type: 'needs',
    paymentMethod: 'UPI / GPay',
    date: '2026-11-12',
    notes: 'Organic pantry staples & fresh produce'
  },
  {
    id: 'tx-2',
    title: 'Blue Tokai Coffee',
    amount: 280.00,
    category: 'Dining',
    type: 'wants',
    paymentMethod: 'UPI',
    date: '2026-11-13',
    notes: 'Morning oat cortado'
  },
  {
    id: 'tx-3',
    title: 'Cult.fit Gym & Wellness',
    amount: 2500.00,
    category: 'Wellness',
    type: 'wants',
    paymentMethod: 'Auto-Debit',
    date: '2026-11-01',
    notes: 'Monthly fitness pass'
  },
  {
    id: 'tx-4',
    title: 'Apartment Monthly Rent',
    amount: 28000.00,
    category: 'Housing',
    type: 'needs',
    paymentMethod: 'Net Banking',
    date: '2026-11-01',
    notes: 'November rent transfer'
  },
  {
    id: 'tx-5',
    title: 'Metro & Uber Commutes',
    amount: 650.00,
    category: 'Transport',
    type: 'needs',
    paymentMethod: 'UPI / GPay',
    date: '2026-11-08',
    notes: 'Weekly transit recharge'
  },
  {
    id: 'tx-6',
    title: 'Dinner at Social Bistro',
    amount: 2400.00,
    category: 'Dining',
    type: 'wants',
    paymentMethod: 'Credit Card',
    date: '2026-11-09',
    notes: 'Celebration dinner with team'
  },
  {
    id: 'tx-7',
    title: 'Netflix & Spotify Premium',
    amount: 649.00,
    category: 'Subscriptions',
    type: 'wants',
    paymentMethod: 'Credit Card',
    date: '2026-11-05',
    notes: 'Streaming entertainment'
  },
  {
    id: 'tx-8',
    title: 'Electricity & Gas Utility',
    amount: 2250.00,
    category: 'Utilities',
    type: 'needs',
    paymentMethod: 'Auto-Debit',
    date: '2026-11-04',
    notes: 'Monthly power & gas bill'
  },
  {
    id: 'tx-9',
    title: 'Apple iCloud & Care',
    amount: 219.00,
    category: 'Subscriptions',
    type: 'needs',
    paymentMethod: 'Apple Pay',
    date: '2026-11-03',
    notes: 'Cloud backup storage'
  },
  {
    id: 'tx-10',
    title: 'Zara / Uniqlo Autumn Apparel',
    amount: 3490.00,
    category: 'Shopping',
    type: 'wants',
    paymentMethod: 'Credit Card',
    date: '2026-11-07',
    notes: 'Workwear wardrobe'
  },
  {
    id: 'tx-11',
    title: 'Blinkit Quick Groceries',
    amount: 1450.00,
    category: 'Groceries',
    type: 'needs',
    paymentMethod: 'UPI / GPay',
    date: '2026-11-06',
    notes: 'Produce and weekly snacks'
  },
  {
    id: 'tx-12',
    title: 'High-Yield Mutual Fund / SIP',
    amount: 10000.00,
    category: 'Savings',
    type: 'savings',
    paymentMethod: 'Auto-Debit',
    date: '2026-11-01',
    notes: 'Automated wealth compound deposit'
  }
];

export const DEFAULT_BUDGET = {
  monthlyLimit: 60000,
  monthlyIncome: 80000,
  categoryLimits: {
    Housing: 30000,
    Groceries: 12000,
    Dining: 8000,
    Transport: 5000,
    Subscriptions: 2000,
    Utilities: 4000,
    Shopping: 6000,
    Wellness: 4000,
    Savings: 15000
  }
};

export const localStorageService = {
  // Auth
  getAuthUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return user ? JSON.parse(user) : {
        id: 'usr_demo',
        name: 'Alex Morgan',
        email: 'alex@nectar.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };
    } catch {
      return null;
    }
  },

  setAuthUser(user) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  },

  getRegisteredUsers() {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return users ? JSON.parse(users) : [];
    } catch {
      return [];
    }
  },

  saveUser(newUser) {
    const users = this.getRegisteredUsers();
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  },

  // Expenses
  getExpenses() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    this.saveExpenses(INITIAL_EXPENSES);
    return INITIAL_EXPENSES;
  },

  saveExpenses(expenses) {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  },

  // Budget
  getBudget() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUDGET);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    this.saveBudget(DEFAULT_BUDGET);
    return DEFAULT_BUDGET;
  },

  saveBudget(budget) {
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budget));
  },

  // Theme
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  saveTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};
