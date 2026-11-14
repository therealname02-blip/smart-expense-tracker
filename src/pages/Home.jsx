import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Leaf, 
  ArrowRight, 
  Check, 
  Sparkles, 
  TrendingUp, 
  PieChart, 
  Zap, 
  Lock, 
  Sun, 
  Moon,
  LayoutDashboard
} from 'lucide-react';
import { toggleTheme } from '../redux/slices/themeSlice';
import { formatCurrency } from '../utils/formatters';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePointerMotion } from '../hooks/usePointerMotion';
import { useCursorWords } from '../hooks/useCursorWords';

export default function Home() {
  const pageRef = useRef(null);
  const headlineRef = useRef(null);
  useScrollReveal(pageRef);
  usePointerMotion(pageRef);
  useCursorWords(headlineRef);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Simulator State in Hero/Landing
  const [income, setIncome] = useState(80000);
  const [activeTab, setActiveTab] = useState(0);
  const [startingJourney, setStartingJourney] = useState(false);
  const startTimeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(startTimeoutRef.current), []);

  const handleGetStarted = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (startingJourney) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate('/signup');
      return;
    }

    setStartingJourney(true);
    startTimeoutRef.current = setTimeout(() => navigate('/signup'), 850);
  };

  const needs = income * 0.50;
  const wants = income * 0.30;
  const savings = income * 0.20;
  const incomePresets = [40000, 80000, 120000];

  const flowTabs = [
    {
      title: 'Automated 50/30/20 Balance',
      desc: 'Automatically allocate every rupee to Needs, Wants, and Wealth reserves.',
      preview: {
        tag: 'Balanced Pace',
        amount: formatCurrency(income * 0.68).split('.')[0],
        sub: `Spent so far out of ${formatCurrency(income).split('.')[0]} income`,
        barPct: 68,
        details: [
          { label: 'Essential Needs (50%)', val: formatCurrency(needs).split('.')[0] },
          { label: 'Lifestyle Wants (30%)', val: formatCurrency(wants).split('.')[0] },
          { label: 'High-Yield Growth (20%)', val: `+${formatCurrency(savings).split('.')[0]}`, highlight: true }
        ]
      }
    },
    {
      title: 'Daily Safe-to-Spend Velocity',
      desc: 'Never wonder if you can afford dinner tonight. Real-time daily safe limits.',
      preview: {
        tag: 'Dynamic Allowance',
        amount: `₹${(wants / 30).toFixed(0)}/day`,
        sub: 'Guilt-free daily allowance for discretionary living',
        barPct: 45,
        details: [
          { label: 'Days Remaining in Cycle', val: '18 Days' },
          { label: 'Discretionary Remaining', val: formatCurrency(wants * 0.6).split('.')[0] },
          { label: 'Month-End Projected Surplus', val: `+${formatCurrency(savings * 1.1).split('.')[0]}`, highlight: true }
        ]
      }
    },
    {
      title: 'Recurring Subscriptions Audit',
      desc: 'Spot creep in subscriptions and reclaim up to ₹4,500/month automatically.',
      preview: {
        tag: '3 Active Subscriptions',
        amount: '₹4,500/mo',
        sub: 'Identified recurring streaming and gym charges',
        barPct: 82,
        details: [
          { label: 'Cult.fit & Wellness', val: '₹2,500.00' },
          { label: 'Netflix & Spotify', val: '₹649.00' },
          { label: 'Annual Reclaim Potential', val: '+₹45,000/yr', highlight: true }
        ]
      }
    },
    {
      title: 'High-Yield Wealth Accelerator',
      desc: 'Channel leftover budget margins into automated 7.10% compound wealth reserves.',
      preview: {
        tag: '7.10% Wealth Growth',
        amount: `+${formatCurrency(savings).split('.')[0]}/mo`,
        sub: 'Compounding cash reserve goal for 2026',
        barPct: 76,
        details: [
          { label: 'Emergency Fund Goal', val: '₹5,00,000' },
          { label: 'Accrued to Date', val: '₹3,80,000' },
          { label: 'Time to Target', val: '2.5 Months', highlight: true }
        ]
      }
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-nectar-canvas dark:bg-nectar-darkBg text-gray-900 dark:text-gray-100 transition-colors">
      
      {/* ==========================================================================
           FLOATING PILL NAVIGATION (Nectar Design)
           ========================================================================== */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header className="pointer-events-auto w-full max-w-5xl bg-white/80 dark:bg-nectar-darkCard/80 backdrop-blur-xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar-float rounded-full px-5 py-3 flex items-center justify-between transition-all">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nectar-emerald to-nectar-forest flex items-center justify-center text-white shadow-sm">
              <Leaf className="w-4 h-4 text-nectar-mint" />
            </div>
            <span className="font-bold text-nectar-forest dark:text-nectar-mint tracking-tight text-base">
              Nectar
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-nectar-mint text-nectar-forest dark:bg-nectar-emerald/20 dark:text-nectar-mint">
              Smart Finance
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-600 dark:text-gray-300">
            <a href="#features" className="hover:text-nectar-forest dark:hover:text-nectar-mint transition-colors">Features</a>
            <a href="#flow" className="hover:text-nectar-forest dark:hover:text-nectar-mint transition-colors">Money Flow</a>
            <a href="#simulator" className="hover:text-nectar-forest dark:hover:text-nectar-mint transition-colors">Simulator</a>
            <a href="#integrity" className="hover:text-nectar-forest dark:hover:text-nectar-mint transition-colors">Privacy</a>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-nectar-darkBg transition-colors"
              title="Toggle theme"
            >
              {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-nectar-forest" />}
            </button>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn-nectar btn-nectar-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-nectar-forest dark:hover:text-nectar-mint transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="btn-nectar btn-nectar-primary text-xs py-2 px-4 shadow-sm"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            )}
          </div>
        </header>
      </div>

      {/* ==========================================================================
           HERO SECTION
           ========================================================================== */}
      <section data-reveal data-parallax-area className="pt-36 pb-20 px-6 sm:px-10 max-w-6xl mx-auto text-center relative overflow-hidden">
        <div className="hero-orb hero-orb-primary" data-parallax="28" />
        <div className="hero-orb hero-orb-secondary" data-parallax="-18" />
        <div className="hero-float-shape hero-float-coin" data-parallax="34" aria-hidden="true">
          <span>₹</span>
        </div>
        <div className="hero-float-shape hero-float-spark" data-parallax="-26" aria-hidden="true">
          <span>✦</span>
        </div>
        <div className="hero-float-shape hero-float-orbit" data-parallax="18" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nectar-peach dark:bg-nectar-darkCard border border-nectar-peachDeep/10 dark:border-nectar-darkBorder text-nectar-peachDeep dark:text-nectar-mint text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-nectar-forest dark:bg-nectar-mint animate-pulse" />
            <span>Smart Personal Finance Architecture</span>
          </div>

          <h1
            ref={headlineRef}
            aria-label="Turn every dollar into peace of mind."
            className="cursor-reactive-headline text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-nectar-forest dark:text-nectar-mint tracking-tight leading-[1.08]"
          >
            <span className="headline-line" aria-hidden="true">
              {['Turn', 'every', 'dollar', 'into'].map((word) => (
                <span key={word} data-cursor-word className="headline-word">{word}</span>
              ))}
            </span>
            <span className="headline-line italic font-normal text-nectar-emerald dark:text-emerald-400" aria-hidden="true">
              {['peace', 'of', 'mind.'].map((word) => (
                <span key={word} data-cursor-word className="headline-word">{word}</span>
              ))}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A modern financial insights system that automatically organizes every paycheck into a balanced 50/30/20 money flow. Know exactly what to spend, save, and grow without the stress.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              onClick={handleGetStarted}
              aria-disabled={startingJourney}
              className="btn-nectar btn-nectar-primary text-base py-3.5 px-8 shadow-nectar hover:shadow-nectar-float w-full sm:w-auto"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login"
              className="btn-nectar btn-nectar-secondary text-base py-3.5 px-8 w-full sm:w-auto"
            >
              <span>Explore Demo Dashboard</span>
            </Link>
          </div>
        </div>

        <div data-reveal className="hero-product-preview relative z-10 mx-auto mt-16 max-w-5xl text-left">
          <div className="hero-preview-frame interactive-card overflow-hidden rounded-[2rem] border border-nectar-forest/10 dark:border-nectar-darkBorder">
            <div className="hero-preview-chrome flex items-center justify-between border-b border-nectar-forest/10 dark:border-nectar-darkBorder px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="hero-window-dot bg-rose-300" />
                <span className="hero-window-dot bg-amber-300" />
                <span className="hero-window-dot bg-emerald-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                Nectar · Your money dashboard
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-nectar-emerald dark:text-nectar-mint">
                <span className="h-1.5 w-1.5 rounded-full bg-nectar-leaf" />
                Live preview
              </span>
            </div>

            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-nectar-emerald dark:text-nectar-mint">
                  A calmer way to spend
                </p>
                <h2 className="mt-3 max-w-md font-serif text-3xl font-medium leading-tight tracking-tight text-nectar-forest dark:text-nectar-mint sm:text-4xl">
                  {user?.name ? `${user.name.split(' ')[0]}'s money, in balance.` : 'Your money, in balance.'}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  A clear plan for every rupee, shaped around your monthly take-home.
                </p>

                <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Monthly income</p>
                    <p key={income} className="mt-1 font-serif text-2xl font-bold text-nectar-forest dark:text-white value-change">
                      {formatCurrency(income).split('.')[0]}
                    </p>
                  </div>
                  <a href="#simulator" className="hero-preview-link">
                    Tune your plan <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="hero-preview-allocation rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-nectar-forest dark:text-nectar-mint">Your monthly plan</p>
                    <p className="mt-0.5 text-[11px] text-gray-400">Balanced around the 50 / 30 / 20 rule</p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-nectar-emerald dark:text-nectar-mint" />
                </div>

                <div className="flex flex-col items-center gap-6 sm:flex-row">
                  <div
                    className="hero-preview-ring shrink-0"
                    role="img"
                    aria-label={`Income allocated: 50 percent needs, 30 percent wants, 20 percent savings`}
                  >
                    <div className="hero-preview-ring-center">
                      <strong>100%</strong>
                      <span>planned</span>
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    {[
                      { label: 'Essentials', value: needs, percent: 50, color: 'needs' },
                      { label: 'Lifestyle', value: wants, percent: 30, color: 'wants' },
                      { label: 'Savings', value: savings, percent: 20, color: 'savings' }
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                          <span className="flex items-center gap-2 font-semibold text-gray-600 dark:text-gray-300">
                            <span className={`hero-allocation-dot hero-allocation-${item.color}`} />
                            {item.label}
                          </span>
                          <span className="font-mono font-bold text-nectar-forest dark:text-nectar-mint">
                            {formatCurrency(item.value).split('.')[0]}
                            <span className="ml-1.5 text-[10px] font-medium text-gray-400">{item.percent}%</span>
                          </span>
                        </div>
                        <div className="hero-allocation-track">
                          <span className={`hero-allocation-fill hero-allocation-${item.color}`} style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           MONEYFLOW INTERACTIVE SHOWCASE (Nectar Signature Split)
           ========================================================================== */}
      <section id="flow" data-reveal className="py-20 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-nectar-forest dark:text-nectar-mint">
            The MoneyFlow Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-nectar-forest dark:text-nectar-mint mt-2 mb-3">
            We don't just log spending.<br />We make progress stick.
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Click through our automated systems below to see real-time financial equilibrium.
          </p>
        </div>

        <div className="interactive-card bg-white dark:bg-nectar-darkCard rounded-3xl p-6 sm:p-12 border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Tabs */}
          <div className="lg:col-span-6 space-y-3">
            {flowTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`
                  w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4
                  ${activeTab === idx
                    ? 'bg-nectar-wasabi dark:bg-nectar-forest/30 border-nectar-forest dark:border-nectar-mint shadow-sm'
                    : 'bg-gray-50 dark:bg-nectar-darkBg border-transparent hover:border-gray-200'}
                `}
              >
                <div>
                  <h3 className={`text-base font-bold mb-1 ${activeTab === idx ? 'text-nectar-forest dark:text-nectar-mint' : 'text-gray-800 dark:text-gray-200'}`}>
                    {tab.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {tab.desc}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                  activeTab === idx ? 'bg-nectar-forest text-white scale-100' : 'opacity-0 scale-50'
                }`}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </button>
            ))}
          </div>

          {/* Right Live Device Simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div key={activeTab} className="w-full max-w-sm bg-nectar-canvas dark:bg-nectar-darkBg rounded-3xl p-6 border border-nectar-forest/15 dark:border-nectar-darkBorder shadow-nectar-float space-y-5 animate-fadeIn">
              <div className="w-20 h-3.5 rounded-full bg-gray-200 dark:bg-nectar-darkCard mx-auto" />

              <div className="bg-white dark:bg-nectar-darkCard rounded-2xl p-5 border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Active System
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-nectar-mint text-nectar-forest">
                    {flowTabs[activeTab].preview.tag}
                  </span>
                </div>

                <div key={activeTab} className="text-3xl font-serif font-bold text-nectar-forest dark:text-nectar-mint value-change">
                  {flowTabs[activeTab].preview.amount}
                </div>
                <p className="text-xs text-gray-500">
                  {flowTabs[activeTab].preview.sub}
                </p>

                <div className="w-full h-2 bg-gray-100 dark:bg-nectar-darkBg rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-nectar-emerald rounded-full transition-all duration-500"
                    style={{ width: `${flowTabs[activeTab].preview.barPct}%` }}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-nectar-darkCard rounded-2xl p-4 border border-nectar-forest/10 dark:border-nectar-darkBorder space-y-2.5">
                {flowTabs[activeTab].preview.details.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className={`font-bold ${item.highlight ? 'text-nectar-emerald font-mono' : 'text-gray-800 dark:text-gray-200'}`}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           50/30/20 INTERACTIVE INCOME SIMULATOR
           ========================================================================== */}
      <section id="simulator" data-reveal className="py-20 px-6 sm:px-10 max-w-5xl mx-auto">
        <div className="interactive-card bg-white dark:bg-nectar-darkCard rounded-3xl p-8 sm:p-12 border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-nectar-forest dark:text-nectar-mint">
              Personalized Calculator
            </span>
            <h2 className="text-3xl font-serif font-bold text-nectar-forest dark:text-nectar-mint mt-2 mb-2">
              50/30/20 Take-Home Simulator
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Slide your monthly net income to see how your money naturally balances.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-nectar-canvas dark:bg-nectar-darkBg border border-nectar-forest/10 dark:border-nectar-darkBorder space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Monthly Net Income
              </span>
              <span key={income} className="text-3xl font-serif font-bold text-nectar-forest dark:text-nectar-mint value-change">
                {formatCurrency(income).split('.')[0]}
              </span>
            </div>

            <input
              type="range"
              min="20000"
              max="300000"
              step="2000"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value))}
              className="w-full accent-nectar-forest cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-gray-400">
              <span>₹20,000 / mo</span>
              <span>₹1,50,000 / mo</span>
              <span>₹3,00,000+ / mo</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="mr-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">Quick set:</span>
              {incomePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={income === preset}
                  onClick={() => setIncome(preset)}
                  className={`income-preset-chip ${income === preset ? 'is-selected' : ''}`}
                >
                  {formatCurrency(preset).split('.')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-nectar-darkBg border border-gray-100 dark:border-nectar-darkBorder">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                50% Needs Cap
              </span>
              <div key={needs} className="text-2xl font-serif font-bold text-nectar-forest dark:text-nectar-mint my-1.5 value-change">
                {formatCurrency(needs).split('.')[0]}
              </div>
              <p className="text-[11px] text-gray-500">Rent, groceries, utilities, basic transit, healthcare</p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-nectar-darkBg border border-gray-100 dark:border-nectar-darkBorder">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                30% Wants Cap
              </span>
              <div key={wants} className="text-2xl font-serif font-bold text-amber-700 dark:text-amber-400 my-1.5 value-change">
                {formatCurrency(wants).split('.')[0]}
              </div>
              <p className="text-[11px] text-gray-500">Dining, weekend travel, hobbies, entertainment</p>
            </div>

            <div className="p-5 rounded-2xl bg-nectar-wasabi dark:bg-nectar-forest/30 border border-nectar-mint dark:border-nectar-darkBorder">
              <span className="text-xs font-bold uppercase tracking-wider text-nectar-forest dark:text-nectar-mint">
                20% Growth Goal
              </span>
              <div key={savings} className="text-2xl font-serif font-bold text-nectar-emerald dark:text-nectar-mint my-1.5 value-change">
                {formatCurrency(savings).split('.')[0]}
              </div>
              <p className="text-[11px] text-nectar-forest dark:text-nectar-mint">Automated emergency buffer and compound investments</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           BENTO FEATURES GRID
           ========================================================================== */}
      <section id="features" data-reveal className="py-20 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-nectar-forest dark:text-nectar-mint">
            Designed for Serenity
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-nectar-forest dark:text-nectar-mint mt-2 mb-3">
            Everything you need.<br />Nothing you don't.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="interactive-card bg-white dark:bg-nectar-darkCard p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-3">
            <div className="w-10 h-10 rounded-xl bg-nectar-wasabi dark:bg-nectar-forest/20 flex items-center justify-center text-nectar-forest dark:text-nectar-mint">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-nectar-forest dark:text-nectar-mint">Natural Language Parsing</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Log expenses by typing casually like "₹450 dinner with team". Our parser extracts amount, category, and date automatically.
            </p>
          </div>

          <div className="interactive-card bg-white dark:bg-nectar-darkCard p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center text-amber-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-nectar-forest dark:text-nectar-mint">Daily Safe-to-Spend Limit</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Dynamic calculations that divide remaining discretionary allowance by the days remaining in your monthly billing cycle.
            </p>
          </div>

          <div className="interactive-card bg-white dark:bg-nectar-darkCard p-8 rounded-3xl border border-nectar-forest/10 dark:border-nectar-darkBorder shadow-nectar space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-nectar-forest dark:text-nectar-mint">Zero Telemetry & Offline</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Your financial records never leave your browser. Full CRUD and export capabilities operate completely client-side in localStorage.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           CALL TO ACTION (Nectar Luxury Banner)
           ========================================================================== */}
      <section data-reveal className="py-20 px-6 sm:px-10 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-nectar-forest to-emerald-950 text-white rounded-3xl p-10 sm:p-16 shadow-nectar-float relative overflow-hidden space-y-6">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-nectar-mint">
            <Leaf className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight">
            Ready to feel great about your money?
          </h2>

          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto">
            Join thousands who turned paycheck anxiety into automated financial clarity. Set up your personal money system in under 2 minutes.
          </p>

          <div className="pt-2">
            <Link
              to="/signup"
              onClick={handleGetStarted}
              aria-disabled={startingJourney}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-nectar-mint text-nectar-forest font-bold text-sm hover:bg-emerald-200 transition-transform active:scale-95 shadow-lg"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           FOOTER (Nectar Editorial Layout)
           ========================================================================== */}
      <footer id="integrity" className="border-t border-nectar-forest/10 dark:border-nectar-darkBorder py-12 px-6 sm:px-10 max-w-6xl mx-auto text-xs text-gray-500 dark:text-gray-400">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-nectar-forest dark:text-nectar-mint font-bold">
            <Leaf className="w-4 h-4" />
            <span>Nectar Smart Finance</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="hover:text-nectar-forest dark:hover:text-nectar-mint">Log in</Link>
            <Link to="/signup" className="hover:text-nectar-forest dark:hover:text-nectar-mint">Sign up</Link>
            <Link to="/dashboard" className="hover:text-nectar-forest dark:hover:text-nectar-mint">Dashboard</Link>
          </div>

          <p className="text-center sm:text-right">
            © 2026 Nectar Smart Finance. Mindful wealth & automated cashflow.
          </p>
        </div>
      </footer>

      {startingJourney && (
        <div className="rupee-journey-overlay" role="status" aria-live="polite">
          <div className="rupee-journey-card">
            <span className="rupee-journey-spark rupee-journey-spark-one" aria-hidden="true">✦</span>
            <span className="rupee-journey-spark rupee-journey-spark-two" aria-hidden="true">✧</span>
            <div className="rupee-journey-coin" aria-hidden="true">₹</div>
            <p className="text-sm font-bold text-nectar-forest dark:text-nectar-mint">
              Your money journey starts here
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
