import React, { useRef, useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import DatePicker from './DatePicker';

interface TimelineProps {
  hideControls?: boolean;
  position: number;
  onPositionChange: (position: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ hideControls = false, position, onPositionChange }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Date and Time State
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 11, 14));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeInput, setTimeInput] = useState({ h: '11', m: '49', s: '15' });

  const updatePosition = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onPositionChange(percentage);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    updatePosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDraggingRef.current) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        updatePosition(e.clientX);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Calculate current time based on position for the label
  const totalMinutes = 24 * 60;
  const currentMinutes = (position / 100) * totalMinutes;
  const h = Math.floor(currentMinutes / 60);
  const m = Math.floor(currentMinutes % 60);
  const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const formatDateValue = (date: Date) => {
      return `${date.getFullYear()}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };
  
  const iconProps = { strokeLinecap: "square" as const, strokeLinejoin: "miter" as const };

  return (
    <div className={`flex flex-col select-none shrink-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-200 ${hideControls ? 'h-16' : 'h-24'}`}>
      {!hideControls && (
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900">
           <div className="flex items-center gap-4">
              {/* Date Picker Section */}
              <div className="relative">
                  <button 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className={`flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border rounded transition-all
                        ${showDatePicker ? 'border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/30' : 'border-gray-300 dark:border-slate-600 hover:border-blue-400'}
                    `}
                  >
                     <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400">{formatDateValue(selectedDate)}</span>
                     <Calendar size={16} className="text-gray-400 dark:text-gray-500" {...iconProps} />
                  </button>
                  {showDatePicker && (
                      <DatePicker 
                        selectedDate={selectedDate} 
                        onChange={handleDateChange} 
                        onClose={() => setShowDatePicker(false)} 
                      />
                  )}
              </div>

              {/* Time Input Section */}
              <div className="flex items-center gap-1 hidden sm:flex">
                  <input 
                    type="text" 
                    value={timeInput.h}
                    onChange={(e) => setTimeInput({...timeInput, h: e.target.value})}
                    className="w-9 h-8 text-center text-lg font-mono font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-gray-400 font-bold">:</span>
                  <input 
                    type="text" 
                    value={timeInput.m}
                    onChange={(e) => setTimeInput({...timeInput, m: e.target.value})}
                    className="w-9 h-8 text-center text-lg font-mono font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-gray-400 font-bold">:</span>
                  <input 
                    type="text" 
                    value={timeInput.s}
                    onChange={(e) => setTimeInput({...timeInput, s: e.target.value})}
                    className="w-9 h-8 text-center text-lg font-mono font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
              </div>

              <div className="h-4 w-px bg-gray-300 dark:bg-slate-700 mx-1 hidden sm:block"></div>

              {/* Playback Controls */}
              <div className="flex gap-2">
                 <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><ChevronLeft size={20} {...iconProps} /></button>
                 <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"><Play size={20} fill="currentColor" {...iconProps} /></button>
                 <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><ChevronRight size={20} {...iconProps} /></button>
              </div>

              <div className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 hidden sm:block tracking-widest ml-2">
                {t.speed} 1X
              </div>
           </div>
           
           <div className="flex gap-2">
              <button className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">1H</button>
              <button className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition-colors">24H</button>
           </div>
        </div>
      )}

      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex-1 relative overflow-hidden cursor-ew-resize group bg-gray-50/20 dark:bg-slate-900/50 touch-none"
      >
        {/* Interactive Cursor */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-30 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-shadow duration-150 pointer-events-none"
          style={{ left: `${position}%` }}
        >
           <div className="absolute top-0 -translate-x-1/2 -mt-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-blue-500"></div>
           <div className="absolute top-4 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold px-1 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
             {timeString}
           </div>
        </div>

        <div className="absolute inset-0 flex items-end pointer-events-none">
           {hours.map(hour => (
             <div key={hour} className="flex-1 flex flex-col items-start h-full justify-end border-l border-gray-100 dark:border-slate-800 relative group-hover:border-gray-200/50 dark:group-hover:border-slate-700/50 transition-colors">
                {/* Recording Blocks - Randomly placed for demo effect */}
                {hour >= 8 && hour <= 20 && (
                  <div className="absolute bottom-4 left-0 right-0 h-3 bg-emerald-500/80 group-hover:opacity-100 transition-opacity"></div>
                )}
                {hour % 4 === 0 && (
                  <div className="absolute bottom-4 left-0 right-1/2 h-3 bg-blue-400/30"></div>
                )}
                
                <span className={`text-xs text-gray-500 dark:text-white font-mono ml-1 mb-2 font-bold select-none ${hour % 3 !== 0 ? 'hidden md:block' : ''}`}>
                    {hour.toString().padStart(2, '0')}:00
                </span>
                <div className="h-2 w-px bg-gray-300 dark:bg-slate-700"></div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;