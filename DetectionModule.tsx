
import React, { useState, useEffect } from 'react';
import { Search, Link, Mail, MessageSquare, AlertTriangle, CheckCircle, Shield, ArrowRight, Loader2, Globe, Server, UserCheck } from 'lucide-react';
import { analyzeContent } from '../services/gemini';
import { AnalysisResult, RiskLevel } from '../types';

const DetectionModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'url' | 'email' | 'message'>('url');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const loadingStages = [
    'Initializing secure connection...',
    'Consulting global threat databases...',
    'Analyzing domain reputation...',
    'Scanning for psychological triggers...',
    'Finalizing threat assessment...'
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      let stage = 0;
      setLoadingStage(loadingStages[0]);
      interval = setInterval(() => {
        stage = (stage + 1) % loadingStages.length;
        setLoadingStage(loadingStages[stage]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeContent(activeTab, inputValue);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'url', label: 'URL Reputation', icon: Link, placeholder: 'https://verify-account.support/secure-login' },
    { id: 'email', label: 'Phishing Email', icon: Mail, placeholder: 'Paste the full email body here...' },
    { id: 'message', label: 'SMS/DM Scan', icon: MessageSquare, placeholder: 'Paste the suspicious SMS or chat message...' },
  ];

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.LOW: return 'text-emerald-600 dark:text-emerald-400 border-emerald-400/20 bg-emerald-50 dark:bg-emerald-400/10';
      case RiskLevel.MEDIUM: return 'text-yellow-600 dark:text-yellow-400 border-yellow-400/20 bg-yellow-50 dark:bg-yellow-400/10';
      case RiskLevel.HIGH: return 'text-orange-600 dark:text-orange-400 border-orange-400/20 bg-orange-50 dark:bg-orange-400/10';
      case RiskLevel.CRITICAL: return 'text-red-600 dark:text-red-400 border-red-400/20 bg-red-50 dark:bg-red-400/10';
      default: return 'text-slate-600 dark:text-slate-400 border-slate-400/20 bg-slate-50 dark:bg-slate-400/10';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Advanced Threat Detection</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          SAFECLICK uses real-time web grounding and psychological analysis to detect sophisticated social engineering attempts before they reach your data.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setResult(null);
                setInputValue('');
              }}
              className={`flex-1 flex items-center justify-center py-4 px-4 text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white dark:bg-blue-500/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="relative mb-6">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={tabs.find(t => t.id === activeTab)?.placeholder}
              className="w-full h-40 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none font-mono text-sm leading-relaxed"
            />
            {loading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center z-10 transition-opacity">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-blue-600 font-bold animate-pulse text-sm tracking-wide uppercase">{loadingStage}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading || !inputValue.trim()}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold flex items-center transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanner Active...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Analyze Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Area */}
        {result && (
          <div className="border-t border-slate-200 dark:border-slate-800 p-8 bg-slate-50 dark:bg-slate-950/30 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Score Indicator */}
              <div className="lg:col-span-4 flex flex-col items-center justify-start p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
                <div className={`w-36 h-36 rounded-full border-8 flex flex-col items-center justify-center mb-6 shadow-inner ${getRiskColor(result.riskLevel)}`}>
                  <span className="text-4xl font-black">{result.riskScore}</span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Risk Score</span>
                </div>
                <div className="text-center w-full">
                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-black uppercase mb-4 border ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel} Hazard
                  </div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1">{result.attackType}</h4>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Threat Category</p>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-8 space-y-8">
                {/* Technical Evidence Section */}
                <div>
                  <h5 className="text-xs font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Server className="w-4 h-4 mr-2" />
                    Technical Forensic Markers
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.suspiciousPatterns.map((pattern, i) => (
                      <div key={i} className="flex items-center p-3 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 shrink-0"></div>
                        {pattern}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analysis Breakdown */}
                <div>
                  <h5 className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Expert Assessment
                  </h5>
                  <ul className="space-y-3">
                    {result.reasoning.map((reason, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800/20 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                        <AlertTriangle className="w-5 h-5 text-amber-500 mr-4 shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Defensive Strategy
                  </h5>
                  <div className="grid grid-cols-1 gap-3">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-sm text-emerald-900 dark:text-emerald-400 font-medium">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mr-4 shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Legend */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 flex items-center shadow-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-500 mr-4 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <div>
            <span className="block text-emerald-700 dark:text-emerald-500 text-sm font-black uppercase tracking-wider">Safe Zone</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Score 0 - 30</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/10 flex items-center shadow-sm">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-4 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          <div>
            <span className="block text-amber-700 dark:text-amber-500 text-sm font-black uppercase tracking-wider">Warning</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Score 31 - 70</span>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 flex items-center shadow-sm">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-4 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          <div>
            <span className="block text-red-700 dark:text-red-500 text-sm font-black uppercase tracking-wider">Dangerous</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Score 71 - 100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionModule;
