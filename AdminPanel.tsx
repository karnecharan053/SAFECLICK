
import React from 'react';
import { ShieldAlert, Users, Activity, BarChart3, Database, Globe, Search, ArrowUpRight } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const stats = [
    { label: 'Active Users', value: '1,284', change: '+12%', icon: Users, color: 'text-blue-500' },
    { label: 'Threats Scanned', value: '45,021', change: '+24%', icon: Search, color: 'text-emerald-500' },
    { label: 'Blocked Domains', value: '3,120', change: '+5%', icon: ShieldAlert, color: 'text-red-500' },
    { label: 'Global Rank', value: '#42', change: 'Top 1%', icon: Globe, color: 'text-purple-500' },
  ];

  const logs = [
    { user: 'admin_sys', action: 'Core engine update', time: '2 mins ago', type: 'System' },
    { user: 'user_4219', action: 'Malicious URL detected', time: '15 mins ago', type: 'Security' },
    { user: 'expert_rahul', action: 'Added Deepfake Guide', time: '1 hour ago', type: 'Content' },
    { user: 'sys_bot', action: 'API integration synced', time: '3 hours ago', type: 'System' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Control Center</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            System-wide security monitoring and content management dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-sm font-bold">
          <Activity className="w-4 h-4 animate-pulse" />
          Live Monitoring Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-500 flex items-center">
                {stat.change}
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h4 className="text-slate-500 dark:text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</h4>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Logs */}
        <div className="lg:col-span-2 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
            <Database className="w-5 h-5 mr-3 text-blue-500" />
            System Activity Logs
          </h3>
          <div className="space-y-4">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${log.type === 'Security' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{log.action}</div>
                    <div className="text-xs text-slate-500">Initiated by <span className="text-blue-500 font-mono">@{log.user}</span></div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium">{log.time}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
            View All System Events
          </button>
        </div>

        {/* Quick Tools */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-3 text-emerald-400" />
            Expert Toolkit
          </h3>
          <div className="space-y-3">
            {[
              'Update Global Blacklist',
              'Review Flagged Content',
              'Content Pipeline Manager',
              'User Permission Matrix',
              'Export Audit Reports',
              'System Diagnostics'
            ].map((tool, i) => (
              <button 
                key={i} 
                className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-sm font-medium transition-all hover:translate-x-1"
              >
                {tool}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
