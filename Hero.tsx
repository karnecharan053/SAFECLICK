
import React from 'react';
import { ShieldCheck, ChevronRight, Zap, Lock, Eye, Award } from 'lucide-react';
import { User } from '../types';

interface HeroProps {
  onStartLearning: () => void;
  onScanNow: () => void;
  completedCount: number;
  totalCount: number;
  user: User | null;
}

const Hero: React.FC<HeroProps> = ({ onStartLearning, onScanNow, completedCount, totalCount, user }) => {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] opacity-40 dark:opacity-100"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-emerald-600 rounded-full blur-[120px] opacity-40 dark:opacity-100"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Empowering Digital Resilience
          </div>
          
          {user && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-4">
              <span className="text-blue-600 dark:text-blue-400 font-mono font-bold tracking-tighter uppercase text-sm">
                Secure Session Active // Welcome back, {user.name.split(' ')[0]}
              </span>
            </div>
          )}

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Think Before You Click. <br />
            <span className="text-blue-600 dark:text-blue-500">Stay Secure Online.</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            The Social Engineering Awareness and Detection System (SAFECLICK) helps you identify, understand, and stop modern cyber attacks before they happen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button 
              onClick={onScanNow}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center group"
            >
              Analyze Suspicious Link
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onStartLearning}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-lg border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center"
            >
              Start Learning Path
            </button>
          </div>

          {/* Mini Dashboard */}
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Resilience Score</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{percentage}% Protection Level</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{completedCount}/{totalCount}</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Topics Mastery</p>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Zap, 
              title: 'AI Threat Detection', 
              desc: 'Leverage Google Gemini to scan emails, links, and messages for psychological manipulation markers.' 
            },
            { 
              icon: Lock, 
              title: 'Enterprise Education', 
              desc: 'Zero-to-hero curriculum covering Phishing, Deepfakes, Smishing, and Vishing with expert content.' 
            },
            { 
              icon: Eye, 
              title: 'Visual Simulations', 
              desc: 'Step-by-step interactive animations demonstrating exactly how social engineering cycles operate.' 
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 shadow-sm dark:shadow-none transition-all group">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-600/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-500 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
