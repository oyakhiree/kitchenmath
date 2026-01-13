/**
 * Validation Utilities
 * Single Responsibility Principle (SRP) - handles only validation
 */

import type {
    Ingredient,
    Recipe,
    ValidationError,
    ValidationResult,
    CreateIngredientDTO,
    CreateRecipeDTO,
} from '@/types';
import { VALIDATION_LIMITS, UNIT_CATEGORIES } from '@/constants';

/**
 * Create a validation result
 */
function createValidationResult(errors: ValidationError[]): ValidationResult {
    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Validate a numeric value within bounds
 */
export function validateNumber(
    value: number,
    field: string,
    options: {
        min?: number;
        max?: number;
        allowZero?: boolean;
        required?: boolean;
    } = {}
): ValidationError | null {
    const { min = 0, max = Infinity, allowZero = true, required = true } = options;

    if (required && (value === undefined || value === null || isNaN(value))) {
        return { field, message: `${field} is required` };
    }

    if (!allowZero && value === 0) {
        return { field, message: `${field} cannot be zero` };
    }

    if (value < min) {
        return { field, message: `${field} must be at least ${min}` };
    }

    if (value > max) {
        return { field, message: `${field} must not exceed ${max}` };
    }

    return null;
}

/**
 * Validate a string value
 */
export function validateString(
    value: string,
    field: string,
    options: {
        minLength?: number;
        maxLength?: number;
        required?: boolean;
        pattern?: RegExp;
        patternMessage?: string;
    } = {}
): ValidationError | null {
    const {
        minLength = 0,
        maxLength = VALIDATION_LIMITS.maxNameLength,
        required = true,
        pattern,
        patternMessage,
    } = options;

    const trimmed = value?.trim() ?? '';

    if (required && trimmed.length === 0) {
        return { field, message: `${field} is required` };
    }

    if (trimmed.length > 0 && trimmed.length < minLength) {
        return { field, message: `${field} must be at least ${minLength} characters` };
    }

    if (trimmed.length > maxLength) {
        return { field, message: `${field} must not exceed ${maxLength} characters` };
    }

    if (pattern && !pattern.test(trimmed)) {
        return { field, message: patternMessage ?? `${field} format is invalid` };
    }

    return null;
}

/**
 * Validate an ingredient
 */
export function validateIngredient(
    ingredient: CreateIngredientDTO | Ingredient
): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate name
    const nameError = validateString(ingredient.name, 'Ingredient name', {
        minLength: 1,
        required: true,
    });
    if (nameError) errors.push(nameError);

    // Validate purchase price
    const priceError = validateNumber(ingredient.purchasePrice, 'Purchase price', {
        min: VALIDATION_LIMITS.minPrice,
        max: VALIDATION_LIMITS.maxPrice,
        allowZero: false,
    });
    if (priceError) errors.push(priceError);

    // Validate purchase quantity
    const purchaseQtyError = validateNumber(ingredient.purchaseQuantity, 'Purchase quantity', {
        min: VALIDATION_LIMITS.minQuantity,
        max: VALIDATION_LIMITS.maxQuantity,
        allowZero: false,
    });
    if (purchaseQtyError) errors.push(purchaseQtyError);

    // Validate usage quantity
    const usageQtyError = validateNumber(ingredient.usageQuantity, 'Usage quantity', {
        min: VALIDATION_LIMITS.minQuantity,
        max: VALIDATION_LIMITS.maxQuantity,
        allowZero: false,
    });
    if (usageQtyError) errors.push(usageQtyError);

    // Validate unit compatibility
    const purchaseCategory = UNIT_CATEGORIES[ingredient.purchaseUnit];
    const usageCategory = UNIT_CATEGORIES[ingredient.usageUnit];

    if (purchaseCategory !== usageCategory) {
        errors.push({
            field: 'units',
            message: `Cannot convert ${ingredient.purchaseUnit} to ${ingredient.usageUnit}. Units must be compatible.`,
        });
    }

    return createValidationResult(errors);
}

/**
 * Validate a recipe
 */
export function validateRecipe(
    recipe: CreateRecipeDTO | Recipe
): ValidationResult {
    const errors: ValidationError[] = [];

    // Validate name
    const nameError = validateString(recipe.name, 'Recipe name', {
        minLength: 1,
        required: true,
    });
    if (nameError) errors.push(nameError);

    // Validate packaging cost
    if (recipe.packagingCost !== undefined) {
        const packagingError = validateNumber(recipe.packagingCost, 'Packaging cost', {
            min: VALIDATION_LIMITS.minPrice,
            max: VALIDATION_LIMITS.maxPrice,
        });
        if (packagingError) errors.push(packagingError);
    }

    // Validate target margin
    if (recipe.targetMargin !== undefined) {
        const marginError = validateNumber(recipe.targetMargin, 'Target margin', {
            min: VALIDATION_LIMITS.minMargin,
            max: VALIDATION_LIMITS.maxMargin,
        });
        if (marginError) errors.push(marginError);
    }

    // Validate tax rate
    if (recipe.taxRate !== undefined) {
        const taxError = validateNumber(recipe.taxRate, 'Tax rate', {
            min: VALIDATION_LIMITS.minPercentage,
            max: VALIDATION_LIMITS.maxPercentage,
        });
        if (taxError) errors.push(taxError);
    }

    // Validate waste percentage
    if (recipe.wastePercentage !== undefined) {
        const wasteError = validateNumber(recipe.wastePercentage, 'Waste percentage', {
            min: VALIDATION_LIMITS.minPercentage,
            max: 50, // Max 50% waste is reasonable
        });
        if (wasteError) errors.push(wasteError);
    }

    // Validate platform commission
    if (recipe.platformCommission !== undefined) {
        const commissionError = validateNumber(recipe.platformCommission, 'Platform commission', {
            min: VALIDATION_LIMITS.minPercentage,
            max: 50, // Max 50% commission
        });
        if (commissionError) errors.push(commissionError);
    }

    // Validate ingredients if present (for full Recipe type)
    if ('ingredients' in recipe && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ingredient, index) => {
            const ingredientValidation = validateIngredient(ingredient);
            ingredientValidation.errors.forEach(error => {
                errors.push({
                    field: `ingredients[${index}].${error.field}`,
                    message: error.message,
                });
            });
        });
    }

    return createValidationResult(errors);
}

/**
 * Check if a value is a valid percentage (0-100)
 */
export function isValidPercentage(value: number): boolean {
    return value >= 0 && value <= 100 && !isNaN(value);
}

/**
 * Check if a value is a valid positive number
 */
export function isValidPositiveNumber(value: number): boolean {
    return value > 0 && isFinite(value) && !isNaN(value);
}
