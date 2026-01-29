
import React, { useState } from 'react';
import { AWARENESS_TOPICS, ICON_MAP, SAFETY_RESOURCES, VIDEO_RESOURCES } from '../constants';
import { AwarenessTopic } from '../types';
import { 
  BookOpen, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  FileDown, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  Video, 
  Zap, 
  Lock, 
  Gavel, 
  LifeBuoy,
  Youtube
} from 'lucide-react';

interface AwarenessModuleProps {
  completedTopicIds?: string[];
  onToggleCompletion?: (topicId: string) => void;
  onResourceDownload?: (id: string, title: string) => void;
}

const AwarenessModule: React.FC<AwarenessModuleProps> = ({ 
  completedTopicIds = [], 
  onToggleCompletion,
  onResourceDownload 
}) => {
  const [selectedTopic, setSelectedTopic] = useState<AwarenessTopic | null>(null);

  const categories = [
    { id: 'Demo', label: 'Attack Simulations', icon: Zap, color: 'text-red-500', bg: 'bg-red-500/10' },
    { id: 'Protection', label: 'Securing & Protection', icon: Lock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { id: 'Laws', label: 'Indian Cyber Laws', icon: Gavel, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { id: 'Reporting', label: 'Reporting & Justice', icon: LifeBuoy, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Knowledge Hub Section */}
      <div className="mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Cybersecurity Knowledge Hub</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              From basic phishing to advanced AI deepfakes—master the art of digital self-defense through our curated curriculum.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span> Beginner</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span> Intermediate</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span> Advanced</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AWARENESS_TOPICS.map((topic) => {
            const Icon = ICON_MAP[topic.icon] || BookOpen;
            const isCompleted = completedTopicIds.includes(topic.id);
            return (
              <div 
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`group cursor-pointer p-8 rounded-3xl bg-white dark:bg-slate-900 border transition-all transform hover:-translate-y-1 shadow-sm dark:shadow-none relative overflow-hidden ${
                  isCompleted 
                    ? 'border-emerald-500/50 bg-emerald-50/10 dark:bg-emerald-500/5' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {isCompleted && (
                  <div className="absolute top-0 right-0 p-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 animate-in zoom-in" />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-blue-50 dark:bg-blue-600/10 text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white'} transition-colors`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    topic.level === 'Beginner' ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-500' :
                    topic.level === 'Intermediate' ? 'border-blue-500/30 text-blue-600 dark:text-blue-500' : 'border-purple-500/30 text-purple-600 dark:text-purple-500'
                  }`}>
                    {topic.level}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{topic.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2">{topic.description}</p>
                <div className="flex items-center text-blue-600 dark:text-blue-500 font-bold group-hover:translate-x-1 transition-transform">
                  {isCompleted ? 'Review Content' : 'Read Detailed Guide'} <ChevronRight className="ml-1 w-5 h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expert Video Resources (The attractive Redirection UI) */}
      <div className="mb-24 py-20 border-t border-slate-200 dark:border-slate-900">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-sm font-bold mb-6">
            <Video className="w-4 h-4 mr-2" />
            Expert Video Directory
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Watch & Learn Globally</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore curated expert channels for attack demonstrations, defensive configurations, and official Indian legal guidelines.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat.id} className="mb-16 last:mb-0">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-2xl ${cat.bg} ${cat.color}`}>
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{cat.label}</h3>
              <div className="flex-grow h-px bg-slate-200 dark:bg-slate-800 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEO_RESOURCES.filter(v => v.category === cat.id).map((video) => (
                <a 
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-1"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:scale-110 transition-all duration-300">
                        <Youtube className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{video.channel}</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{video.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">{video.description}</p>
                    <div className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-500">
                      Watch on YouTube <ExternalLink className="ml-1.5 w-3 h-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Resource Download Section */}
      <div className="pt-20 border-t border-slate-200 dark:border-slate-900">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-6">
            <FileDown className="w-4 h-4 mr-2" />
            Downloadable Safety Guides
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Printable Safety Resources</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get accurate, expert-curated checklists and manuals to keep offline. These resources are compiled from leading cybersecurity standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_RESOURCES.map((resource) => {
            const Icon = ICON_MAP[resource.icon] || Download;
            return (
              <div 
                key={resource.id}
                className="flex flex-col p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-all hover:border-emerald-500/50 group"
              >
                <div className="p-3 w-fit rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 mb-6 shadow-sm">
                  <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
                </div>
                <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
                  {resource.category}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-900">
                  <span className="text-xs font-mono text-slate-400">{resource.fileSize}</span>
                  <button 
                    onClick={() => onResourceDownload && onResourceDownload(resource.id, resource.title)}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  >
                    Download <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Safety Pledge (Visual Element) */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-center shadow-2xl shadow-blue-500/20">
          <ShieldCheck className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h3 className="text-3xl font-black mb-4">Official Verification Seal</h3>
          <p className="text-blue-50/80 max-w-xl mx-auto leading-relaxed mb-0">
            All downloadable content is verified against current 2024-2025 cyber threat intelligence. Think twice, click once, and stay protected.
          </p>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedTopic && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm overflow-y-auto pt-20">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl my-auto overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center">
                <div className="p-2 bg-blue-600 rounded-lg mr-4">
                  {React.createElement(ICON_MAP[selectedTopic.icon] || BookOpen, { className: "w-6 h-6 text-white" })}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedTopic.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                {onToggleCompletion && (
                  <button
                    onClick={() => onToggleCompletion(selectedTopic.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      completedTopicIds.includes(selectedTopic.id)
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white'
                    }`}
                  >
                    {completedTopicIds.includes(selectedTopic.id) ? (
                      <><CheckSquare className="w-4 h-4" /> Learned</>
                    ) : (
                      <><Square className="w-4 h-4" /> Mark as Learned</>
                    )}
                  </button>
                )}
                <button 
                  onClick={() => setSelectedTopic(null)}
                  className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-8 space-y-10 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Understanding the Attack</h4>
                  <p className="text-slate-700 dark:text-slate-400 leading-relaxed text-lg">{selectedTopic.detailedContent}</p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" />
                      Step-by-Step Lifecycle
                    </h5>
                    <ul className="space-y-3">
                      {selectedTopic.howItWorks.map((step, i) => (
                        <li key={i} className="flex text-slate-700 dark:text-slate-300 text-sm">
                          <span className="font-mono text-blue-600 dark:text-blue-500 mr-3 shrink-0">0{i+1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Prevention & Safety</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedTopic.prevention.map((prev, i) => (
                      <div key={i} className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-500 mr-4 shrink-0" />
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{prev}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-600/10 border border-blue-100 dark:border-blue-500/30">
                    <h5 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Pro Tip</h5>
                    <p className="text-blue-800 dark:text-blue-200/80 text-sm">
                      Social engineers rely on your instinct to act quickly. By simply waiting 60 seconds before clicking or replying, you significantly decrease your chance of falling victim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwarenessModule;
