# Nectar &bull; Smart Expense Tracker & Financial Insights Dashboard

A modern full-stack-ready frontend architecture for personal finance tracking and automated 50/30/20 money flow, built with **React + Vite** and styled with the serene aesthetic, typography, and micro-interactions of **Nectar**.

---

## 🚀 Tech Stack

- **React 18 (Vite, ES6+)** — Blazing fast component runtime with Hot Module Replacement (HMR).
- **Redux Toolkit + React Redux** — Predictable, modular state management with typed slices (`authSlice`, `expenseSlice`, `themeSlice`).
- **React Router (v6)** — Declarative client-side routing with route-level code splitting and `React.lazy` / `Suspense`.
- **Tailwind CSS** — Utility-first styling configured with Nectar design tokens (warm peach `#FFFBF7`, deep forest `#054F31`, mint `#D1FADF`, pill buttons, and responsive grid layouts).
- **Recharts** — Interactive, responsive data visualizations (Donut / Pie category chart and daily spending velocity area chart).
- **LocalStorage Persistence** — Zero backend required for immediate demo; mock authentication and transactional data are persisted locally.
- **Lucide Icons** — Clean, minimalist iconography.

---

## ✨ Features

### 1. Mock Authentication & Session Persistence
- Login & Registration flows with persistent session in browser `localStorage`.
- One-click "Use Demo Credentials" button for instant testing.
- Protected route layout with user avatar and session status.

### 2. Executive Financial Insights Dashboard
- **Monthly Total Spending** metric with calculated Month-over-Month (MoM) delta.
- **Daily Safe-to-Spend limit** dynamically calculated from remaining discretionary budget and days left in the month.
- **Category-wise Donut Chart (Recharts)** with interactive hover tooltips and center total readout.
- **Daily Trend Area Chart (Recharts)** showing cumulative spending velocity across the 30-day billing cycle.
- **50/30/20 Financial Equilibrium** progress bars tracking Essential Needs (50%), Lifestyle Wants (30%), and Savings/Growth (20%).
- **Rule-Based Smart Insights** highlighting top expense categories, budget threshold warnings, and wealth accumulation progress.
- **Natural Language Quick Entry** bar in the dashboard header (e.g. `"$45 dinner at Nobu"`, `"$18.99 Netflix"`).

### 3. Expense Management (Full CRUD)
- **Add, Edit, and Delete** expenses with validation.
- Support for Title, Amount, Category (9 distinct groups), 50/30/20 Group, Date, Payment Method, and Notes.
- Modal drawer with smooth entrance animations.

### 4. Search, Filtering, and Sorting
- **Debounced search** across titles, notes, and payment methods.
- **Category filter chips** for instant single-category isolation.
- **Date range filter** (start date and end date).
- **Multi-criteria sorting**: Sort by Date (newest/oldest) and Amount (high/low).
- **Pagination** controls for handling large transaction volumes.

### 5. Budget Settings & Alerts
- Monthly Spending Ceiling configuration with automatic real-time exceeded alert status.
- Monthly Take-Home Income adjustment for 50/30/20 goal recalibration.
- Category-level budget limit settings.

### 6. UI/UX & Dark Mode
- Collapsible sidebar navigation for desktop and mobile drawer.
- Floating top navigation bar with user profile.
- Dark mode toggle with persistent theme selection.
- Pill buttons with smooth active scale effects.

### 7. Data Export (CSV)
- Export all filtered transactions into a `.csv` file with a single click.

---

## 📁 Project Structure

```
w3/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── CategoryPieChart.jsx
    │   ├── DailyTrendChart.jsx
    │   ├── ExpenseModal.jsx
    │   ├── InsightCard.jsx
    │   ├── Navbar.jsx
    │   ├── Pagination.jsx
    │   └── Sidebar.jsx
    ├── hooks/
    │   ├── useDebounce.js
    │   └── useFinancialInsights.js
    ├── pages/
    │   ├── BudgetSettings.jsx
    │   ├── Dashboard.jsx
    │   ├── Expenses.jsx
    │   ├── Login.jsx
    │   └── Signup.jsx
    ├── redux/
    │   ├── store.js
    │   └── slices/
    │       ├── authSlice.js
    │       ├── expenseSlice.js
    │       └── themeSlice.js
    ├── services/
    │   └── localStorageService.js
    └── utils/
        ├── csvExport.js
        └── formatters.js
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📝 Notes
- All data is persisted in browser `localStorage` (no external database or server required).
- The state management and service layer (`localStorageService.js`) are modular and ready to swap for a real REST or GraphQL API backend.
