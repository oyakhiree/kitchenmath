/**
 * Unit Conversion Utilities
 * Single Responsibility Principle (SRP) - handles only unit conversions
 */

import type { Unit, UnitCategory } from '@/types';
import { CONVERSION_TO_BASE, UNIT_CATEGORIES } from '@/constants';

/**
 * Get the category of a unit
 */
export function getUnitCategory(unit: Unit): UnitCategory {
    return UNIT_CATEGORIES[unit];
}

/**
 * Check if two units are compatible for conversion
 */
export function areUnitsCompatible(unit1: Unit, unit2: Unit): boolean {
    return getUnitCategory(unit1) === getUnitCategory(unit2);
}

/**
 * Convert a quantity from one unit to another
 * @param quantity - The quantity to convert
 * @param fromUnit - The source unit
 * @param toUnit - The target unit
 * @returns The converted quantity, or null if units are incompatible
 */
export function convertUnit(
    quantity: number,
    fromUnit: Unit,
    toUnit: Unit
): number | null {
    // If same unit, no conversion needed
    if (fromUnit === toUnit) {
        return quantity;
    }

    // Check compatibility
    if (!areUnitsCompatible(fromUnit, toUnit)) {
        return null;
    }

    // Pieces cannot be converted
    if (fromUnit === 'pcs' || toUnit === 'pcs') {
        return fromUnit === toUnit ? quantity : null;
    }

    // Convert to base unit, then to target unit
    const inBaseUnit = quantity * CONVERSION_TO_BASE[fromUnit];
    const converted = inBaseUnit / CONVERSION_TO_BASE[toUnit];

    return converted;
}

/**
 * Calculate the cost per unit usage based on purchase and usage quantities
 * This is the core "smart" feature mentioned in the PRD
 * 
 * @param purchasePrice - Total price paid for the purchase
 * @param purchaseQuantity - Quantity purchased (e.g., 50)
 * @param purchaseUnit - Unit of purchase (e.g., 'kg')
 * @param usageQuantity - Quantity used per portion (e.g., 200)
 * @param usageUnit - Unit of usage (e.g., 'g')
 * @returns Cost per portion, or null if units are incompatible
 * 
 * @example
 * // Bought 50kg of rice for ₦85,000, using 200g per portion
 * calculateCostPerUsage(85000, 50, 'kg', 200, 'g')
 * // Returns: 340 (₦340 per portion)
 */
export function calculateCostPerUsage(
    purchasePrice: number,
    purchaseQuantity: number,
    purchaseUnit: Unit,
    usageQuantity: number,
    usageUnit: Unit
): number | null {
    // Validate inputs
    if (purchaseQuantity <= 0 || usageQuantity <= 0 || purchasePrice < 0) {
        return null;
    }

    // Check unit compatibility
    if (!areUnitsCompatible(purchaseUnit, usageUnit)) {
        return null;
    }

    // For pieces, simple calculation
    if (purchaseUnit === 'pcs') {
        const costPerPiece = purchasePrice / purchaseQuantity;
        return costPerPiece * usageQuantity;
    }

    // Convert purchase quantity to usage unit
    const purchaseInUsageUnit = convertUnit(purchaseQuantity, purchaseUnit, usageUnit);

    if (purchaseInUsageUnit === null || purchaseInUsageUnit <= 0) {
        return null;
    }

    // Calculate cost per usage unit
    const costPerUsageUnit = purchasePrice / purchaseInUsageUnit;

    // Calculate total cost for the usage quantity
    return costPerUsageUnit * usageQuantity;
}

/**
 * Format a quantity with appropriate precision
 */
export function formatQuantity(quantity: number, unit: Unit): string {
    if (unit === 'pcs') {
        return quantity % 1 === 0 ? quantity.toString() : quantity.toFixed(1);
    }

    // For small quantities, show more precision
    if (quantity < 1) {
        return quantity.toFixed(3);
    } else if (quantity < 10) {
        return quantity.toFixed(2);
    } else if (quantity < 100) {
        return quantity.toFixed(1);
    }

    return quantity.toFixed(0);
}

/**
 * Get a human-readable conversion factor string
 */
export function getConversionDescription(fromUnit: Unit, toUnit: Unit): string | null {
    if (!areUnitsCompatible(fromUnit, toUnit) || fromUnit === toUnit) {
        return null;
    }

    const factor = CONVERSION_TO_BASE[fromUnit] / CONVERSION_TO_BASE[toUnit];

    return `1 ${fromUnit} = ${formatQuantity(factor, toUnit)} ${toUnit}`;
}
