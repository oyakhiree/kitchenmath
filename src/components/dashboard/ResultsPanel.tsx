/**
 * ResultsPanel Component v2.0 (Light Theme - Minimalist)
 * Decision Dashboard with clean, Apple-inspired design
 */

import React, { useState } from 'react';
import { Card, MetricCard, Slider } from '@/components/ui';
import type { Recipe } from '@/types';
import { useCalculations, useStressTest } from '@/hooks';
import { useCurrency } from '@/stores';
import { formatCurrency, formatPercentage } from '@/utils/formatting';
import { STRESS_TEST_CONFIG } from '@/constants';

interface ResultsPanelProps {
    recipe: Recipe | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ recipe }) => {
    const currency = useCurrency();
    const calculations = useCalculations(recipe);
    const [inflationRate, setInflationRate] = useState(STRESS_TEST_CONFIG.defaultInflation);
    const stressTest = useStressTest(recipe, inflationRate);

    if (!recipe || !calculations) {
        return (
            <div className="h-full flex items-center justify-center text-center p-8">
                <div className="animate-fade-in-up">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Ready to Calculate</h3>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        Add ingredients to see your pricing analysis.
                    </p>
                </div>
            </div>
        );
    }

    const hasIngredients = recipe.ingredients.length > 0;

    if (!hasIngredients) {
        return (
            <div className="h-full flex items-center justify-center text-center p-8">
                <div className="animate-fade-in-up">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Add Ingredients</h3>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                        Add at least one ingredient to see pricing.
                    </p>
                </div>
            </div>
        );
    }

    const getStatusColor = () => {
        if (calculations.marginStatus === 'healthy') return { text: 'text-emerald-600', bg: 'bg-emerald-50' };
        if (calculations.marginStatus === 'warning') return { text: 'text-amber-600', bg: 'bg-amber-50' };
        return { text: 'text-red-600', bg: 'bg-red-50' };
    };

    const status = getStatusColor();

    return (
        <div className="space-y-6">
            {/* Hero Price Display */}
            <div className="text-center py-6">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Suggested Retail Price
                </p>
                <p className={`text-5xl font-bold tracking-tight font-display ${status.text}`}>
                    {formatCurrency(calculations.suggestedRetailPrice, currency, { showDecimals: false })}
                </p>

                {/* Margin Indicator */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100">
                    <span className="text-xs text-gray-500">Margin</span>
                    <span className={`text-sm font-semibold ${status.text}`}>
                        {formatPercentage(calculations.actualMargin)}
                    </span>
                </div>

                {/* Cost Summary */}
                <div className="mt-6 flex items-center justify-center gap-8">
                    <div className="text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Your Cost</p>
                        <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(calculations.truePortionCost, currency)}
                        </p>
                    </div>
                    <div className="w-px h-8 bg-gray-200"></div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400 mb-0.5">Profit</p>
                        <p className={`text-lg font-semibold ${status.text}`}>
                            {formatCurrency(calculations.netProfit, currency)}
                        </p>
                    </div>
                </div>

                {/* Delivery Price */}
                {recipe.usesDeliveryPlatform && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">Delivery App Price</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(calculations.deliveryPrice, currency, { showDecimals: false })}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Covers {formatPercentage(recipe.platformCommission)} commission
                        </p>
                    </div>
                )}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">COGS</p>
                    <p className="text-xl font-semibold text-gray-900">
                        {formatCurrency(calculations.truePortionCost, currency)}
                    </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Food Cost</p>
                    <p className={`text-xl font-semibold ${calculations.foodCostPercentage > 35 ? 'text-amber-600' : 'text-gray-900'}`}>
                        {formatPercentage(calculations.foodCostPercentage, { decimals: 0 })}
                    </p>
                </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-3">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Cost Breakdown</h4>
                <div className="space-y-2">
                    <CostRow label="Ingredients" value={calculations.totalIngredientCost} total={calculations.truePortionCost} currency={currency} />
                    {calculations.packagingCost > 0 && (
                        <CostRow label="Packaging" value={calculations.packagingCost} total={calculations.truePortionCost} currency={currency} />
                    )}
                    {calculations.laborCost > 0 && (
                        <CostRow label="Labor" value={calculations.laborCost} total={calculations.truePortionCost} currency={currency} />
                    )}
                    {calculations.wasteBuffer > 0 && (
                        <CostRow label="Waste" value={calculations.wasteBuffer} total={calculations.truePortionCost} currency={currency} />
                    )}
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(calculations.truePortionCost, currency)}
                    </span>
                </div>
            </div>

            {/* Stress Test */}
            <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Inflation Test</h4>
                <Slider
                    value={inflationRate}
                    onChange={(e) => setInflationRate(parseInt(e.target.value))}
                    min={0}
                    max={100}
                    step={5}
                    color={inflationRate > 50 ? 'danger' : inflationRate > 25 ? 'warning' : 'primary'}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 50, label: '50%' },
                        { value: 100, label: '100%' },
                    ]}
                />

                {stressTest && (
                    <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                            <p className="text-xs text-gray-500">New Margin</p>
                            <p className={`text-lg font-semibold ${stressTest.marginStatus === 'healthy' ? 'text-emerald-600' :
                                    stressTest.marginStatus === 'warning' ? 'text-amber-600' : 'text-red-600'
                                }`}>
                                {formatPercentage(stressTest.newMargin)}
                            </p>
                        </div>
                        {!stressTest.isViable && (
                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                Loss
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// Minimal cost row component
interface CostRowProps {
    label: string;
    value: number;
    total: number;
    currency: string;
}

const CostRow: React.FC<CostRowProps> = ({ label, value, total, currency }) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;

    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 flex-1">
                <span className="text-sm text-gray-600">{label}</span>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gray-300 rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>
            </div>
            <span className="text-sm font-medium text-gray-900 ml-4">
                {formatCurrency(value, currency as any)}
            </span>
        </div>
    );
};

export default ResultsPanel;
