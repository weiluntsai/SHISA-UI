import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  RotateCcw, 
  RotateCw, 
  Pause, 
  Play,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Lock, 
  Download, 
  Bell, 
  ShieldCheck, 
  User, 
  Power, 
  Settings2, 
  Menu,
  Calendar
} from 'lucide-react';
import VideoFeed from './VideoFeed';
import Timeline from './Timeline';
import ProfileDropdown from './ProfileDropdown';
import DatePicker from './DatePicker';
import { CHANNELS } from '../constants';
import { useLanguage } from '../LanguageContext';
import { Channel } from '../types';

const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button 
    onClick={onChange}
    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none shadow-inner ${enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
  >
    <span className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5.5' : 'translate-x-1'}`} />
  </button>
);

interface PlaybackViewProps {
  onToggleSidebar?: () => void;
  isSidebarVisible?: boolean;
  channel: Channel;
  onChannelChange: (id: number) => void;
  onNavigateToLive?: () => void;
}

const PlaybackView: React.FC<PlaybackViewProps> = ({ onToggleSidebar, isSidebarVisible, channel, onChannelChange, onNavigateToLive }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'video' | 'info' | 'analytics'>('video');
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  
  const [recEnabled, setRecEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Playback State
  const [playbackPosition, setPlaybackPosition] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  // Date Picker State
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 14));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeInput, setTimeInput] = useState({ h: '11', m: '49', s: '15' });

  const formatDateValue = (date: Date) => {
      return `${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

  // Handle Playback Loop
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setPlaybackPosition(prev => {
          const next = prev + (0.01 * playbackSpeed);
          return next > 100 ? 0 : next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleRewind = () => {
    setPlaybackPosition(prev => Math.max(0, prev - 5));
  };

  const handleFastForward = () => {
    setPlaybackPosition(prev => Math.min(100, prev + 5));
  };

  const cycleSpeed = () => {
    const speeds = [1, 2, 4, 8];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIndex]);
  };

  // Common props for sharp icons
  const iconProps = { strokeLinecap: "square" as const, strokeLinejoin: "miter" as const };
  // Props for solid playback icons
  const solidIconProps = { ...iconProps, fill: "currentColor" };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-slate-950">
        {/* Playback Header */}
        <div className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-2 md:px-4 z-10 shrink-0 shadow-sm transition-colors duration-200">
           <div className="flex items-center gap-1 md:gap-2 text-base text-gray-500 dark:text-gray-400">
               <button 
                onClick={onToggleSidebar}
                className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 transition-colors ${isSidebarVisible ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                title="Toggle Sidebar"
               >
                <Menu size={20} {...iconProps} />
               </button>
               <div className="h-6 w-px bg-gray-200 dark:bg-slate-800 mx-1"></div>

               <span 
                onClick={onNavigateToLive}
                className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold cursor-pointer transition-colors hidden sm:block"
               >
                {t.liveMatrix}
               </span>
               <ChevronRight size={14} className="text-gray-300 dark:text-slate-700 hidden sm:block" {...iconProps} />
               <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors hidden xs:block">{t.newsChannels}</span>
               <ChevronRight size={14} className="text-gray-300 dark:text-slate-700 hidden xs:block" {...iconProps} />
               <div className="relative">
                <div 
                  onClick={() => setIsChannelDropdownOpen(!isChannelDropdownOpen)}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-sm"
                >
                    <span className="truncate max-w-[150px] md:max-w-none">{channel.name}</span>
                    <ChevronDown size={12} className={`transition-transform ${isChannelDropdownOpen ? 'rotate-180' : ''}`} {...iconProps} />
                </div>
                {isChannelDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded shadow-2xl z-50 py-2 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                    {CHANNELS.map(c => (
                      <div 
                        key={c.id} 
                        onClick={() => {
                          onChannelChange(c.id);
                          setIsChannelDropdownOpen(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${c.id === channel.id ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-300'}`}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>
                )}
               </div>
           </div>

           <div className="flex items-center gap-2 md:gap-4">
              <button className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                 <Bell size={18} {...iconProps} />
              </button>
              
              <ProfileDropdown />
           </div>
        </div>

        {/* Sub-Header / Tabs */}
        <div className="px-4 md:px-6 pt-4 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide transition-colors duration-200">
           <button 
              onClick={() => setActiveTab('video')}
              className={`${activeTab === 'video' ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200'} border-b-2 pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all`}
            >
              {t.video}
            </button>
           <button 
              onClick={() => setActiveTab('info')}
              className={`${activeTab === 'info' ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200'} border-b-2 pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all`}
            >
              {t.channelInfo}
            </button>
           <button 
              onClick={() => setActiveTab('analytics')}
              className={`${activeTab === 'analytics' ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-gray-200'} border-b-2 pb-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all`}
            >
              {t.analytics}
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden p-4 md:p-6 transition-colors duration-200">
            {activeTab === 'video' ? (
                <div className="w-full h-full max-w-6xl max-h-[75vh] bg-black border border-gray-200 dark:border-slate-800 relative shadow-2xl rounded-sm overflow-hidden ring-1 ring-black/5">
                    <VideoFeed channel={channel} />
                </div>
            ) : activeTab === 'info' ? (
                <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 shadow-sm">
                          <Settings2 size={24} {...iconProps} />
                       </div>
                       <div>
                          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">{t.channelInfo}</h2>
                          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Configure device parameters and ownership</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                                <Settings2 size={10} {...iconProps} /> {t.channelName}
                            </label>
                            <p className="text-gray-800 dark:text-gray-200 font-bold bg-gray-50 dark:bg-slate-800 p-2.5 rounded border border-gray-200 dark:border-slate-700">{channel.name}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                                <ShieldCheck size={10} {...iconProps} /> {t.role}
                            </label>
                            <p className="text-gray-800 dark:text-gray-200 font-bold bg-gray-50 dark:bg-slate-800 p-2.5 rounded border border-gray-200 dark:border-slate-700">{t.admin}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                                <User size={10} {...iconProps} /> {t.channelOwner}
                            </label>
                            <p className="text-gray-800 dark:text-gray-200 font-bold bg-gray-50 dark:bg-slate-800 p-2.5 rounded border border-gray-200 dark:border-slate-700">System Admin (Super)</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                                <Power size={10} {...iconProps} /> {t.recStatus}
                            </label>
                            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 p-2.5 rounded border border-emerald-100 dark:border-emerald-800">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                <p className="text-emerald-700 dark:text-emerald-400 font-black text-base">{t.recRunning}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 col-span-1 md:col-span-2 hover:bg-white dark:hover:bg-slate-750 hover:shadow-md transition-all">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800"><Download size={18} {...iconProps} /></div>
                               <div>
                                  <p className="text-base font-black text-gray-800 dark:text-gray-200">{t.recEnabled}</p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Automatic local backup enabled</p>
                               </div>
                           </div>
                           <ToggleSwitch enabled={recEnabled} onChange={() => setRecEnabled(!recEnabled)} />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded border border-gray-200 dark:border-slate-700 col-span-1 md:col-span-2 hover:bg-white dark:hover:bg-slate-750 hover:shadow-md transition-all">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800"><Bell size={18} {...iconProps} /></div>
                               <div>
                                  <p className="text-base font-black text-gray-800 dark:text-gray-200">{t.notifEnabled}</p>
                                  <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">AI motion detection alerts</p>
                               </div>
                           </div>
                           <ToggleSwitch enabled={notifEnabled} onChange={() => setNotifEnabled(!notifEnabled)} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-gray-400 dark:text-gray-600 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-100 dark:border-slate-700 flex items-center justify-center mb-4">
                        <ChevronDown className="text-blue-500 animate-bounce" {...iconProps} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-50">{t.analytics} Dashboard Coming Soon</span>
                </div>
            )}
        </div>

        {/* Footer Area with Playback Controls */}
        <div className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 shrink-0 shadow-lg transition-colors duration-200">
            {/* Timeline interacts with lifted state */}
            <Timeline 
              hideControls={true} 
              position={playbackPosition} 
              onPositionChange={setPlaybackPosition}
            /> 
            
            <div className="px-4 py-3 flex flex-col 2xl:flex-row items-center justify-between gap-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-950/30">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full 2xl:w-auto justify-between md:justify-center 2xl:justify-start">
                    {/* Date Picker Section */}
                    <div className="flex items-center gap-4 p-1 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-sm shrink-0">
                         <div className="relative">
                              <button 
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className={`flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-slate-700 rounded transition-all`}
                              >
                                 <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">{formatDateValue(selectedDate)}</span>
                                 <Calendar size={16} className="text-gray-400 dark:text-gray-500" {...iconProps} />
                              </button>
                              {showDatePicker && (
                                  <div className="absolute bottom-full left-0 mb-2 z-50">
                                    <DatePicker 
                                        selectedDate={selectedDate} 
                                        onChange={(d) => { setSelectedDate(d); setShowDatePicker(false); }} 
                                        onClose={() => setShowDatePicker(false)} 
                                    />
                                  </div>
                              )}
                         </div>
                         
                         <div className="h-5 w-px bg-gray-200 dark:bg-slate-700"></div>

                         <div className="flex items-center gap-1 px-2">
                              <input type="text" value={timeInput.h} onChange={(e) => setTimeInput({...timeInput, h: e.target.value})} className="w-7 h-7 text-center text-lg font-mono font-bold text-blue-600 dark:text-blue-400 bg-transparent focus:outline-none focus:bg-gray-100 dark:focus:bg-slate-700 rounded" />
                              <span className="text-gray-300 font-bold">:</span>
                              <input type="text" value={timeInput.m} onChange={(e) => setTimeInput({...timeInput, m: e.target.value})} className="w-7 h-7 text-center text-lg font-mono font-bold text-blue-600 dark:text-blue-400 bg-transparent focus:outline-none focus:bg-gray-100 dark:focus:bg-slate-700 rounded" />
                              <span className="text-gray-300 font-bold">:</span>
                              <input type="text" value={timeInput.s} onChange={(e) => setTimeInput({...timeInput, s: e.target.value})} className="w-7 h-7 text-center text-lg font-mono font-bold text-blue-600 dark:text-blue-400 bg-transparent focus:outline-none focus:bg-gray-100 dark:focus:bg-slate-700 rounded" />
                         </div>
                    </div>

                    <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-slate-700 mx-2"></div>

                    {/* Main Playback Controls Group */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1 md:gap-3 bg-white dark:bg-slate-800 px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm">
                            <button 
                              onClick={() => setPlaybackPosition(0)}
                              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
                              title="Start"
                            >
                              <SkipBack size={18} {...solidIconProps} strokeWidth={2} />
                            </button>
                            <button 
                              onClick={handleRewind}
                              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
                              title="Rewind"
                            >
                              <Rewind size={18} {...solidIconProps} strokeWidth={0} />
                            </button>
                            
                            <button 
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all active:scale-90 border-2 border-blue-500"
                            >
                              {isPlaying ? <Pause size={24} {...solidIconProps} strokeWidth={0} /> : <Play size={24} {...solidIconProps} className="ml-1" strokeWidth={0} />}
                            </button>

                            <button 
                              onClick={handleFastForward}
                              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 transition-colors"
                              title="Fast Forward"
                            >
                              <FastForward size={18} {...solidIconProps} strokeWidth={0} />
                            </button>
                            <button 
                              onClick={() => setPlaybackPosition(100)}
                              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
                              title="End"
                            >
                              <SkipForward size={18} {...solidIconProps} strokeWidth={2} />
                            </button>
                        </div>
                        
                        <div className="flex flex-col items-center">
                           <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-black mb-1">{t.speed}</span>
                           <button 
                            onClick={cycleSpeed}
                            className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-xs font-black font-mono shadow-sm transition-all"
                           >
                              {playbackSpeed.toFixed(1)}X <ChevronDown size={10} {...iconProps} />
                           </button>
                        </div>
                    </div>
                </div>

                {/* Secondary Controls (Time, Export) */}
                <div className="flex-1 w-full 2xl:px-8 flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center 2xl:justify-end">
                    
                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded border border-gray-200 dark:border-slate-700 shadow-sm w-full md:w-auto group">
                            <div className="flex items-center gap-2 px-2 border-r border-gray-100 dark:border-slate-700">
                                <Lock size={12} className="text-blue-400" {...iconProps} />
                                <span className="text-xs uppercase text-gray-400 dark:text-gray-500 font-black tracking-widest">{t.start}</span>
                            </div>
                            <input type="text" defaultValue="2025/12/14 00:00:00" className="bg-transparent border-none text-sm font-mono font-bold text-gray-800 dark:text-gray-200 w-full md:w-36 px-2 focus:outline-none" />
                        </div>
                        
                        <span className="text-gray-300 dark:text-slate-600 font-light hidden sm:block">-</span>

                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded border border-gray-200 dark:border-slate-700 shadow-sm w-full md:w-auto group">
                            <div className="flex items-center gap-2 px-2 border-r border-gray-100 dark:border-slate-700">
                                <Lock size={12} className="text-blue-400" {...iconProps} />
                                <span className="text-xs uppercase text-gray-400 dark:text-gray-500 font-black tracking-widest">{t.end}</span>
                            </div>
                            <input type="text" defaultValue="2025/12/14 23:59:59" className="bg-transparent border-none text-sm font-mono font-bold text-gray-800 dark:text-gray-200 w-full md:w-36 px-2 focus:outline-none" />
                        </div>
                    </div>

                    <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2 hidden lg:block"></div>

                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 text-sm font-black rounded border border-gray-300 dark:border-slate-600 transition-all shadow-sm active:shadow-inner active:scale-95">
                       <Download size={14} className="text-blue-600 dark:text-blue-400" {...iconProps} />
                       <span>{t.exportClip}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PlaybackView;