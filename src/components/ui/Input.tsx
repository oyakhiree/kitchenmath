/**
 * Input Component
 * Reusable input with label and error handling
 */

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, leftAddon, rightAddon, className = '', id, ...props }, ref) => {
        const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-medium text-slate-300 mb-1.5"
                    >
                        {label}
                    </label>
                )}
                <div className="relative flex items-stretch">
                    {leftAddon && (
                        <div className="flex items-center px-3 bg-slate-800/50 border border-r-0 border-slate-700 rounded-l-xl text-slate-400 text-sm">
                            {leftAddon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full px-4 py-2.5 
              bg-slate-800/50 border border-slate-700 
              text-white placeholder-slate-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
              transition-all duration-200
              ${leftAddon ? '' : 'rounded-l-xl'}
              ${rightAddon ? '' : 'rounded-r-xl'}
              ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
              ${className}
            `}
                        {...props}
                    />
                    {rightAddon && (
                        <div className="flex items-center px-3 bg-slate-800/50 border border-l-0 border-slate-700 rounded-r-xl text-slate-400 text-sm">
                            {rightAddon}
                        </div>
                    )}
                </div>
                {hint && !error && (
                    <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
                )}
                {error && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
