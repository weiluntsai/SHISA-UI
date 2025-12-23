import React, { useState } from 'react';
import { Grid, LayoutTemplate, Layers, Search, Bell, Menu } from 'lucide-react';
import VideoFeed from './VideoFeed';
import Timeline from './Timeline';
import ProfileDropdown from './ProfileDropdown';
import { CHANNELS } from '../constants';
import { useLanguage } from '../LanguageContext';

interface LiveMatrixProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
  onChannelSelect: (id: number) => void;
}

const LiveMatrix: React.FC<LiveMatrixProps> = ({ onToggleSidebar, isSidebarVisible, onChannelSelect }) => {
  const [gridSize, setGridSize] = useState(4);
  const [position, setPosition] = useState(100); // Live usually at the end
  const { t } = useLanguage();
  
  const iconProps = { strokeLinecap: "square" as const, strokeLinejoin: "miter" as const };

  const getGridCols = () => {
    if (gridSize === 2) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2';
    if (gridSize === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    if (gridSize === 9) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-950">
        {/* Top Header / Toolbar */}
        <div className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-2 md:px-4 z-10 shrink-0 transition-colors duration-200">
           {/* Left: View Controls */}
           <div className="flex items-center gap-2">
              <button 
                onClick={onToggleSidebar}
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors ${isSidebarVisible ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                title="Toggle Sidebar"
              >
                <Menu size={20} {...iconProps} />
              </button>
           </div>

           {/* Right: Search & Profile & Language */}
           <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden md:block">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" {...iconProps} />
                 <input 
                   type="text" 
                   placeholder={t.findCamera}
                   className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-base rounded-full pl-9 pr-4 py-1.5 w-48 lg:w-64 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-800 placeholder-gray-400 transition-all shadow-inner"
                 />
              </div>
              
              <button className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                 <Bell size={18} {...iconProps} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
              </button>
              
              <ProfileDropdown />
           </div>
        </div>

        {/* Video Grid Area */}
        <div className="flex-1 bg-gray-100 dark:bg-slate-950 p-0.5 overflow-y-auto md:overflow-hidden relative transition-colors duration-200">
           <div className={`grid gap-0.5 w-full h-full min-h-[50vh] auto-rows-fr ${getGridCols()}`}>
              {CHANNELS.map(channel => (
                <div key={channel.id} onClick={() => onChannelSelect(channel.id)} className="cursor-pointer h-full">
                  <VideoFeed channel={channel} />
                </div>
              ))}
           </div>
        </div>

        {/* Timeline Docker */}
        <Timeline position={position} onPositionChange={setPosition} />
    </div>
  );
};

export default LiveMatrix;