import React from 'react';
import { SidebarItemProps } from '../types';

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, collapsed, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center cursor-pointer p-3 mb-1 transition-all duration-200 
    ${active 
      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500' 
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-gray-100 border-r-2 border-transparent'
    }`}>
    <Icon 
      size={20} 
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'} 
    />
    {!collapsed && <span className="ml-3 text-base font-semibold tracking-tight">{label}</span>}
  </div>
);

export default SidebarItem;