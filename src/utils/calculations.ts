/**
 * Calculation Service
 * Single Responsibility Principle (SRP) - handles all pricing calculations
 * This is the core "Calculation Engine" from the PRD
 */

import type {
    Ingredient,
    Recipe,
    CalculationResult,
    IngredientCost,
    MarginStatus,
    StressTestResult,
} from '@/types';
import { calculateCostPerUsage } from './unitConversion';
import { MARGIN_THRESHOLDS, FOOD_COST_THRESHOLDS } from '@/constants';

/**
 * Determine margin health status based on percentage
 */
export function getMarginStatus(margin: number): MarginStatus {
    if (margin >= MARGIN_THRESHOLDS.healthy) return 'healthy';
    if (margin >= MARGIN_THRESHOLDS.warning) return 'warning';
    return 'danger';
}

/**
 * Calculate the cost of a single ingredient per portion
 */
export function calculateIngredientCost(ingredient: Ingredient): number {
    const cost = calculateCostPerUsage(
        ingredient.purchasePrice,
        ingredient.purchaseQuantity,
        ingredient.purchaseUnit,
        ingredient.usageQuantity,
        ingredient.usageUnit
    );

    return cost ?? 0;
}

/**
 * Calculate total ingredient costs for a recipe
 */
export function calculateTotalIngredientCost(ingredients: Ingredient[]): {
    total: number;
    breakdown: IngredientCost[];
} {
    const breakdown: IngredientCost[] = [];
    let total = 0;

    for (const ingredient of ingredients) {
        const cost = calculateIngredientCost(ingredient);
        total += cost;
        breakdown.push({
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            costPerPortion: cost,
        });
    }

    return { total, breakdown };
}

/**
 * Calculate labor cost based on minutes and hourly rate
 */
export function calculateLaborCost(minutes: number, hourlyRate: number): number {
    if (minutes <= 0 || hourlyRate <= 0) return 0;
    return (minutes / 60) * hourlyRate;
}

/**
 * Calculate waste buffer amount
 */
export function calculateWasteBuffer(baseAmount: number, wastePercentage: number): number {
    if (wastePercentage <= 0) return 0;
    return baseAmount * (wastePercentage / 100);
}

/**
 * Calculate True Portion Cost (TPC)
 * TPC = Σ(IngredientCosts) + Packaging + Labor + (Buffer%)
 */
export function calculateTruePortionCost(
    ingredientCost: number,
    packagingCost: number,
    laborCost: number,
    wastePercentage: number
): number {
    const baseTotal = ingredientCost + packagingCost + laborCost;
    const wasteBuffer = calculateWasteBuffer(baseTotal, wastePercentage);
    return baseTotal + wasteBuffer;
}

/**
 * Calculate Break-Even Price
 * BreakEven = TPC / (1 - TaxRate)
 */
export function calculateBreakEvenPrice(tpc: number, taxRate: number): number {
    if (taxRate >= 100) return Infinity;
    return tpc / (1 - taxRate / 100);
}

/**
 * Calculate Suggested Retail Price
 * Price = TPC / (1 - TargetMargin%)
 */
export function calculateSuggestedPrice(tpc: number, targetMargin: number): number {
    if (targetMargin >= 100) return Infinity;
    return tpc / (1 - targetMargin / 100);
}

/**
 * Calculate Delivery Price (with platform commission)
 * DeliveryPrice = RetailPrice / (1 - Commission%)
 * This inflates the price so net receipt equals retail target
 */
export function calculateDeliveryPrice(retailPrice: number, commission: number): number {
    if (commission >= 100) return Infinity;
    return retailPrice / (1 - commission / 100);
}

/**
 * Calculate Net Profit
 */
export function calculateNetProfit(price: number, tpc: number): number {
    return price - tpc;
}

/**
 * Calculate Food Cost Percentage
 * FoodCost% = (IngredientCost / Price) × 100
 */
export function calculateFoodCostPercentage(ingredientCost: number, price: number): number {
    if (price <= 0) return 0;
    return (ingredientCost / price) * 100;
}

/**
 * Calculate Actual Margin Percentage
 * Margin% = ((Price - TPC) / Price) × 100
 */
export function calculateActualMargin(price: number, tpc: number): number {
    if (price <= 0) return 0;
    return ((price - tpc) / price) * 100;
}

/**
 * Main calculation function - computes all metrics for a recipe
 * This is the "Decision Dashboard" data provider
 */
