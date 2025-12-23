import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Language } from '../types';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { value: Language; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'zh', label: '中文' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-[10px] font-black transition-all border border-gray-200 shadow-sm"
      >
        <Globe size={14} className="text-blue-500" />
        <span>{language.toUpperCase()}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/5">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setLanguage(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center justify-between
                ${language === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              {option.label}
              {language === option.value && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm"></div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;