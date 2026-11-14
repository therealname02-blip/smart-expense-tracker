import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import { loginSuccess } from '../redux/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ') || 'Alex Morgan',
      email: email || 'alex@nectar.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    dispatch(loginSuccess(user));
    navigate('/dashboard');
  };

  const handleFillDemo = () => {
    setEmail('alex@nectar.com');
    setPassword('mindful123');
  };

  return (
    <div className="min-h-screen bg-nectar-canvas dark:bg-nectar-darkBg flex items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-nectar-darkCard rounded-3xl border border-nectar-forest/15 dark:border-nectar-darkBorder shadow-nectar-float p-8 sm:p-10 relative">
        
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-nectar-forest dark:hover:text-nectar-mint mb-6 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nectar-emerald to-nectar-forest flex items-center justify-center text-white mx-auto mb-3 shadow-md">
            <Leaf className="w-6 h-6 text-nectar-mint" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-nectar-forest dark:text-nectar-mint">
            Sign In to Nectar
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Access your Smart Expense & Insights Dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="alex@nectar.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                required
              />
            </div>
          </div>

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
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-nectar-darkBorder bg-gray-50 dark:bg-nectar-darkBg text-sm focus:outline-none focus:ring-2 focus:ring-nectar-emerald"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-nectar btn-nectar-primary py-3 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleFillDemo}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-nectar-wasabi dark:bg-nectar-forest/20 text-nectar-forest dark:text-nectar-mint text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-nectar-forest/30 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Use Demo Credentials</span>
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-nectar-forest dark:text-nectar-mint hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
