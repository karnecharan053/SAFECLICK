
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AwarenessModule from './components/AwarenessModule';
import DetectionModule from './components/DetectionModule';
import LegalModule from './components/LegalModule';
import DownloadsModule from './components/DownloadsModule';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AuthOverlay from './components/AuthOverlay';
import AdminPanel from './components/AdminPanel';
import { UserProgress, User, UserRole } from './types';
import { AWARENESS_TOPICS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuth, setShowAuth] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('userProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { 
        ...parsed, 
        lastAccessed: new Date(parsed.lastAccessed),
        downloadedResourceIds: parsed.downloadedResourceIds || []
      };
    }
    return { userId: '', completedTopicIds: [], downloadedResourceIds: [], lastAccessed: new Date() };
  });

  // Persist theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Persist current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Persist progress
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('hero');
  };

  const toggleTopicCompletion = (topicId: string) => {
    if (!currentUser) {
      setShowAuth(true);
      return;
    }
    setProgress(prev => {
      const isCompleted = prev.completedTopicIds.includes(topicId);
      const newIds = isCompleted 
        ? prev.completedTopicIds.filter(id => id !== topicId)
        : [...prev.completedTopicIds, topicId];
      
      return {
        ...prev,
        completedTopicIds: newIds,
        lastAccessed: new Date()
      };
    });
  };

  const handleResourceDownload = (resourceId: string, resourceTitle: string) => {
    if (!currentUser) {
      setShowAuth(true);
      return;
    }

    setProgress(prev => ({
      ...prev,
      downloadedResourceIds: prev.downloadedResourceIds.includes(resourceId) 
        ? prev.downloadedResourceIds 
        : [...prev.downloadedResourceIds, resourceId]
    }));

    // Trigger visual simulation of download
    alert(`Downloading ${resourceTitle}...\nThis resource has been added to your Digital Library.`);
  };

  const handleRemoveDownload = (resourceId: string) => {
    setProgress(prev => ({
      ...prev,
      downloadedResourceIds: prev.downloadedResourceIds.filter(id => id !== resourceId)
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <>
            <Hero 
              onStartLearning={() => setActiveTab('awareness')} 
              onScanNow={() => setActiveTab('detection')}
              completedCount={progress.completedTopicIds.length}
              totalCount={AWARENESS_TOPICS.length}
              user={currentUser}
            />
            <div className="border-t border-slate-200 dark:border-slate-900/50">
              <AwarenessModule 
                completedTopicIds={progress.completedTopicIds}
                onToggleCompletion={toggleTopicCompletion}
                onResourceDownload={handleResourceDownload}
              />
            </div>
            <div className="border-t border-slate-200 dark:border-slate-900/50">
              <DetectionModule />
            </div>
          </>
        );
      case 'awareness':
        return (
          <div className="pt-20">
            <AwarenessModule 
              completedTopicIds={progress.completedTopicIds}
              onToggleCompletion={toggleTopicCompletion}
              onResourceDownload={handleResourceDownload}
            />
          </div>
        );
      case 'detection':
        return <div className="pt-20"><DetectionModule /></div>;
      case 'legal':
        return <div className="pt-20"><LegalModule /></div>;
      case 'downloads':
        return (
          <div className="pt-20">
            <DownloadsModule 
              downloadedIds={progress.downloadedResourceIds} 
              onRemove={handleRemoveDownload}
              onDownload={(title) => alert(`Re-downloading ${title}...`)}
            />
          </div>
        );
      case 'admin':
        return currentUser?.role === UserRole.CYBER_EXPERT ? (
          <div className="pt-20"><AdminPanel /></div>
        ) : (
          <div className="pt-40 text-center"><h2 className="text-2xl font-bold">Access Denied</h2></div>
        );
      default:
        return <Hero 
          onStartLearning={() => setActiveTab('awareness')} 
          onScanNow={() => setActiveTab('detection')} 
          completedCount={progress.completedTopicIds.length}
          totalCount={AWARENESS_TOPICS.length}
          user={currentUser}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        onLoginClick={() => setShowAuth(true)}
        onLogout={handleLogout}
        downloadCount={progress.downloadedResourceIds.length}
      />
      
      <main className="relative">
        {renderContent()}
      </main>

      <Footer />
      
      <Chatbot />

      {showAuth && <AuthOverlay onLogin={handleLogin} onClose={() => setShowAuth(false)} />}
      
      {activeTab === 'hero' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-widest">Scroll to explore</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500 to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default App;
