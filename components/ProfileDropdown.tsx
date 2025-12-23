import React, { useState, useRef, useEffect } from 'react';
import { User, Moon, Sun, LogOut, Settings, Globe } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white border border-gray-200 dark:border-slate-700 shadow-sm cursor-pointer hover:shadow-md transition-all select-none"
      >
        AD
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/50">
            <p className="text-base font-black text-gray-900 dark:text-gray-100">Admin User</p>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 truncate">admin@shisa.io</p>
          </div>
          
          <div className="p-1.5">
            <button 
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe size={16} className="text-blue-500" />
                <span>Language</span>
              </div>
              <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800/50">
                {language === 'en' ? 'EN' : '中文'}
              </span>
            </button>

            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {theme === 'light' ? <Moon size={16} className="text-indigo-500" /> : <Sun size={16} className="text-amber-500" />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className={`w-8 h-4.5 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all shadow-sm ${theme === 'dark' ? 'left-4' : 'left-0.5'}`}></div>
              </div>
            </button>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Settings size={16} className="text-gray-400" />
              <span>Settings</span>
            </button>
            
            <div className="h-px bg-gray-100 dark:bg-slate-800 my-1 mx-1"></div>

            <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;