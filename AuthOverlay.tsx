
import React, { useState } from 'react';
import { Shield, Mail, Lock, User, ArrowRight, X, ShieldCheck, UserCircle } from 'lucide-react';
import { User as UserType, UserRole } from '../types';

interface AuthOverlayProps {
  onLogin: (user: UserType) => void;
  onClose: () => void;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating authentication logic
    const mockUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || (isLogin ? formData.email.split('@')[0] : 'New User'),
      email: formData.email,
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
    };
    onLogin(mockUser);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
        <div className="relative p-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl mb-4 shadow-lg shadow-blue-600/20">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isLogin ? 'Welcome Back' : 'Create Secure Account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">
              {isLogin ? 'Access your SAFECLICK dashboard' : 'Join the cybersecurity awareness network'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 ml-1">Security Key / Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3 ml-1">Access Tier</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.STUDENT)}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                      role === UserRole.STUDENT 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.CYBER_EXPERT)}
                    className={`flex items-center justify-center p-3 rounded-xl border transition-all ${
                      role === UserRole.CYBER_EXPERT 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    <span className="text-xs font-bold">Expert</span>
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              {isLogin ? 'Sign In' : 'Initialize Account'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
