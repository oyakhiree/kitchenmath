/**
 * Slider Component v2.0
 * Modern range slider with visual feedback
 */

import React, { forwardRef, useMemo } from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    showValue?: boolean;
    valueFormatter?: (value: number) => string;
    marks?: { value: number; label: string }[];
    color?: 'primary' | 'success' | 'warning' | 'danger';
}

const colorConfig = {
    primary: {
        gradient: 'from-[#FF6B35] to-[#F4511E]',
        thumb: 'bg-gradient-to-br from-[#FF6B35] to-[#F4511E]',
        shadow: 'shadow-[#FF6B35]/40',
    },
    success: {
        gradient: 'from-[#66BB6A] to-[#4CAF50]',
        thumb: 'bg-gradient-to-br from-[#66BB6A] to-[#4CAF50]',
        shadow: 'shadow-[#4CAF50]/40',
    },
    warning: {
        gradient: 'from-[#FFB74D] to-[#FF9800]',
        thumb: 'bg-gradient-to-br from-[#FFB74D] to-[#FF9800]',
        shadow: 'shadow-[#FF9800]/40',
    },
    danger: {
        gradient: 'from-[#EF5350] to-[#F44336]',
        thumb: 'bg-gradient-to-br from-[#EF5350] to-[#F44336]',
        shadow: 'shadow-[#F44336]/40',
    },
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
    (
        {
            label,
            showValue = true,
            valueFormatter = (v) => `${v}%`,
            marks,
            color = 'primary',
            className = '',
            value,
            min = 0,
            max = 100,
            ...props
        },
        ref
    ) => {
        const currentValue = typeof value === 'number' ? value : Number(value) || 0;
        const percentage = ((currentValue - Number(min)) / (Number(max) - Number(min))) * 100;
        const colors = colorConfig[color];

        const gradientStyle = useMemo(() => ({
            background: `linear-gradient(to right, 
        ${color === 'primary' ? '#FF6B35' : color === 'success' ? '#4CAF50' : color === 'warning' ? '#FF9800' : '#F44336'} 0%, 
        ${color === 'primary' ? '#F4511E' : color === 'success' ? '#43A047' : color === 'warning' ? '#F57C00' : '#E53935'} ${percentage}%, 
        #334155 ${percentage}%)`,
        }), [percentage, color]);

        return (
            <div className="w-full">
                {(label || showValue) && (
                    <div className="flex items-center justify-between mb-3">
                        {label && (
                            <label className="text-sm font-semibold text-slate-300">{label}</label>
                        )}
                        {showValue && (
                            <span className={`text-sm font-bold ${color === 'primary' ? 'text-[#FF6B35]' :
                                    color === 'success' ? 'text-[#4CAF50]' :
                                        color === 'warning' ? 'text-[#FF9800]' : 'text-[#F44336]'
                                }`}>
                                {valueFormatter(currentValue)}
                            </span>
                        )}
                    </div>
                )}
                <div className="relative py-2">
                    <input
                        ref={ref}
                        type="range"
                        value={value}
                        min={min}
                        max={max}
                        className={`
              w-full h-2 appearance-none cursor-pointer rounded-full
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-6
              [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:${colors.thumb}
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:${colors.shadow}
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white/20
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:active:scale-95
              [&::-moz-range-thumb]:w-6
              [&::-moz-range-thumb]:h-6
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-[#FF6B35]
              [&::-moz-range-thumb]:border-0
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50
              ${className}
            `}
                        style={gradientStyle}
                        {...props}
                    />
                </div>
                {marks && (
                    <div className="flex justify-between mt-2 px-1">
                        {marks.map((mark) => (
                            <span
                                key={mark.value}
                                className={`text-xs font-medium transition-colors ${currentValue >= mark.value ? 'text-slate-300' : 'text-slate-600'
                                    }`}
                            >
                                {mark.label}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

Slider.displayName = 'Slider';

export default Slider;
