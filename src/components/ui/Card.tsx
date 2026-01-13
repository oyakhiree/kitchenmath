/**
 * Card Component v2.0 (Light Theme)
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
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white border border-gray-100 shadow-xl',
    glass: 'bg-white/70 backdrop-blur-xl border border-gray-200/50',
    bordered: 'bg-white border-2 border-gray-200 hover:border-gray-300',
    interactive: `
    bg-white border border-gray-200 shadow-sm
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
    primary: 'shadow-lg shadow-[#FF6B35]/10',
    success: 'shadow-lg shadow-[#4CAF50]/10',
    warning: 'shadow-lg shadow-[#FF9800]/10',
    danger: 'shadow-lg shadow-[#F44336]/10',
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
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF6B35]/10 to-[#F4511E]/5 text-[#FF6B35]">
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
                </div>
            </div>
            {action}
        </div>
    );
};

export default Card;
