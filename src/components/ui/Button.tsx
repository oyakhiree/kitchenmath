/**
 * Button Component v2.0
 * Food delivery industry standard design
 */

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: `
    bg-gradient-to-r from-[#FF6B35] to-[#F4511E] 
    hover:from-[#F4511E] hover:to-[#E64A19] 
    text-white font-semibold
    shadow-lg shadow-[#FF6B35]/25 
    hover:shadow-xl hover:shadow-[#FF6B35]/30
    active:scale-[0.98]
  `,
    secondary: `
    bg-gradient-to-r from-[#2EC4B6] to-[#00ACC1] 
    hover:from-[#00ACC1] hover:to-[#0097A7] 
    text-white font-semibold
    shadow-lg shadow-[#2EC4B6]/25 
    hover:shadow-xl hover:shadow-[#2EC4B6]/30
    active:scale-[0.98]
  `,
    success: `
    bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] 
    hover:from-[#4CAF50] hover:to-[#43A047] 
    text-white font-semibold
    shadow-lg shadow-[#4CAF50]/25
    active:scale-[0.98]
  `,
    danger: `
    bg-gradient-to-r from-[#EF5350] to-[#F44336] 
    hover:from-[#F44336] hover:to-[#E53935] 
    text-white font-semibold
    shadow-lg shadow-[#F44336]/25
    active:scale-[0.98]
  `,
    ghost: `
    bg-transparent 
    hover:bg-slate-800/60 
    text-slate-300 hover:text-white
    active:bg-slate-700/60
  `,
    outline: `
    border-2 border-slate-600 
    hover:border-[#FF6B35] 
    text-slate-300 hover:text-[#FF6B35] 
    bg-transparent
    hover:bg-[#FF6B35]/5
    active:bg-[#FF6B35]/10
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm gap-2 min-h-[36px]',
    md: 'px-5 py-2.5 text-sm gap-2.5 min-h-[44px]',
    lg: 'px-6 py-3.5 text-base gap-3 min-h-[52px]',
};

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    return (
        <button
            className={`
        inline-flex items-center justify-center font-medium rounded-2xl
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                leftIcon
            )}
            {children}
            {rightIcon}
        </button>
    );
};

export default Button;
