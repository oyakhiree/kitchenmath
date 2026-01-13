/**
 * useDebounce Hook
 * Debounces a value for performance optimization
 */

import { useState, useEffect } from 'react';
import { UI_CONFIG } from '@/constants';

/**
 * Debounce a value - returns the value only after it stops changing
 */
export function useDebounce<T>(value: T, delay: number = UI_CONFIG.debounceMs): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Debounce a callback function
 */
export function useDebouncedCallback<TArgs extends unknown[]>(
    callback: (...args: TArgs) => void,
    delay: number = UI_CONFIG.debounceMs
): (...args: TArgs) => void {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    return (...args: TArgs) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimeoutId(newTimeoutId);
    };
}
