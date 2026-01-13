/**
 * ResultsPanel Component
 * Decision Dashboard - displays real-time calculation results
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
                <div>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                        <svg className="w-10 h-10 text-emerald-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-2">Ready to Calculate</h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                        Start by adding a recipe name and some ingredients. Your pricing will appear here in real-time.
                    </p>
                </div>
            </div>
        );
    }

    const hasIngredients = recipe.ingredients.length > 0;

    if (!hasIngredients) {
        return (
            <div className="h-full flex items-center justify-center text-center p-8">
                <div>
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-amber-400 mb-2">Add Ingredients</h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                        Add at least one ingredient to see your cost breakdown and suggested pricing.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Price Header */}
            <div className="text-center py-6 px-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20">
                <p className="text-sm text-slate-400 mb-1">Suggested Retail Price</p>
                <p className={`text-5xl font-bold bg-gradient-to-r ${calculations.marginStatus === 'healthy'
                    ? 'from-emerald-400 to-teal-400'
                    : calculations.marginStatus === 'warning'
                        ? 'from-amber-400 to-orange-400'
                        : 'from-red-400 to-rose-400'
                    } bg-clip-text text-transparent`}>
                    {formatCurrency(calculations.suggestedRetailPrice, currency, { showDecimals: false })}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                    Based on {formatPercentage(recipe.targetMargin)} target margin
                </p>

                {recipe.usesDeliveryPlatform && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                        <p className="text-xs text-slate-400 mb-1">Delivery App Price</p>
                        <p className="text-2xl font-bold text-cyan-400">
                            {formatCurrency(calculations.deliveryPrice, currency, { showDecimals: false })}
                        </p>
                        <p className="text-xs text-slate-500">
                            Inflated to cover {formatPercentage(recipe.platformCommission)} commission
                        </p>
                    </div>
                )}
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
                <MetricCard
                    label="COGS"
                    value={formatCurrency(calculations.truePortionCost, currency)}
                    subtitle="True Portion Cost"
                    status="healthy"
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    }
                />
                <MetricCard
                    label="Net Profit"
                    value={formatCurrency(calculations.netProfit, currency)}
                    subtitle="Per portion sold"
                    status={calculations.marginStatus}
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <MetricCard
                    label="Food Cost %"
                    value={formatPercentage(calculations.foodCostPercentage)}
                    subtitle={calculations.foodCostPercentage > 35 ? 'Above target' : 'On target'}
                    status={calculations.foodCostPercentage > 35 ? 'warning' : 'healthy'}
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                    }
                />
                <MetricCard
                    label="Break-Even"
                    value={formatCurrency(calculations.breakEvenPrice, currency)}
                    subtitle="Min price to cover costs"
                    status="healthy"
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    }
                />
            </div>

            {/* Cost Breakdown */}
            <Card variant="default" padding="md">
                <h4 className="text-sm font-semibold text-white mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                    <CostBreakdownRow
                        label="Ingredients"
                        value={calculations.totalIngredientCost}
                        currency={currency}
                        percentage={(calculations.totalIngredientCost / calculations.truePortionCost) * 100}
                    />
                    {calculations.packagingCost > 0 && (
                        <CostBreakdownRow
                            label="Packaging"
                            value={calculations.packagingCost}
                            currency={currency}
                            percentage={(calculations.packagingCost / calculations.truePortionCost) * 100}
                        />
                    )}
                    {calculations.laborCost > 0 && (
                        <CostBreakdownRow
                            label="Labor"
                            value={calculations.laborCost}
                            currency={currency}
                            percentage={(calculations.laborCost / calculations.truePortionCost) * 100}
                        />
                    )}
                    {calculations.wasteBuffer > 0 && (
                        <CostBreakdownRow
                            label="Waste Buffer"
                            value={calculations.wasteBuffer}
                            currency={currency}
                            percentage={(calculations.wasteBuffer / calculations.truePortionCost) * 100}
                        />
                    )}
                    <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                        <span className="font-semibold text-white">Total COGS</span>
                        <span className="font-bold text-emerald-400">
                            {formatCurrency(calculations.truePortionCost, currency)}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Inflation Stress Test */}
            <Card variant="default" padding="md">
                <h4 className="text-sm font-semibold text-white mb-2">Inflation Stress Test</h4>
                <p className="text-xs text-slate-500 mb-4">
                    See how rising ingredient costs affect your margin at the current price
                </p>

                <Slider
                    label="Market Price Increase"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(parseInt(e.target.value))}
                    min={0}
                    max={100}
                    step={5}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 25, label: '25%' },
                        { value: 50, label: '50%' },
                        { value: 100, label: '100%' },
                    ]}
                />

                {stressTest && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-700/30 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">New COGS</p>
                            <p className="text-lg font-bold text-white">
                                {formatCurrency(stressTest.newTruePortionCost, currency)}
                            </p>
                        </div>
                        <div className="p-3 bg-slate-700/30 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">New Margin</p>
                            <p className={`text-lg font-bold ${stressTest.marginStatus === 'healthy'
                                ? 'text-emerald-400'
                                : stressTest.marginStatus === 'warning'
                                    ? 'text-amber-400'
                                    : 'text-red-400'
                                }`}>
                                {formatPercentage(stressTest.newMargin)}
                            </p>
                        </div>
                    </div>
                )}

                {stressTest && !stressTest.isViable && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-xs text-red-400 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            At this inflation level, you would be selling at a loss. Consider raising prices.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

// Helper component for cost breakdown
interface CostBreakdownRowProps {
    label: string;
    value: number;
    currency: string;
    percentage: number;
}

const CostBreakdownRow: React.FC<CostBreakdownRowProps> = ({
    label,
    value,
    currency,
    percentage,
}) => (
    <div className="flex items-center gap-3">
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-400">{label}</span>
                <span className="text-sm font-medium text-slate-200">
                    {formatCurrency(value, currency as any)}
                </span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
        </div>
        <span className="text-xs text-slate-500 w-12 text-right">
            {formatPercentage(percentage, { decimals: 0 })}
        </span>
    </div>
);

export default ResultsPanel;
