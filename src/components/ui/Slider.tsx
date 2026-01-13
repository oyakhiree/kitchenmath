/**
 * Slider Component
 * Reusable range slider with label
 */

import React, { forwardRef } from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    showValue?: boolean;
    valueFormatter?: (value: number) => string;
    marks?: { value: number; label: string }[];
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
    (
        {
            label,
            showValue = true,
            valueFormatter = (v) => `${v}%`,
            marks,
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

        return (
            <div className="w-full">
                {(label || showValue) && (
                    <div className="flex items-center justify-between mb-2">
                        {label && (
                            <label className="text-sm font-medium text-slate-300">{label}</label>
                        )}
                        {showValue && (
                            <span className="text-sm font-semibold text-emerald-400">
                                {valueFormatter(currentValue)}
                            </span>
                        )}
                    </div>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        type="range"
                        value={value}
                        min={min}
                        max={max}
                        className={`
              w-full h-2 appearance-none cursor-pointer rounded-full
              bg-slate-700
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-emerald-400
              [&::-webkit-slider-thumb]:to-teal-400
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-emerald-500/30
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white/20
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:duration-150
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-emerald-500
              [&::-moz-range-thumb]:border-0
              focus:outline-none
              ${className}
            `}
                        style={{
                            background: `linear-gradient(to right, #10b981 0%, #14b8a6 ${percentage}%, #334155 ${percentage}%)`,
                        }}
                        {...props}
                    />
                </div>
                {marks && (
                    <div className="flex justify-between mt-1.5 px-1">
                        {marks.map((mark) => (
                            <span
                                key={mark.value}
                                className="text-xs text-slate-500"
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
