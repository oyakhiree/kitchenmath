/**
 * Accordion Component v2.0
 * Smooth collapsible panel with improved animations
 */

import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    subtitle?: string;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    badge?: string;
    children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
    title,
    subtitle,
    defaultOpen = false,
    icon,
    badge,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`
      border border-slate-700/60 rounded-2xl overflow-hidden 
      bg-slate-800/40 backdrop-blur-sm
      transition-all duration-200
      ${isOpen ? 'border-slate-600/80 shadow-lg' : 'hover:border-slate-600/60'}
    `}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-slate-700/30 transition-colors duration-150"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className={`
              p-2.5 rounded-xl transition-colors duration-200
              ${isOpen
                                ? 'bg-gradient-to-br from-[#FF6B35]/20 to-[#F4511E]/10 text-[#FF6B35]'
                                : 'bg-slate-700/60 text-slate-400'
                            }
            `}>
                            {icon}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{title}</h4>
                            {badge && (
                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#FF6B35]/20 text-[#FF6B35]">
                                    {badge}
                                </span>
                            )}
                        </div>
                        {subtitle && (
                            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                </div>
                <div className={`
          p-1.5 rounded-lg transition-all duration-200
          ${isOpen ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'text-slate-400'}
        `}>
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            <div
                className={`
          grid transition-all duration-300 ease-out
          ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}
            >
                <div className="overflow-hidden">
                    <div className="p-4 md:p-5 pt-0 border-t border-slate-700/40">
                        <div className="pt-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
