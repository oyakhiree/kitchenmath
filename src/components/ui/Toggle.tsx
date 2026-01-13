/**
 * Toggle Component
 * Reusable toggle switch
 */

import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    disabled?: boolean;
    size?: 'sm' | 'md';
}

const sizeClasses = {
    sm: {
        track: 'w-9 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-4',
    },
    md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
    },
};

export const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    label,
    description,
    disabled = false,
    size = 'md',
}) => {
    const sizes = sizeClasses[size];

    return (
        <label className={`inline-flex items-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`
          relative inline-flex shrink-0 ${sizes.track}
          items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
          ${checked ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-slate-700'}
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
            >
                <span
                    className={`
            ${sizes.thumb}
            rounded-full bg-white shadow-md
            transform transition-transform duration-200 ease-in-out
            ${checked ? sizes.translate : 'translate-x-0.5'}
          `}
                />
            </button>
            {(label || description) && (
                <div className="flex flex-col">
                    {label && (
                        <span className="text-sm font-medium text-slate-200">{label}</span>
                    )}
                    {description && (
                        <span className="text-xs text-slate-400 mt-0.5">{description}</span>
                    )}
                </div>
            )}
        </label>
    );
};

export default Toggle;
