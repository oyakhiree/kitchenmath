/**
 * Select Component v2.0
 * Modern dropdown with larger touch targets
 */

import React, { forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
        const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={`
              w-full px-4 py-3 pr-12 min-h-[48px]
              bg-slate-800/60 border-2 border-slate-700/80 
              text-white text-base
              hover:border-slate-600
              focus:outline-none focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/20
              transition-all duration-200 rounded-xl
              appearance-none cursor-pointer
              ${error ? 'border-[#F44336] focus:border-[#F44336] focus:ring-[#F44336]/20' : ''}
              ${className}
            `}
                        {...props}
                    >
                        {placeholder && (
                            <option key="__placeholder__" value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className="bg-slate-800">
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {error && (
                    <p className="mt-2 text-xs text-[#F44336] flex items-center gap-1 font-medium">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
