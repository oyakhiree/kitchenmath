/**
 * MetricCard Component v2.0
 * Hero-style metric display for Decision Dashboard
 */

import React from 'react';
import type { MarginStatus } from '@/types';

interface MetricCardProps {
    label: string;
    value: string;
    subtitle?: string;
    status?: MarginStatus;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        label?: string;
    };
    size?: 'sm' | 'md' | 'lg';
    animate?: boolean;
}

const statusConfig: Record<MarginStatus, {
    bg: string;
    text: string;
    border: string;
    glow: string;
    gradient: string;
}> = {
    healthy: {
        bg: 'bg-[#4CAF50]/10',
        text: 'text-[#4CAF50]',
        border: 'border-[#4CAF50]/30',
        glow: 'shadow-[#4CAF50]/20',
        gradient: 'from-[#4CAF50]/20 via-transparent to-transparent',
    },
    warning: {
        bg: 'bg-[#FF9800]/10',
        text: 'text-[#FF9800]',
        border: 'border-[#FF9800]/30',
        glow: 'shadow-[#FF9800]/20',
        gradient: 'from-[#FF9800]/20 via-transparent to-transparent',
    },
    danger: {
        bg: 'bg-[#F44336]/10',
        text: 'text-[#F44336]',
        border: 'border-[#F44336]/30',
        glow: 'shadow-[#F44336]/20',
        gradient: 'from-[#F44336]/20 via-transparent to-transparent',
    },
};

const sizeConfig = {
    sm: {
        padding: 'p-4',
        valueSize: 'text-xl',
        labelSize: 'text-xs',
        iconSize: 'p-2',
    },
    md: {
        padding: 'p-5',
        valueSize: 'text-2xl',
        labelSize: 'text-sm',
        iconSize: 'p-2.5',
    },
    lg: {
        padding: 'p-6',
        valueSize: 'text-3xl',
        labelSize: 'text-sm',
        iconSize: 'p-3',
    },
};

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    subtitle,
    status = 'healthy',
    icon,
    trend,
    size = 'md',
    animate = true,
}) => {
    const colors = statusConfig[status];
    const sizes = sizeConfig[size];

    return (
        <div
            className={`
        relative overflow-hidden rounded-2xl ${sizes.padding}
        bg-slate-800/60 border ${colors.border}
        transition-all duration-300
        hover:shadow-lg ${colors.glow}
        ${animate ? 'animate-fade-in-up' : ''}
      `}
        >
            {/* Background Gradient */}
            <div
                className={`
          absolute inset-0 opacity-60
          bg-gradient-to-br ${colors.gradient}
        `}
            />

            <div className="relative">
                {/* Top Row: Label & Icon */}
                <div className="flex items-center justify-between mb-3">
                    <span className={`${sizes.labelSize} font-semibold text-slate-400 uppercase tracking-wide`}>
                        {label}
                    </span>
                    {icon && (
                        <div className={`${sizes.iconSize} rounded-xl ${colors.bg}`}>
                            <div className={colors.text}>{icon}</div>
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className={`${sizes.valueSize} font-bold ${colors.text} mb-1 font-display tracking-tight`}>
                    {value}
                </div>

                {/* Bottom Row: Subtitle & Trend */}
                <div className="flex items-center justify-between">
                    {subtitle && (
                        <span className="text-xs text-slate-500">{subtitle}</span>
                    )}
                    {trend && (
                        <span
                            className={`
                inline-flex items-center text-xs font-semibold
                ${trend.value >= 0 ? 'text-[#4CAF50]' : 'text-[#F44336]'}
              `}
                        >
                            {trend.value >= 0 ? (
                                <svg className="w-3.5 h-3.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-3.5 h-3.5 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                            {Math.abs(trend.value).toFixed(1)}%
                            {trend.label && <span className="ml-1 text-slate-500 font-normal">{trend.label}</span>}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
