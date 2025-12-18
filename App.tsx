
import React, { useState, useEffect } from 'react';
import { 
  LayoutTemplate, 
  Settings, 
  Video, 
  Download, 
  Users, 
  ChevronLeft,
  ChevronRight,
  Activity,
  Menu,
  X
} from 'lucide-react';

import LiveMatrix from './components/LiveMatrix';
import PlaybackView from './components/PlaybackView';
import SidebarItem from './components/SidebarItem';
import { LanguageProvider, useLanguage } from './LanguageContext';

function MainLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<'live' | 'playback'>('live');
  const { t } = useLanguage();

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
      if (window.innerWidth < 768) {
        setIsSidebarVisible(false);
      } else {
        setIsSidebarVisible(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebarVisibility = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Mobile Backdrop */}
      {isSidebarVisible && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`flex flex-col bg-[#111111] border-r border-gray-800 transition-all duration-300 z-40 shrink-0 
          ${isSidebarVisible ? (collapsed ? 'w-16' : 'w-64') : 'w-0 -ml-1 border-none'}
          ${window.innerWidth < 768 ? 'fixed h-full' : 'relative h-full'}
          overflow-hidden`}
      >
        {/* Logo Area */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-800 bg-[#0f0f0f] shrink-0">
          <div className="flex items-center overflow-hidden">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
               <svg viewBox="0 0 32 32" className="w-5 h-5 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.439 1.592a.078.078 0 0 0-.022-.142c-.951-.245-5.52-1.41-6.47-1.444a7.91 7.91 0 0 0-6.372 3.491c-2.145 2.987-4.293 3-7.54 4.6-1.663.823-1.215 2.792.577 4.208.147-.232-.182.686.687 1.9a4.625 4.625 0 0 0 3.268 1.711.077.077 0 0 0 .088-.084 3.687 3.687 0 0 1 2.783-3.984 5.832 5.832 0 0 1 5.427 1.56.079.079 0 0 1-.094.124c-2.089-1.049-3.014-.472-3.709.2-.46.449-1.111 1.586-1.543 2.061a3.149 3.149 0 0 1-1.267.771 2.231 2.231 0 0 1-1.325-.316.076.076 0 0 0-.109.091 2.308 2.308 0 0 1-.03 1.395 2.06 2.06 0 0 0-.049 1.233 1.8 1.8 0 0 0 .648 1.053c1.228.837 2.178.7 1.768 2.295a.078.078 0 0 0 .1.1c.735-.311.841-.621.99-1.339l.006-.02a4.448 4.448 0 0 1 3.18-2.949c1.628-.492 2.5.064 2.955 1.7 1.016 3.7 3.934 5.193 7.22 3.762a4.191 4.191 0 0 0 .825-.474 1.054 1.054 0 0 1 .934-.255 4.769 4.769 0 0 0 2.215-.05 6.63 6.63 0 0 0 3.326-2.083 6.51 6.51 0 0 0 1.285-2.114 13.094 13.094 0 0 0 .4-8.139 7.657 7.657 0 0 0-.565-1.531c-2.99-5.436-8.553-7.006-13.294-4.785a3.843 3.843 0 0 1-3.412.07 1.545 1.545 0 0 1-.943-1.744 1.755 1.755 0 0 1 .536-.972c.081.035-.36.789-.144 1.4a2.234 2.234 0 0 0 2.454 1.124 20.018 20.018 0 0 0 5.216-2.424Zm-4.042 5.835a.082.082 0 0 1-.034-.143 8.225 8.225 0 0 1 3.318-1.663c7.1-1.4 10.221 5.119 10.114 9.168s-2.372 6.43-3.886 6.826c-1.943.508-3.09.054-3.8-.868a3.87 3.87 0 0 1-.661-3.47 1.972 1.972 0 0 1 2.115-1.3c1.267.03 1.307 1.369 1.307 2.278a.076.076 0 0 0 .139.045 2.7 2.7 0 0 0 .062-3.294 2.566 2.566 0 0 0-2.946-.666 4.541 4.541 0 0 0-1.735 7.607 3.34 3.34 0 0 0 1.576.712.078.078 0 0 1 .032.137 3.854 3.854 0 0 1-1.925.845 3.507 3.507 0 0 1-3.258-1.795 5.1 5.1 0 0 1 1.539-6.677 4.62 4.62 0 0 0 1.308-1.587 5.546 5.546 0 0 0 .484-2.91 2.492 2.492 0 0 0-.072-.346 2.842 2.842 0 0 0-.291-.626 4.579 4.579 0 0 0-2.051-1.81 6.8 6.8 0 0 0-1.335-.465Zm-5.534-1.059a.078.078 0 0 1-.026.15c-.538.035-1.51.227-1.589 1.147-.034.313-.688.531-1.105.3a1.214 1.214 0 0 1-.508-1.318 1.316 1.316 0 0 1 1.67-.862 12.038 12.038 0 0 1 1.558.581Z" data-name="Path 575"></path>
               </svg>
            </div>
            {!collapsed && <span className="ml-3 font-bold text-lg tracking-tight text-white whitespace-nowrap">SHISA.IO</span>}
          </div>
          {window.innerWidth < 768 && (
            <button onClick={() => setIsSidebarVisible(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={20}/>
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800">
          <div className={`px-4 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider ${collapsed && 'hidden'}`}>{t.monitor}</div>
          
          <SidebarItem 
            icon={LayoutTemplate} 
            label={t.liveMatrix} 
            active={currentView === 'live'} 
            collapsed={collapsed} 
            onClick={() => {
              setCurrentView('live');
              if (window.innerWidth < 768) setIsSidebarVisible(false);
            }}
          />
          <SidebarItem 
            icon={Video} 
            label={t.playback} 
            active={currentView === 'playback'} 
            collapsed={collapsed}
            onClick={() => {
              setCurrentView('playback');
              if (window.innerWidth < 768) setIsSidebarVisible(false);
            }} 
          />
          <SidebarItem icon={Activity} label={t.events} collapsed={collapsed} />
          
          <div className={`px-4 mt-6 mb-2 text-xs font-semibold text-gray-600 uppercase tracking-wider ${collapsed && 'hidden'}`}>{t.system}</div>
          <SidebarItem icon={Download} label={t.downloads} collapsed={collapsed} />
          <SidebarItem icon={Users} label={t.users} collapsed={collapsed} />
          <SidebarItem icon={Settings} label={t.configuration} collapsed={collapsed} />
        </div>

        {/* Bottom Toggle */}
        <div className="p-4 border-t border-gray-800">
           <button 
             onClick={() => setCollapsed(!collapsed)}
             className="flex items-center justify-center w-full p-2 rounded hover:bg-gray-800 text-gray-400 transition-colors"
           >
             {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col h-full min-w-0 transition-all duration-300`}>
          {currentView === 'live' ? (
            <LiveMatrix onToggleSidebar={toggleSidebarVisibility} isSidebarVisible={isSidebarVisible} />
          ) : (
            <PlaybackView onToggleSidebar={toggleSidebarVisibility} isSidebarVisible={isSidebarVisible} />
          )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainLayout />
    </LanguageProvider>
  );
}
