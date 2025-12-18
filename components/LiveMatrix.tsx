
import React, { useState } from 'react';
import { Grid, LayoutTemplate, Layers, Search, Bell, Menu } from 'lucide-react';
import VideoFeed from './VideoFeed';
import Timeline from './Timeline';
import LanguageSelector from './LanguageSelector';
import { CHANNELS } from '../constants';
import { useLanguage } from '../LanguageContext';

interface LiveMatrixProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
}

const LiveMatrix: React.FC<LiveMatrixProps> = ({ onToggleSidebar, isSidebarVisible }) => {
  const [gridSize, setGridSize] = useState(4);
  const { t } = useLanguage();

  const getGridCols = () => {
    if (gridSize === 2) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2';
    if (gridSize === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    if (gridSize === 9) return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  };

  return (
    <div className="flex flex-col h-full w-full">
        {/* Top Header / Toolbar */}
        <div className="h-14 bg-[#111111] border-b border-gray-800 flex items-center justify-between px-2 md:px-4 z-10 shrink-0">
           {/* Left: View Controls */}
           <div className="flex items-center gap-2">
              <button 
                onClick={onToggleSidebar}
                className={`p-2 rounded hover:bg-gray-800 text-gray-400 transition-colors ${isSidebarVisible ? 'text-blue-400' : ''}`}
                title="Toggle Sidebar"
              >
                <Menu size={20} />
              </button>
              <div className="h-6 w-px bg-gray-800 mx-1"></div>
              
              <span className="text-sm font-medium text-gray-400 mr-2 hidden lg:block">{t.views}</span>
              <div className="flex bg-gray-800 rounded p-1 gap-1">
                 <button 
                    onClick={() => setGridSize(2)}
                    className={`p-1 rounded transition-colors ${gridSize === 2 ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                 >
                    <Grid size={16} />
                 </button>
                 <button 
                    onClick={() => setGridSize(4)}
                    className={`p-1 rounded transition-colors ${gridSize === 4 ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                 >
                    <LayoutTemplate size={16} />
                 </button>
                 <button 
                    onClick={() => setGridSize(9)}
                    className={`p-1 rounded transition-colors ${gridSize === 9 ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                 >
                    <Layers size={16} />
                 </button>
              </div>
              <div className="h-4 w-px bg-gray-700 mx-2 hidden md:block"></div>
              <span className="text-sm font-semibold text-white truncate max-w-[100px] md:max-w-none">{t.defaultViewGroup}</span>
           </div>

           {/* Right: Search & Profile & Language */}
           <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden md:block">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                 <input 
                   type="text" 
                   placeholder={t.findCamera}
                   className="bg-[#050505] border border-gray-700 text-sm rounded-full pl-9 pr-4 py-1.5 w-48 lg:w-64 text-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 transition-all"
                 />
              </div>

              <LanguageSelector />
              
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={18} />
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111111]"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white border-2 border-[#111111] shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                AD
              </div>
           </div>
        </div>

        {/* Video Grid Area */}
        <div className="flex-1 bg-black p-0.5 overflow-y-auto md:overflow-hidden relative">
           <div className={`grid gap-0.5 w-full h-full min-h-[50vh] auto-rows-fr ${getGridCols()}`}>
              {CHANNELS.map(channel => (
                <VideoFeed key={channel.id} channel={channel} />
              ))}
           </div>
        </div>

        {/* Timeline Docker */}
        <Timeline />
    </div>
  );
};

export default LiveMatrix;
