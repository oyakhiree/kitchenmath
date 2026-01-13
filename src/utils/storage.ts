/**
 * Storage Utilities
 * Single Responsibility Principle (SRP) - handles only localStorage operations
 */

import { STORAGE_KEYS } from '@/constants';

/**
 * Generic storage wrapper with error handling
 */
export const storage = {
    /**
     * Get an item from localStorage
     */
    get<T>(key: string, defaultValue: T): T {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item) as T;
        } catch (error) {
            console.error(`Error reading from localStorage key "${key}":`, error);
            return defaultValue;
        }
    },

    /**
     * Set an item in localStorage
     */
    set<T>(key: string, value: T): boolean {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error writing to localStorage key "${key}":`, error);
            return false;
        }
    },

    /**
     * Remove an item from localStorage
     */
    remove(key: string): boolean {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
            return false;
        }
    },

    /**
     * Clear all kitchenmath data from localStorage
     */
    clearAll(): boolean {
        try {
            Object.values(STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    /**
     * Check if localStorage is available
     */
    isAvailable(): boolean {
        try {
            const testKey = '__kitchenmath_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Get storage usage info
     */
    getUsageInfo(): { used: number; available: boolean } {
        try {
            let totalSize = 0;
            for (const key of Object.values(STORAGE_KEYS)) {
                const item = localStorage.getItem(key);
                if (item) {
                    totalSize += item.length * 2; // UTF-16 uses 2 bytes per character
                }
            }
            return { used: totalSize, available: true };
        } catch {
            return { used: 0, available: false };
        }
    },
};

/**
 * Debounce function for auto-save
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, wait);
    };
}
