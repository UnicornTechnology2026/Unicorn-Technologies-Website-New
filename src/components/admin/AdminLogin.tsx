import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowLeft,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginProps {
  onBackToWebsite: () => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToWebsite, onLoginSuccess }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('admin@unicorntechnologies.com');
  const [password, setPassword] = useState('Admin@Unicorn2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password) {
      setError('Please enter your email or username and password.');
      return;
    }

    setLoading(true);
    try {
      await login(identifier, password);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setIdentifier('admin@unicorntechnologies.com');
    setPassword('Admin@Unicorn2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-900">
      {/* Top back link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-6">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Unicorn Technologies Public Website</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Admin Portal</h2>
            <p className="text-xs text-slate-500 mt-1">
              Secure enterprise management for Unicorn Technologies
            </p>
          </div>

          {/* Demo Helper Banner */}
          <div className="p-3.5 rounded-xl bg-orange-50/70 border border-orange-200 mb-6 flex items-center justify-between">
            <div className="text-xs text-slate-700">
              <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Default Credentials:</div>
              <div className="font-mono text-xs text-orange-600 font-bold">admin@unicorntechnologies.com</div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Fill Demo
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-start gap-2 mb-6">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-2">
                Email or Username
              </label>
              <div className="relative">
                <input
                  id="admin-login-identifier"
                  type="text"
                  required
                  placeholder="admin@unicorntechnologies.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In To Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Encrypted Session with JWT & Rate-Limiting Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
