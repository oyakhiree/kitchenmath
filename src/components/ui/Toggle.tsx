/**
 * Toggle Component v2.0 (Light Theme)
 * Modern toggle switch with smooth animations
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
        track: 'w-10 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-4',
    },
    md: {
        track: 'w-12 h-7',
        thumb: 'w-6 h-6',
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
        <label className={`inline-flex items-start gap-4 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`
          relative inline-flex shrink-0 ${sizes.track}
          items-center rounded-full
          transition-all duration-200 ease-out
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white
          ${checked
                        ? 'bg-gradient-to-r from-[#FF6B35] to-[#F4511E] shadow-lg shadow-[#FF6B35]/20'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
            >
                <span
                    className={`
            ${sizes.thumb}
            rounded-full bg-white shadow-md
            transform transition-all duration-200 ease-out
            ${checked ? sizes.translate : 'translate-x-0.5'}
            ${checked ? 'shadow-lg' : ''}
          `}
                />
            </button>
            {(label || description) && (
                <div className="flex flex-col pt-0.5">
                    {label && (
                        <span className="text-sm font-semibold text-gray-800">{label}</span>
                    )}
                    {description && (
                        <span className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</span>
                    )}
                </div>
            )}
        </label>
    );
};

export default Toggle;
