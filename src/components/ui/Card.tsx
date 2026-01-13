/**
 * Card Component v2.0
 * Food delivery industry standard design
 */

import React from 'react';

type CardVariant = 'default' | 'elevated' | 'glass' | 'bordered' | 'interactive';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    glow?: 'none' | 'primary' | 'success' | 'warning' | 'danger';
}

const variantClasses: Record<CardVariant, string> = {
    default: 'bg-slate-800/60 border border-slate-700/60',
    elevated: 'bg-slate-800 border border-slate-700 shadow-xl shadow-black/30',
    glass: 'bg-slate-800/40 backdrop-blur-xl border border-white/10',
    bordered: 'bg-transparent border-2 border-slate-700 hover:border-slate-600',
    interactive: `
    bg-slate-800/60 border border-slate-700/60
    hover:border-[#FF6B35]/50 hover:shadow-lg hover:shadow-[#FF6B35]/5
    transition-all duration-200 cursor-pointer
    active:scale-[0.99]
  `,
};

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
};

const glowClasses = {
    none: '',
    primary: 'shadow-lg shadow-[#FF6B35]/20',
    success: 'shadow-lg shadow-[#4CAF50]/20',
    warning: 'shadow-lg shadow-[#FF9800]/20',
    danger: 'shadow-lg shadow-[#F44336]/20',
};

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    glow = 'none',
    className = '',
    ...props
}) => {
    return (
        <div
            className={`
        rounded-2xl
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${glowClasses[glow]}
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
    icon?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    action,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex items-start justify-between gap-4 mb-5 ${className}`} {...props}>
            <div className="flex items-start gap-3">
                {icon && (
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#F4511E]/10 text-[#FF6B35]">
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {action}
        </div>
    );
};

export default Card;
