/**
 * Application Constants
 * Centralized configuration values for consistency and maintainability
 */

import type { CurrencyConfig, CurrencySymbol, Unit, UnitCategory } from '@/types';

// ============================================================================
// CURRENCY CONFIGURATION
// ============================================================================

export const CURRENCIES: Record<CurrencySymbol, CurrencyConfig> = {
    '₦': { symbol: '₦', code: 'NGN', name: 'Nigerian Naira', locale: 'en-NG' },
    '$': { symbol: '$', code: 'USD', name: 'US Dollar', locale: 'en-US' },
    '£': { symbol: '£', code: 'GBP', name: 'British Pound', locale: 'en-GB' },
    '€': { symbol: '€', code: 'EUR', name: 'Euro', locale: 'de-DE' },
};

export const CURRENCY_OPTIONS: CurrencySymbol[] = ['₦', '$', '£', '€'];

// ============================================================================
// UNIT CONFIGURATION
// ============================================================================

/** Unit display labels */
export const UNIT_LABELS: Record<Unit, string> = {
    kg: 'Kilogram (kg)',
    g: 'Gram (g)',
    l: 'Litre (L)',
    ml: 'Millilitre (mL)',
    pcs: 'Pieces (pcs)',
};

/** Short unit labels */
export const UNIT_SHORT_LABELS: Record<Unit, string> = {
    kg: 'kg',
    g: 'g',
    l: 'L',
    ml: 'mL',
    pcs: 'pcs',
};

/** Unit categories for validation */
export const UNIT_CATEGORIES: Record<Unit, UnitCategory> = {
    kg: 'weight',
    g: 'weight',
    l: 'volume',
    ml: 'volume',
    pcs: 'piece',
};

/** Available units grouped by category */
export const UNITS_BY_CATEGORY: Record<UnitCategory, Unit[]> = {
    weight: ['kg', 'g'],
    volume: ['l', 'ml'],
    piece: ['pcs'],
};

/** All available units */
export const ALL_UNITS: Unit[] = ['kg', 'g', 'l', 'ml', 'pcs'];

// ============================================================================
// UNIT CONVERSION FACTORS
// ============================================================================

/** Conversion factors to base unit (grams for weight, ml for volume) */
export const CONVERSION_TO_BASE: Record<Unit, number> = {
    kg: 1000,    // 1 kg = 1000 g
    g: 1,        // base unit for weight
    l: 1000,     // 1 L = 1000 mL
    ml: 1,       // base unit for volume
    pcs: 1,      // pieces are not converted
};

// ============================================================================
// DEFAULT VALUES
// ============================================================================

export const DEFAULT_SETTINGS = {
    currency: '₦' as CurrencySymbol,
    defaultTargetMargin: 65,        // 65% margin (restaurant standard)
    defaultTaxRate: 7.5,            // 7.5% VAT (Nigeria)
    defaultWastePercentage: 5,      // 5% waste buffer
    defaultPlatformCommission: 20,  // 20% delivery app commission
};

export const DEFAULT_RECIPE_VALUES = {
    packagingCost: 0,
    laborMinutes: 0,
    laborHourlyRate: 0,
    wastePercentage: DEFAULT_SETTINGS.defaultWastePercentage,
    platformCommission: DEFAULT_SETTINGS.defaultPlatformCommission,
    targetMargin: DEFAULT_SETTINGS.defaultTargetMargin,
    taxRate: DEFAULT_SETTINGS.defaultTaxRate,
    usesDeliveryPlatform: false,
};

// ============================================================================
// MARGIN THRESHOLDS
// ============================================================================

/** Margin thresholds for health status */
export const MARGIN_THRESHOLDS = {
    healthy: 60,   // >= 60% = green (healthy)
    warning: 30,   // >= 30% = orange (warning)
    // < 30% = red (danger)
};

/** Food cost percentage thresholds */
export const FOOD_COST_THRESHOLDS = {
    target: 30,    // Target food cost should be ~30%
    warning: 35,   // Warning if above 35%
    danger: 40,    // Danger if above 40%
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
    recipes: 'kitchenmath_recipes',
    settings: 'kitchenmath_settings',
    currentRecipeId: 'kitchenmath_current_recipe',
};

// ============================================================================
// STRESS TEST CONFIGURATION
// ============================================================================

export const STRESS_TEST_CONFIG = {
    minInflation: 0,
    maxInflation: 100,
    defaultInflation: 20,
    step: 5,
};

// ============================================================================
// UI CONFIGURATION
// ============================================================================

export const UI_CONFIG = {
    debounceMs: 300,               // Debounce for auto-save
    animationDuration: 200,        // Animation duration in ms
    maxIngredients: 50,            // Maximum ingredients per recipe
    maxRecipes: 100,               // Maximum saved recipes
};

// ============================================================================
// VALIDATION LIMITS
// ============================================================================

export const VALIDATION_LIMITS = {
    minPrice: 0,
    maxPrice: 1000000000,          // 1 billion
    minQuantity: 0.001,            // Minimum quantity
    maxQuantity: 1000000,          // 1 million
    minPercentage: 0,
    maxPercentage: 100,
    maxMargin: 99,                 // Max 99% margin
    minMargin: 1,                  // Min 1% margin
    maxNameLength: 100,
};
