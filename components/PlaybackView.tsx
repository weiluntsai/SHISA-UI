
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, RotateCcw, RotateCw, Pause, Lock, Download, Bell, ShieldCheck, User, Power, Settings2, Menu } from 'lucide-react';
import VideoFeed from './VideoFeed';
import Timeline from './Timeline';
import LanguageSelector from './LanguageSelector';
import { CHANNELS } from '../constants';
import { useLanguage } from '../LanguageContext';

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-700'}`}
  >
    <span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5.5' : 'translate-x-1'}`} />
  </button>
);

interface PlaybackViewProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
}

const PlaybackView: React.FC<PlaybackViewProps> = ({ onToggleSidebar, isSidebarVisible }) => {
  const activeChannel = CHANNELS[0];
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'video' | 'info' | 'analytics'>('video');
  
  const [recEnabled, setRecEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);

  return (
    <div className="flex flex-col h-full w-full bg-[#0a0a0a]">
        {/* Playback Header */}
        <div className="h-14 bg-[#111111] border-b border-gray-800 flex items-center justify-between px-2 md:px-4 z-10 shrink-0">
           <div className="flex items-center gap-1 md:gap-2 text-sm text-gray-400">
               <button 
                onClick={onToggleSidebar}
                className={`p-2 rounded hover:bg-gray-800 text-gray-400 transition-colors ${isSidebarVisible ? 'text-blue-400' : ''}`}
                title="Toggle Sidebar"
               >
                <Menu size={20} />
               </button>
               <div className="h-6 w-px bg-gray-800 mx-1"></div>

               <span className="hover:text-white cursor-pointer transition-colors hidden sm:block">{t.shisaCloud}</span>
               <ChevronRight size={14} className="text-gray-600 hidden sm:block" />
               <span className="hover:text-white cursor-pointer transition-colors hidden xs:block">{t.newsChannels}</span>
               <ChevronRight size={14} className="text-gray-600 hidden xs:block" />
               <div className="flex items-center gap-1 text-white font-medium bg-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 transition-colors">
                  <span className="truncate max-w-[150px] md:max-w-none">{activeChannel.name}</span>
                  <ChevronDown size={12} />
               </div>
           </div>

           <div className="flex items-center gap-2 md:gap-4">
              <LanguageSelector />

              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white border-2 border-[#111111] shadow-sm">
                AD
              </div>
           </div>
        </div>

        {/* Sub-Header / Tabs */}
        <div className="px-4 md:px-6 pt-4 border-b border-gray-800 bg-[#111111] flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
           <button 
              onClick={() => setActiveTab('video')}
              className={`${activeTab === 'video' ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-white'} border-b-2 pb-3 text-sm font-medium tracking-wide whitespace-nowrap transition-all`}
            >
              {t.video}
            </button>
           <button 
              onClick={() => setActiveTab('info')}
              className={`${activeTab === 'info' ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-white'} border-b-2 pb-3 text-sm font-medium tracking-wide whitespace-nowrap transition-all`}
            >
              {t.channelInfo}
            </button>
           <button 
              onClick={() => setActiveTab('analytics')}
              className={`${activeTab === 'analytics' ? 'text-blue-400 border-blue-400' : 'text-gray-400 border-transparent hover:text-white'} border-b-2 pb-3 text-sm font-medium tracking-wide whitespace-nowrap transition-all`}
            >
              {t.analytics}
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#050505] flex flex-col items-center justify-center overflow-hidden p-4 md:p-6">
            {activeTab === 'video' ? (
                <div className="w-full h-full max-w-6xl max-h-[75vh] bg-black border border-gray-800 relative shadow-2xl rounded-sm overflow-hidden ring-1 ring-white/5">
                    <VideoFeed channel={activeChannel} />
                </div>
            ) : activeTab === 'info' ? (
                <div className="w-full max-w-2xl bg-[#111111] rounded-lg border border-gray-800 shadow-xl overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="p-3 bg-blue-600/20 rounded-full text-blue-400">
                          <Settings2 size={24} />
                       </div>
                       <div>
                          <h2 className="text-xl font-bold text-white">{t.channelInfo}</h2>
                          <p className="text-sm text-gray-500">Configure device parameters and ownership</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1.5">
                                <Settings2 size={10} /> {t.channelName}
                            </label>
                            <p className="text-white font-medium bg-gray-900/50 p-2.5 rounded border border-gray-800">{activeChannel.name}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1.5">
                                <ShieldCheck size={10} /> {t.role}
                            </label>
                            <p className="text-white font-medium bg-gray-900/50 p-2.5 rounded border border-gray-800">{t.admin}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1.5">
                                <User size={10} /> {t.channelOwner}
                            </label>
                            <p className="text-white font-medium bg-gray-900/50 p-2.5 rounded border border-gray-800">System Admin (Super)</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1.5">
                                <Power size={10} /> {t.recStatus}
                            </label>
                            <div className="flex items-center gap-2 bg-gray-900/50 p-2.5 rounded border border-gray-800">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-green-400 font-bold">{t.recRunning}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded border border-gray-800 col-span-1 md:col-span-2 hover:bg-gray-900/50 transition-colors">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-blue-500/10 rounded text-blue-400"><Download size={18}/></div>
                               <div>
                                  <p className="text-sm font-medium text-white">{t.recEnabled}</p>
                                  <p className="text-[10px] text-gray-500">Enable automatic local backup of stream</p>
                               </div>
                           </div>
                           <ToggleSwitch enabled={recEnabled} onChange={() => setRecEnabled(!recEnabled)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded border border-gray-800 col-span-1 md:col-span-2 hover:bg-gray-900/50 transition-colors">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-yellow-500/10 rounded text-yellow-400"><Bell size={18}/></div>
                               <div>
                                  <p className="text-sm font-medium text-white">{t.notifEnabled}</p>
                                  <p className="text-[10px] text-gray-500">Send push alerts on AI motion detection</p>
                               </div>
                           </div>
                           <ToggleSwitch enabled={notifEnabled} onChange={() => setNotifEnabled(!notifEnabled)} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-500 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                        <ChevronDown className="text-gray-400 animate-bounce" />
                    </div>
                    <span className="text-sm uppercase tracking-widest opacity-50">{t.analytics} Dashboard Coming Soon</span>
                </div>
            )}
        </div>

        {/* Footer Area */}
        <div className="bg-[#111111] border-t border-gray-800 shrink-0">
            <Timeline hideControls={true} /> 
            
            <div className="px-4 py-3 flex flex-col lg:flex-row items-center justify-between gap-4 border-t border-gray-800 bg-[#0e0e0e]">
                <div className="flex items-center gap-4 w-full lg:w-auto justify-between md:justify-center lg:justify-start">
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"><RotateCcw size={16} /></button>
                        <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition-all active:scale-95">
                            <Pause size={18} fill="currentColor" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-colors"><RotateCw size={16} /></button>
                    </div>
                    
                    <div className="h-8 w-px bg-gray-800 mx-2 hidden md:block"></div>

                    <div className="flex flex-col items-start">
                       <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{t.speed}</span>
                       <button className="flex items-center gap-1 text-gray-300 hover:text-white text-xs font-mono mt-0.5">
                          1.0X <ChevronDown size={10} />
                       </button>
                    </div>
                </div>

                <div className="flex-1 w-full lg:px-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center lg:justify-end">
                    
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                        <div className="flex items-center gap-2 bg-[#050505] p-1 rounded border border-gray-700 shadow-inner w-full md:w-auto">
                            <div className="flex items-center gap-2 px-2 border-r border-gray-800 py-1">
                                <Lock size={12} className="text-gray-500" />
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{t.start}</span>
                            </div>
                            <input type="text" defaultValue="2025/12/03 12:16:00" className="bg-transparent border-none text-xs font-mono text-blue-400 w-full md:w-36 px-2 focus:outline-none" />
                        </div>
                        
                        <span className="text-gray-600 font-light hidden sm:block">-</span>

                        <div className="flex items-center gap-2 bg-[#050505] p-1 rounded border border-gray-700 shadow-inner w-full md:w-auto">
                            <div className="flex items-center gap-2 px-2 border-r border-gray-800 py-1">
                                <Lock size={12} className="text-gray-500" />
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">{t.end}</span>
                            </div>
                            <input type="text" defaultValue="2025/12/03 12:16:00" className="bg-transparent border-none text-xs font-mono text-blue-400 w-full md:w-36 px-2 focus:outline-none" />
                        </div>
                    </div>

                    <div className="h-6 w-px bg-gray-800 mx-2 hidden lg:block"></div>

                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium rounded border border-gray-600 transition-all shadow-sm active:bg-gray-600">
                       <Download size={14} />
                       <span>{t.exportClip}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PlaybackView;
