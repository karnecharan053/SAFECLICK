
import React from 'react';
import { Scale, ShieldAlert, ExternalLink, HelpCircle, Phone, FileText } from 'lucide-react';
import { LEGAL_RESOURCES } from '../constants';

const LegalModule: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Cyber Crime & Legal Reporting</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Fallen victim to a scam? Knowing where and how to report is crucial for damage control and seeking justice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {LEGAL_RESOURCES.map((resource, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none flex flex-col h-full">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-red-50 dark:bg-red-600/10 rounded-xl mr-4">
                <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{resource.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{resource.description}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">How to Report</h4>
              <ul className="space-y-3">
                {resource.steps.map((step, i) => (
                  <li key={i} className="flex items-start text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold mr-3 shrink-0">
                      {i + 1}
                    </div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="block text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider mb-1">Official Portal</span>
                <span className="text-slate-900 dark:text-white font-medium">{resource.portalName}</span>
              </div>
              <a 
                href={resource.portalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all shadow-lg shadow-blue-600/20"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* India Specific Info */}
      <div className="bg-slate-50 dark:bg-gradient-to-br dark:from-blue-900/20 dark:to-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Scale className="w-8 h-8 text-blue-600 dark:text-blue-500 mr-4" />
              Information Technology Act, 2000
            </h3>
            <div className="space-y-6">
              {[
                { section: 'Section 66C', label: 'Identity Theft', desc: 'Punishment for identity theft using fraudulent passwords or biometric features.' },
                { section: 'Section 66D', label: 'Cheating by Impersonation', desc: 'Punishment for cheating by personation by using any communication device.' },
                { section: 'Section 65', label: 'Tampering with Source Documents', desc: 'Punishment for tampering with computer source documents.' }
              ].map((law, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-blue-600 dark:text-blue-500 font-mono font-bold shrink-0">{law.section}</div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-bold">{law.label}</div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{law.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-950/80 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <HelpCircle className="w-5 h-5 mr-2 text-yellow-500" />
                Emergency Helplines
              </h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-emerald-500 mr-4" />
                    <div>
                      <div className="text-slate-900 dark:text-white font-bold">1930</div>
                      <div className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold">Cyber Financial Fraud</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-900 dark:text-white text-sm transition-colors">Call Now</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-4" />
                    <div>
                      <div className="text-slate-900 dark:text-white font-bold">112</div>
                      <div className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-bold">All India Emergency</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-900 dark:text-white text-sm transition-colors">Call Now</button>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  *When reporting, always preserve original message headers, URLs, and bank transaction statements. These act as vital evidence in digital forensics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalModule;
