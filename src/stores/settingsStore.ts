/**
 * Settings Store
 * Manages application-wide settings with persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings, CurrencySymbol } from '@/types';
import { DEFAULT_SETTINGS, STORAGE_KEYS } from '@/constants';

interface SettingsState extends AppSettings {
    // Actions
    setCurrency: (currency: CurrencySymbol) => void;
    setDefaultTargetMargin: (margin: number) => void;
    setDefaultTaxRate: (rate: number) => void;
    setDefaultWastePercentage: (percentage: number) => void;
    setDefaultPlatformCommission: (commission: number) => void;
    resetToDefaults: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            // Initial state
            ...DEFAULT_SETTINGS,

            // Actions
            setCurrency: (currency) => set({ currency }),

            setDefaultTargetMargin: (margin) => set({ defaultTargetMargin: margin }),

            setDefaultTaxRate: (rate) => set({ defaultTaxRate: rate }),

            setDefaultWastePercentage: (percentage) => set({ defaultWastePercentage: percentage }),

            setDefaultPlatformCommission: (commission) => set({ defaultPlatformCommission: commission }),

            resetToDefaults: () => set(DEFAULT_SETTINGS),
        }),
        {
            name: STORAGE_KEYS.settings,
        }
    )
);

// Selector hooks for specific settings
export const useCurrency = () => useSettingsStore((state) => state.currency);
export const useDefaultMargin = () => useSettingsStore((state) => state.defaultTargetMargin);
export const useDefaultTaxRate = () => useSettingsStore((state) => state.defaultTaxRate);
