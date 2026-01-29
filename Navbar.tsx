
import React, { useState } from 'react';
import { Shield, LayoutDashboard, BookOpen, Search, Scale, Menu, X, Sun, Moon, User as UserIcon, LogOut, Lock, DownloadCloud } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  downloadCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isDarkMode, 
  toggleTheme, 
  currentUser, 
  onLoginClick,
  onLogout,
  downloadCount
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: LayoutDashboard },
    { id: 'awareness', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'detection', label: 'Safety Scanner', icon: Search },
    { id: 'legal', label: 'Cyber Laws', icon: Scale },
    { id: 'downloads', label: 'Downloads', icon: DownloadCloud, badge: downloadCount },
  ];

  if (currentUser?.role === UserRole.CYBER_EXPERT) {
    navItems.push({ id: 'admin', label: 'Control Center', icon: Lock });
  }

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('hero')}>
            <div className="bg-blue-600 p-2 rounded-lg mr-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SAFE<span className="text-blue-500">CLICK</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all relative ${
                    activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white border-2 border-white dark:border-slate-950">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" />
                  <span className="text-xs font-bold dark:text-white hidden lg:inline">{currentUser.name.split(' ')[0]}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{currentUser.role}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{currentUser.email}</p>
                    </div>
                    <button 
                      onClick={() => { onLogout(); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors font-medium mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95"
              >
                <UserIcon className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 shadow-xl overflow-y-auto max-h-[80vh]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-3 rounded-md text-base font-medium relative ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
                {item.badge && item.badge > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
              {currentUser ? (
                <div className="px-3 py-3">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-500">{currentUser.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { onLogout(); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl font-bold"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onLoginClick(); setIsOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold"
                >
                  <UserIcon className="w-5 h-5" /> Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
