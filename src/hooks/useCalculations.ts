/**
 * useCalculations Hook
 * Custom hook for recipe calculations with memoization
 * Dependency Inversion Principle (DIP) - depends on abstractions (types), not concretions
 */

import { useMemo } from 'react';
import type { Recipe, CalculationResult, StressTestResult } from '@/types';
import { calculateRecipeMetrics, performStressTest, generateStressTestCurve } from '@/utils';

/**
 * Hook to compute calculation results for a recipe
 * Automatically recalculates when recipe changes
 */
export function useCalculations(recipe: Recipe | null): CalculationResult | null {
    return useMemo(() => {
        if (!recipe) return null;
        return calculateRecipeMetrics(recipe);
    }, [recipe]);
}

/**
 * Hook to perform stress test at a specific inflation level
 */
export function useStressTest(
    recipe: Recipe | null,
    inflationPercentage: number
): StressTestResult | null {
    return useMemo(() => {
        if (!recipe) return null;
        return performStressTest(recipe, inflationPercentage);
    }, [recipe, inflationPercentage]);
}

/**
 * Hook to generate stress test curve for visualization
 */
export function useStressTestCurve(
    recipe: Recipe | null,
    steps?: number[]
): StressTestResult[] {
    return useMemo(() => {
        if (!recipe) return [];
        return generateStressTestCurve(recipe, steps);
    }, [recipe, steps]);
}