export function calculateRecipeMetrics(recipe: Recipe): CalculationResult {
    // Step 1: Calculate ingredient costs
    const { total: totalIngredientCost, breakdown: ingredientCosts } =
        calculateTotalIngredientCost(recipe.ingredients);

    // Step 2: Calculate labor cost
    const laborCost = calculateLaborCost(recipe.laborMinutes, recipe.laborHourlyRate);

    // Step 3: Calculate waste buffer
    const baseCost = totalIngredientCost + recipe.packagingCost + laborCost;
    const wasteBuffer = calculateWasteBuffer(baseCost, recipe.wastePercentage);

    // Step 4: Calculate True Portion Cost
    const truePortionCost = baseCost + wasteBuffer;

    // Step 5: Calculate prices
    const breakEvenPrice = calculateBreakEvenPrice(truePortionCost, recipe.taxRate);
    const suggestedRetailPrice = calculateSuggestedPrice(truePortionCost, recipe.targetMargin);

    // Step 6: Calculate delivery price (if applicable)
    const deliveryPrice = recipe.usesDeliveryPlatform
        ? calculateDeliveryPrice(suggestedRetailPrice, recipe.platformCommission)
        : suggestedRetailPrice;

    // Step 7: Calculate profit metrics
    const netProfit = calculateNetProfit(suggestedRetailPrice, truePortionCost);

    // For delivery, the vendor receives (deliveryPrice - commission%)
    const deliveryCommissionAmount = recipe.usesDeliveryPlatform
        ? deliveryPrice * (recipe.platformCommission / 100)
        : 0;
    const deliveryNetProfit = deliveryPrice - deliveryCommissionAmount - truePortionCost;

    // Step 8: Calculate food cost percentage (industry metric)
    const foodCostPercentage = calculateFoodCostPercentage(
        totalIngredientCost,
        suggestedRetailPrice
    );

    // Step 9: Calculate actual margin
    const actualMargin = calculateActualMargin(suggestedRetailPrice, truePortionCost);

    // Step 10: Determine margin health status
    const marginStatus = getMarginStatus(actualMargin);

    return {
        // Cost breakdown
        totalIngredientCost,
        packagingCost: recipe.packagingCost,
        laborCost,
        wasteBuffer,

        // Key metrics
        truePortionCost,
        breakEvenPrice,
        suggestedRetailPrice,
        deliveryPrice,

        // Profit metrics
        netProfit,
        deliveryNetProfit,
        foodCostPercentage,
        actualMargin,

        // Health status
        marginStatus,

        // Per-ingredient breakdown
        ingredientCosts,
    };
}

/**
 * Perform inflation stress test
 * Shows how margin changes when ingredient costs increase
 */
export function performStressTest(
    recipe: Recipe,
    inflationPercentage: number
): StressTestResult {
    // Calculate current metrics
    const current = calculateRecipeMetrics(recipe);

    // Apply inflation to ingredient costs
    const inflatedIngredientCost = current.totalIngredientCost * (1 + inflationPercentage / 100);

    // Recalculate with inflated costs
    const laborCost = calculateLaborCost(recipe.laborMinutes, recipe.laborHourlyRate);
    const baseCost = inflatedIngredientCost + recipe.packagingCost + laborCost;
    const wasteBuffer = calculateWasteBuffer(baseCost, recipe.wastePercentage);
    const newTruePortionCost = baseCost + wasteBuffer;

    // Calculate new margin at same retail price
    const newMargin = calculateActualMargin(current.suggestedRetailPrice, newTruePortionCost);
    const marginChange = newMargin - current.actualMargin;
    const marginStatus = getMarginStatus(newMargin);
    const isViable = newMargin > 0;

    return {
        inflationPercentage,
        newTruePortionCost,
        newMargin,
        marginChange,
        marginStatus,
        isViable,
    };
}

/**
 * Generate multiple stress test points for visualization
 */
export function generateStressTestCurve(
    recipe: Recipe,
    steps: number[] = [0, 10, 20, 30, 40, 50, 75, 100]
): StressTestResult[] {
    return steps.map(step => performStressTest(recipe, step));
}

/**
 * Get food cost warning message
 */
export function getFoodCostWarning(percentage: number): string | null {
    if (percentage > FOOD_COST_THRESHOLDS.danger) {
        return 'Food cost is critically high! Consider raising prices or reducing ingredient costs.';
    }
    if (percentage > FOOD_COST_THRESHOLDS.warning) {
        return 'Food cost is above industry recommendation. Monitor closely.';
    }
    return null;
}
