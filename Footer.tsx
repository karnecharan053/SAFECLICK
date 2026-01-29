
import React from 'react';
import { Shield, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SAFE<span className="text-blue-500">CLICK</span></span>
            </div>
            <p className="text-slate-600 dark:text-slate-500 leading-relaxed text-sm">
              Social Engineering Awareness and Detection System. Empowering users through education and AI-driven protection.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-500 text-sm">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Knowledge Hub</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Threat Scanner</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Cyber Laws</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-500 text-sm">
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact Expert</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 dark:hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 transition-all group shadow-sm dark:shadow-none">
                <Twitter className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 transition-all group shadow-sm dark:shadow-none">
                <Linkedin className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 transition-all group shadow-sm dark:shadow-none">
                <Github className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white" />
              </a>
              <a href="#" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-600 transition-all group shadow-sm dark:shadow-none">
                <Mail className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} SAFECLICK Awareness & Detection System. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-xs text-slate-500">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> System Status: Online
            </span>
            <span>Security Version 2.5.0-Flash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
