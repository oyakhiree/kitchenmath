/**
 * MetricCard Component
 * Display a key metric with status indicator
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
}

const statusColors: Record<MarginStatus, { bg: string; text: string; glow: string }> = {
    healthy: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        glow: 'shadow-emerald-500/20',
    },
    warning: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        glow: 'shadow-amber-500/20',
    },
    danger: {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        glow: 'shadow-red-500/20',
    },
};

export const MetricCard: React.FC<MetricCardProps> = ({
    label,
    value,
    subtitle,
    status = 'healthy',
    icon,
    trend,
}) => {
    const colors = statusColors[status];

    return (
        <div
            className={`
        relative overflow-hidden rounded-2xl p-5
        bg-slate-800/50 border border-slate-700/50
        hover:border-slate-600/50 transition-all duration-200
        ${status !== 'healthy' ? `shadow-lg ${colors.glow}` : ''}
      `}
        >
            {/* Background Gradient */}
            <div
                className={`
          absolute inset-0 opacity-20
          bg-gradient-to-br ${status === 'healthy' ? 'from-emerald-500/20 to-transparent' : status === 'warning' ? 'from-amber-500/20 to-transparent' : 'from-red-500/20 to-transparent'}
        `}
            />

            <div className="relative">
                {/* Top Row: Label & Icon */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-slate-400">{label}</span>
                    {icon && (
                        <div className={`p-2 rounded-lg ${colors.bg}`}>
                            <div className={colors.text}>{icon}</div>
                        </div>
                    )}
                </div>

                {/* Value */}
                <div className={`text-2xl font-bold ${colors.text} mb-1`}>
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
                inline-flex items-center text-xs font-medium
                ${trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'}
              `}
                        >
                            {trend.value >= 0 ? (
                                <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            )}
                            {Math.abs(trend.value).toFixed(1)}%
                            {trend.label && <span className="ml-1 text-slate-500">{trend.label}</span>}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MetricCard;
