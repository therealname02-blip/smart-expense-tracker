import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Lock, 
  Mail, 
  User, 
  IndianRupee, 
  ArrowRight, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Star 
} from 'lucide-react';
import { loginSuccess } from '../redux/slices/authSlice';
import { updateBudget } from '../redux/slices/expenseSlice';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [income, setIncome] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the terms to proceed.');
      return;
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };

    // If income provided, pre-configure budget
    const numIncome = parseFloat(income);
    if (!isNaN(numIncome) && numIncome > 0) {
      dispatch(updateBudget({
        monthlyIncome: numIncome,
        monthlyLimit: numIncome * 0.8
      }));
    }

    dispatch(loginSuccess(newUser));
    navigate('/dashboard');
  };

  const handleQuickDemo = () => {
    setName('Jordan Bell');
    setEmail('jordan@nectar.com');
    setPassword('secret123');
    setIncome('6200');
  };

  return (
    <div className="min-h-screen bg-nectar-canvas dark:bg-nectar-darkBg flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors">
      <div className="w-full max-w-4xl bg-white dark:bg-nectar-darkCard rounded-3xl border border-nectar-forest/15 dark:border-nectar-darkBorder shadow-nectar-float overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Value Prop Sidebar (Nectar Deep Forest Green) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-nectar-forest via-nectar-emerald to-emerald-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-nectar-mint">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-white tracking-tight text-base">
                Nectar
              </span>
            </Link>

            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight mb-2">
                Your money, finally figured out.
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                Work with an automated financial system that replaces spreadsheet stress with clarity.
              </p>
            </div>

            {/* Benefits Checklist */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-nectar-mint text-nectar-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs text-gray-200">Automated 50/30/20 money allocation out of the box</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-nectar-mint text-nectar-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs text-gray-200">100% Client-Side Privacy with zero external tracking</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-nectar-mint text-nectar-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs text-gray-200">Real-time daily safe-to-spend limits & category alerts</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="relative z-10 pt-8 border-t border-white/15 mt-8">
            <div className="flex text-amber-300 gap-1 mb-2 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <p className="text-xs italic text-gray-200 mb-2">
              "For the first time in years, I know exactly what I can spend today without worrying about next week's bills."
            </p>
            <p className="text-[11px] font-bold text-nectar-mint">
              — Elena R., San Francisco
            </p>
          </div>

          {/* Glow backdrop */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-nectar-mint/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Form Area */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-nectar-forest dark:text-nectar-mint">
              Create Your Account
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Join over 12,000+ members enjoying financial calm.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Bell"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@nectar.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (6+ characters)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                  required
                />
              </div>
            </div>

            {/* Take-Home Income (Optional Budget Setup) */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Monthly Take-Home Income (₹)
                </label>
                <span className="text-[10px] text-gray-400 font-medium">Optional</span>
              </div>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  step="500"
                  min="0"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="e.g. 80000 (sets your 50/30/20 goals)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                />
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-nectar-forest rounded cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 cursor-pointer select-none">
                I agree to the <span className="font-semibold text-nectar-forest dark:text-nectar-mint">Terms of Service</span> and client-side privacy policy.
              </label>
            </div>

            {/* Primary Submit */}
            <button
              type="submit"
              className="w-full btn-nectar btn-nectar-primary py-3 text-sm mt-3"
            >
              <span>Complete Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Pre-fill */}
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-nectar-wasabi dark:bg-nectar-forest/20 text-nectar-forest dark:text-nectar-mint text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-nectar-forest/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Quick Demo Details</span>
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-nectar-forest dark:text-nectar-mint hover:underline">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
