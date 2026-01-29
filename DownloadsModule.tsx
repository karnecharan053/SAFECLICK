
import React, { useState } from 'react';
import { SAFETY_RESOURCES, ICON_MAP } from '../constants';
// Fixed: ShieldInfo is not an exported member of 'lucide-react'. Replaced with 'Shield'.
import { FileDown, Download, Trash2, Shield, ExternalLink, FileText, AlertCircle } from 'lucide-react';

interface DownloadsModuleProps {
  downloadedIds: string[];
  onRemove: (id: string) => void;
  onDownload: (title: string) => void;
}

const DownloadsModule: React.FC<DownloadsModuleProps> = ({ downloadedIds, onRemove, onDownload }) => {
  const [resourceToRemove, setResourceToRemove] = useState<any | null>(null);
  const downloadedResources = SAFETY_RESOURCES.filter(r => downloadedIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Your Digital Library</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
          Quick access to all your saved safety guides, checklists, and manuals. These files are essential for offline protection.
        </p>
      </div>

      {downloadedResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
            <FileDown className="w-12 h-12 text-slate-400 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Downloads Yet</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
            Browse our Knowledge Hub to download expert-curated safety resources and checklists.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloadedResources.map((resource) => {
            const Icon = ICON_MAP[resource.icon] || FileText;
            return (
              <div 
                key={resource.id}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-600/10 rounded-2xl">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onDownload(resource.title)}
                      className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Re-download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setResourceToRemove(resource)}
                      className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Remove from Library"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-500">
                  {resource.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">
                  {resource.description}
                </p>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center text-xs font-mono text-slate-400">
                    <Shield className="w-3 h-3 mr-1.5" />
                    {resource.fileSize}
                  </div>
                  <div className="flex items-center text-xs font-bold text-slate-500">
                    Verified <ExternalLink className="w-3 h-3 ml-1.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {downloadedResources.length > 0 && (
        <div className="mt-12 p-8 rounded-[2.5rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Stay Updated</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Cyber threats evolve daily. We recommend checking back every week to see if updated versions of these manuals are available.
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {resourceToRemove && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl p-8 transform animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl mb-6">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Remove Resource?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
                Are you sure you want to remove <span className="font-bold text-slate-900 dark:text-white">"{resourceToRemove.title}"</span> from your digital library?
              </p>
              <div className="flex w-full gap-3">
                <button 
                  onClick={() => setResourceToRemove(null)}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onRemove(resourceToRemove.id);
                    setResourceToRemove(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-600/20"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadsModule;
