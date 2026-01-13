/**
 * Slider Component v2.0 (Light Theme)
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
        start: '#FF6B35',
        end: '#F4511E',
        text: 'text-[#FF6B35]',
    },
    success: {
        start: '#66BB6A',
        end: '#4CAF50',
        text: 'text-[#4CAF50]',
    },
    warning: {
        start: '#FFB74D',
        end: '#FF9800',
        text: 'text-[#FF9800]',
    },
    danger: {
        start: '#EF5350',
        end: '#F44336',
        text: 'text-[#F44336]',
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
        const colors = colorConfig[color] || colorConfig.primary;

        const sliderStyle = useMemo(() => ({
            background: `linear-gradient(to right, ${colors.start} 0%, ${colors.end} ${percentage}%, #E2E8F0 ${percentage}%)`,
        }), [percentage, colors.start, colors.end]);

        return (
            <div className="w-full">
                {(label || showValue) && (
                    <div className="flex items-center justify-between mb-3">
                        {label && (
                            <label className="text-sm font-semibold text-gray-700">{label}</label>
                        )}
                        {showValue && (
                            <span className={`text-sm font-bold ${colors.text}`}>
                                {valueFormatter(currentValue)}
                            </span>
                        )}
                    </div>
                )}
                <div className="relative py-2">
                    <style>{`
                        .slider-${color}::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, ${colors.start}, ${colors.end});
                            box-shadow: 0 4px 12px ${colors.start}44;
                            border: 3px solid white;
                            cursor: pointer;
                            transition: transform 0.15s ease;
                        }
                        .slider-${color}::-webkit-slider-thumb:hover {
                            transform: scale(1.1);
                        }
                        .slider-${color}::-webkit-slider-thumb:active {
                            transform: scale(0.95);
                        }
                        .slider-${color}::-moz-range-thumb {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, ${colors.start}, ${colors.end});
                            box-shadow: 0 4px 12px ${colors.start}44;
                            border: 3px solid white;
                            cursor: pointer;
                        }
                    `}</style>
                    <input
                        ref={ref}
                        type="range"
                        value={value}
                        min={min}
                        max={max}
                        className={`
                            slider-${color}
                            w-full h-2 appearance-none cursor-pointer rounded-full
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50
                            ${className}
                        `}
                        style={sliderStyle}
                        {...props}
                    />
                </div>
                {marks && (
                    <div className="flex justify-between mt-2 px-1">
                        {marks.map((mark) => (
                            <span
                                key={mark.value}
                                className={`text-xs font-medium transition-colors ${currentValue >= mark.value ? 'text-gray-700' : 'text-gray-400'
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
