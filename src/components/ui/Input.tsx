/**
 * Input Component v2.0 (Light Theme)
 * Food delivery industry standard design with large touch targets
 */

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'flush';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, leftAddon, rightAddon, variant = 'default', className = '', id, ...props }, ref) => {
        const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

        const variantClasses = {
            default: `
        bg-white border-2 border-gray-200
        focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10
        hover:border-gray-300
      `,
            filled: `
        bg-gray-50 border-2 border-transparent
        focus:border-[#FF6B35] focus:ring-2 focus:ring-[#FF6B35]/10
        hover:bg-gray-100
      `,
            flush: `
        bg-transparent border-0 border-b-2 border-gray-200
        focus:border-[#FF6B35] rounded-none
        hover:border-gray-300
      `,
        };

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        {label}
                    </label>
                )}
                <div className="relative flex items-stretch">
                    {leftAddon && (
                        <div className="flex items-center px-4 bg-gray-50 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm font-medium min-w-[48px] justify-center">
                            {leftAddon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={`
              w-full px-4 py-3 min-h-[48px]
              text-gray-900 text-base placeholder-gray-400
              focus:outline-none
              transition-all duration-200
              ${leftAddon ? '' : 'rounded-l-xl'}
              ${rightAddon ? '' : 'rounded-r-xl'}
              ${error ? 'border-[#F44336] focus:border-[#F44336] focus:ring-[#F44336]/10' : ''}
              ${variantClasses[variant]}
              ${className}
            `}
                        {...props}
                    />
                    {rightAddon && (
                        <div className="flex items-center px-4 bg-gray-50 border-2 border-l-0 border-gray-200 rounded-r-xl text-gray-500 text-sm font-medium min-w-[48px] justify-center">
                            {rightAddon}
                        </div>
                    )}
                </div>
                {hint && !error && (
                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {hint}
                    </p>
                )}
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

Input.displayName = 'Input';

export default Input;
