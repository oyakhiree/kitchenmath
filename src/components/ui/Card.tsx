/**
 * Card Component
 * Reusable card container with variants
 */

import React from 'react';

type CardVariant = 'default' | 'elevated' | 'glass' | 'bordered';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
    default: 'bg-slate-800/50 border border-slate-700/50',
    elevated: 'bg-slate-800 border border-slate-700 shadow-xl shadow-black/20',
    glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
    bordered: 'bg-transparent border-2 border-slate-700',
};

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    hover = false,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`
        rounded-2xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hover ? 'transition-all duration-200 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5' : ''}
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    action,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex items-start justify-between mb-4 ${className}`} {...props}>
            <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            {action}
        </div>
    );
};

export default Card;
