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
      className="relative w-full h-full bg-slate-900 group overflow-hidden border border-gray-200 hover:border-blue-400 transition-all"
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
      <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-xs font-mono text-white bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/20">
            CH-{channel.id.toString().padStart(2, '0')}
          </span>
          <span className="text-base font-bold text-white drop-shadow-md truncate max-w-[120px] md:max-w-[200px]">
            {channel.name}
          </span>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
           {channel.status === 'live' && (
             <div className="flex items-center gap-1.5 bg-red-500/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
               <span className="text-xs font-black text-white">{t.live}</span>
             </div>
           )}
           {channel.status === 'recording' && (
             <div className="flex items-center gap-1.5 bg-blue-500/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
               <span className="text-xs font-black text-white">{t.rec}</span>
             </div>
           )}
           {channel.status === 'error' && (
             <div className="flex items-center gap-1.5 bg-amber-500/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
               <Activity size={10} className="text-white" />
               <span className="text-xs font-black text-white">{t.noSignal}</span>
             </div>
           )}
        </div>
      </div>

      {channel.status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-400">
           <Activity size={32} className="mb-2 opacity-30" />
           <span className="text-xs font-mono uppercase tracking-widest text-white/50">{t.signalLost}</span>
        </div>
      )}
       {channel.status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
           <div className="w-8 h-8 border-2 border-white/10 border-t-blue-400 rounded-full animate-spin mb-2"></div>
           <span className="text-xs font-mono uppercase tracking-widest text-white/50">{t.connecting}</span>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;