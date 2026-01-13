/**
 * Accordion Component
 * Collapsible accordion panel
 */

import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    subtitle?: string;
    defaultOpen?: boolean;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
    title,
    subtitle,
    defaultOpen = false,
    icon,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-800/30">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors duration-150"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h4 className="text-sm font-semibold text-white">{title}</h4>
                        {subtitle && (
                            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
                        )}
                    </div>
                </div>
                <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="p-4 pt-0 border-t border-slate-700/30">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
