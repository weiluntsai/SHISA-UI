import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onChange, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onChange(newDate);
    onClose();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  // Formatting for header (e.g., "十二月 2025")
  const formatMonthYear = (date: Date) => {
    try {
        return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long' }).format(date);
    } catch (e) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    }
  };

  return (
    <div ref={containerRef} className="absolute bottom-full left-0 mb-2 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 p-4 z-50 w-72 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-gray-800 dark:text-gray-100 text-base">
             {formatMonthYear(currentMonth)}
        </span>
        <div className="flex gap-1">
          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 dark:text-gray-400">
            <ChevronLeft size={18} />
          </button>
          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full text-gray-500 dark:text-gray-400">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {['日', '一', '二', '三', '四', '五', '六'].map(d => (
          <div key={d} className="text-xs text-gray-400 font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {blanks.map(i => <div key={`blank-${i}`} />)}
        {days.map(day => {
            const isSelected = 
                selectedDate.getDate() === day && 
                selectedDate.getMonth() === currentMonth.getMonth() && 
                selectedDate.getFullYear() === currentMonth.getFullYear();
            
            return (
                <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-all
                        ${isSelected 
                            ? 'bg-blue-600 text-white font-bold shadow-md' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}
                    `}
                >
                    {day}
                </button>
            )
        })}
      </div>
    </div>
  );
};

export default DatePicker;