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
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/50">
            <p className="text-base font-bold text-gray-900 dark:text-gray-100">Admin User</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">admin@shisa.io</p>
          </div>
          
          <div className="p-2">
            <button 
              onClick={toggleLanguage}
              className="w-full flex items-center justify-between px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>Language</span>
              </div>
              <span className="text-sm font-bold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                {language === 'en' ? 'EN' : '中文'}
              </span>
            </button>

            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all shadow-sm ${theme === 'dark' ? 'left-4.5' : 'left-0.5'}`}></div>
              </div>
            </button>

            <button className="w-full flex items-center gap-2 px-3 py-2 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            
            <div className="h-px bg-gray-100 dark:bg-slate-800 my-1"></div>

            <button className="w-full flex items-center gap-2 px-3 py-2 text-base text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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