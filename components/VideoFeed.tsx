import React from 'react';
import { Activity } from 'lucide-react';
import { Channel } from '../types';
import { useLanguage } from '../LanguageContext';

interface VideoFeedProps {
  channel: Channel;
}

const VideoFeed: React.FC<VideoFeedProps> = ({ channel }) => {
  const { t } = useLanguage();

  return (
    <div 
      className="relative w-full h-full bg-slate-900 group overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 transition-all"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 opacity-20 animate-pulse-slow"></div>
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
             backgroundSize: '20px 20px'
           }}>
      </div>

      {/* Top Overlay - Glassmorphism */}
      <div className="absolute top-0 left-0 right-0 p-1.5 md:p-2 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10">
        <div className="flex items-center gap-1.5 md:gap-2 pointer-events-auto min-w-0">
          <span className="shrink-0 text-[10px] md:text-xs font-mono text-white bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20">
            CH-{channel.id.toString().padStart(2, '0')}
          </span>
          <span className="text-sm md:text-base font-bold text-white drop-shadow-md truncate min-w-0 max-w-[80px] xs:max-w-[120px] md:max-w-[180px] lg:max-w-[140px] xl:max-w-[200px]">
            {channel.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5 pointer-events-auto shrink-0 ml-2">
           {channel.status === 'live' && (
             <div className="flex items-center gap-1.5 bg-red-500/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm transition-transform group-hover:scale-105">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
               <span className="text-[10px] md:text-xs font-black text-white whitespace-nowrap uppercase tracking-tight">{t.live}</span>
             </div>
           )}
           {channel.status === 'recording' && (
             <div className="flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm transition-transform group-hover:scale-105">
               <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_white]"></div>
               <span className="text-[10px] md:text-xs font-black text-white whitespace-nowrap uppercase tracking-tight">{t.rec}</span>
             </div>
           )}
           {channel.status === 'error' && (
             <div className="flex items-center gap-1.5 bg-amber-600/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm transition-transform group-hover:scale-105">
               <Activity size={10} className="text-white shrink-0" />
               <span className="text-[10px] md:text-xs font-black text-white whitespace-nowrap uppercase tracking-tight">{t.noSignal}</span>
             </div>
           )}
        </div>
      </div>

      {channel.status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-400 bg-black/20">
           <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/40 font-bold px-2 py-1 border border-white/10 rounded backdrop-blur-sm transition-all group-hover:text-white/60">
             {t.signalLost}
           </span>
        </div>
      )}

       {channel.status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
           <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white/10 border-t-blue-400 rounded-full animate-spin mb-2"></div>
           <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/50">{t.connecting}</span>
        </div>
      )}

      {/* Subtle scanline effect for surveillance feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0" style={{ backgroundSize: '100% 2px, 3px 100%' }}></div>
    </div>
  );
};

export default VideoFeed;