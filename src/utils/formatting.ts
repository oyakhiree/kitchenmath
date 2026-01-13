/**
 * Formatting Utilities
 * Single Responsibility Principle (SRP) - handles only formatting
 */

import type { CurrencySymbol } from '@/types';
import { CURRENCIES } from '@/constants';

/**
 * Format a number as currency
 */
export function formatCurrency(
    amount: number,
    currency: CurrencySymbol = '₦',
    options?: {
        showDecimals?: boolean;
        compact?: boolean;
    }
): string {
    const { showDecimals = true, compact = false } = options ?? {};
    const config = CURRENCIES[currency];

    if (compact && amount >= 1000) {
        const formatter = new Intl.NumberFormat(config.locale, {
            notation: 'compact',
            compactDisplay: 'short',
            maximumFractionDigits: 1,
        });
        return `${currency}${formatter.format(amount)}`;
    }

    const formatter = new Intl.NumberFormat(config.locale, {
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
    });

    return `${currency}${formatter.format(amount)}`;
}

/**
 * Format a percentage value
 */
export function formatPercentage(
    value: number,
    options?: {
        showSign?: boolean;
        decimals?: number;
    }
): string {
    const { showSign = false, decimals = 1 } = options ?? {};

    const formatted = value.toFixed(decimals);
    const sign = showSign && value > 0 ? '+' : '';

    return `${sign}${formatted}%`;
}

/**
 * Format a date for display
 */
export function formatDate(
    dateString: string,
    options?: {
        includeTime?: boolean;
        relative?: boolean;
    }
): string {
    const { includeTime = false, relative = false } = options ?? {};
    const date = new Date(dateString);

    if (relative) {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        ...(includeTime && { hour: '2-digit', minute: '2-digit' }),
    };

    return date.toLocaleDateString('en-US', dateOptions);
}

/**
 * Format a duration in minutes to a human-readable string
 */
export function formatDuration(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (mins === 0) {
        return `${hours} hr`;
    }

    return `${hours} hr ${mins} min`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Generate a slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactNumber(num: number): string {
    if (num >= 1_000_000_000) {
        return `${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toString();
}
