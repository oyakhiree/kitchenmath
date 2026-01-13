/**
 * ResultsPanel Component v2.0
 * Decision Dashboard with hero price display and visual metrics
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
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#FF6B35]/20 to-[#F4511E]/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#FF6B35]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Calculate</h3>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto">
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
                <div className="animate-fade-in-up">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-[#FF9800]/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#FF9800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#FF9800] mb-2">Add Ingredients</h3>
                    <p className="text-sm text-slate-400 max-w-xs mx-auto">
                        Add at least one ingredient to see your cost breakdown and suggested pricing.
                    </p>
                </div>
            </div>
        );
    }

    const getPriceClass = () => {
        if (calculations.marginStatus === 'healthy') return 'text-price-success';
        if (calculations.marginStatus === 'warning') return 'text-price-warning';
        return 'text-price-danger';
    };

    return (
        <div className="space-y-6">
            {/* Hero Price Display */}
            <div className={`
        relative overflow-hidden text-center py-8 px-6 rounded-3xl
        bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-800/40
        border ${calculations.marginStatus === 'healthy'
                    ? 'border-[#4CAF50]/30 shadow-xl shadow-[#4CAF50]/10'
                    : calculations.marginStatus === 'warning'
                        ? 'border-[#FF9800]/30 shadow-xl shadow-[#FF9800]/10'
                        : 'border-[#F44336]/30 shadow-xl shadow-[#F44336]/10'
                }
        ${calculations.marginStatus === 'healthy' ? 'animate-pulse-glow' : ''}
      `}>
                {/* Background Glow */}
                <div className={`
          absolute inset-0 opacity-30
          ${calculations.marginStatus === 'healthy'
                        ? 'bg-gradient-to-t from-[#4CAF50]/20 via-transparent to-transparent'
                        : calculations.marginStatus === 'warning'
                            ? 'bg-gradient-to-t from-[#FF9800]/20 via-transparent to-transparent'
                            : 'bg-gradient-to-t from-[#F44336]/20 via-transparent to-transparent'
                    }
        `} />

                <div className="relative">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Suggested Retail Price
                    </p>
                    <p className={`text-price font-display ${getPriceClass()}`}>
                        {formatCurrency(calculations.suggestedRetailPrice, currency, { showDecimals: false })}
                    </p>

                    {/* Margin Bar */}
                    <div className="mt-5 max-w-xs mx-auto">
                        <div className="flex items-center justify-between text-xs mb-2">
                            <span className="text-slate-400">Profit Margin</span>
                            <span className={`font-bold ${calculations.marginStatus === 'healthy' ? 'text-[#4CAF50]' :
                                    calculations.marginStatus === 'warning' ? 'text-[#FF9800]' : 'text-[#F44336]'
                                }`}>
                                {formatPercentage(calculations.actualMargin)}
                            </span>
                        </div>
                        <div className="h-3 bg-slate-700/60 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${calculations.marginStatus === 'healthy'
                                        ? 'bg-gradient-to-r from-[#66BB6A] to-[#4CAF50]'
                                        : calculations.marginStatus === 'warning'
                                            ? 'bg-gradient-to-r from-[#FFB74D] to-[#FF9800]'
                                            : 'bg-gradient-to-r from-[#EF5350] to-[#F44336]'
                                    }`}
                                style={{ width: `${Math.min(Math.max(calculations.actualMargin, 0), 100)}%` }}
                            />
                        </div>
                    </div>

                    {/* Value Summary */}
                    <div className="mt-6 flex items-center justify-center gap-6">
                        <div className="text-center">
                            <p className="text-xs text-slate-500 mb-1">Your Cost</p>
                            <p className="text-lg font-bold text-white">
                                {formatCurrency(calculations.truePortionCost, currency)}
                            </p>
                        </div>
                        <div className="w-px h-10 bg-slate-700"></div>
                        <div className="text-center">
                            <p className="text-xs text-slate-500 mb-1">You Keep</p>
                            <p className={`text-lg font-bold ${calculations.marginStatus === 'healthy' ? 'text-[#4CAF50]' :
                                    calculations.marginStatus === 'warning' ? 'text-[#FF9800]' : 'text-[#F44336]'
                                }`}>
                                {formatCurrency(calculations.netProfit, currency)}
                            </p>
                        </div>
                    </div>

                    {/* Delivery Price */}
                    {recipe.usesDeliveryPlatform && (
                        <div className="mt-6 pt-5 border-t border-slate-700/50">
                            <div className="flex items-center justify-center gap-3">
                                <div className="p-2 rounded-lg bg-[#2EC4B6]/20 text-[#2EC4B6]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-slate-400">Delivery App Price</p>
                                    <p className="text-xl font-bold text-[#2EC4B6]">
                                        {formatCurrency(calculations.deliveryPrice, currency, { showDecimals: false })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Inflated to cover {formatPercentage(recipe.platformCommission)} platform commission
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
                <MetricCard
                    label="COGS"
                    value={formatCurrency(calculations.truePortionCost, currency)}
                    subtitle="True Portion Cost"
                    status="healthy"
                    size="sm"
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    }
                />
                <MetricCard
                    label="Food Cost"
                    value={formatPercentage(calculations.foodCostPercentage, { decimals: 0 })}
                    subtitle={calculations.foodCostPercentage > 35 ? 'Above target' : 'On target'}
                    status={calculations.foodCostPercentage > 35 ? 'warning' : 'healthy'}
                    size="sm"
                    icon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                    }
                />
            </div>

            {/* Cost Breakdown */}
            <Card variant="default" padding="md">
                <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Cost Breakdown
                </h4>
                <div className="space-y-3">
                    <CostBreakdownRow
                        label="Ingredients"
                        value={calculations.totalIngredientCost}
                        currency={currency}
                        percentage={(calculations.totalIngredientCost / calculations.truePortionCost) * 100}
                        color="primary"
                    />
                    {calculations.packagingCost > 0 && (
                        <CostBreakdownRow
                            label="Packaging"
                            value={calculations.packagingCost}
                            currency={currency}
                            percentage={(calculations.packagingCost / calculations.truePortionCost) * 100}
                            color="secondary"
                        />
                    )}
                    {calculations.laborCost > 0 && (
                        <CostBreakdownRow
                            label="Labor"
                            value={calculations.laborCost}
                            currency={currency}
                            percentage={(calculations.laborCost / calculations.truePortionCost) * 100}
                            color="warning"
                        />
                    )}
                    {calculations.wasteBuffer > 0 && (
                        <CostBreakdownRow
                            label="Waste Buffer"
                            value={calculations.wasteBuffer}
                            currency={currency}
                            percentage={(calculations.wasteBuffer / calculations.truePortionCost) * 100}
                            color="danger"
                        />
                    )}
                    <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
                        <span className="font-bold text-white">Total COGS</span>
                        <span className="text-xl font-bold text-[#4CAF50]">
                            {formatCurrency(calculations.truePortionCost, currency)}
                        </span>
                    </div>
                </div>
            </Card>

            {/* Inflation Stress Test */}
            <Card variant="default" padding="md">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Inflation Stress Test
                </h4>
                <p className="text-xs text-slate-500 mb-5">
                    See how rising ingredient costs affect your margin at the current price
                </p>

                <Slider
                    value={inflationRate}
                    onChange={(e) => setInflationRate(parseInt(e.target.value))}
                    min={0}
                    max={100}
                    step={5}
                    color={inflationRate > 50 ? 'danger' : inflationRate > 25 ? 'warning' : 'primary'}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 25, label: '25%' },
                        { value: 50, label: '50%' },
                        { value: 100, label: '100%' },
                    ]}
                />

                {stressTest && (
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-700/30 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">New COGS</p>
                            <p className="text-lg font-bold text-white">
                                {formatCurrency(stressTest.newTruePortionCost, currency)}
                            </p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-xl">
                            <p className="text-xs text-slate-400 mb-1">New Margin</p>
                            <p className={`text-lg font-bold ${stressTest.marginStatus === 'healthy' ? 'text-[#4CAF50]' :
                                    stressTest.marginStatus === 'warning' ? 'text-[#FF9800]' : 'text-[#F44336]'
                                }`}>
                                {formatPercentage(stressTest.newMargin)}
                            </p>
                        </div>
                    </div>
                )}

                {stressTest && !stressTest.isViable && (
                    <div className="mt-4 p-4 bg-[#F44336]/10 border border-[#F44336]/30 rounded-xl animate-shake">
                        <p className="text-sm text-[#F44336] flex items-start gap-2 font-medium">
                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            At this inflation level, you would be selling at a loss. Consider raising your prices.
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

// Cost Breakdown Row Component
interface CostBreakdownRowProps {
    label: string;
    value: number;
    currency: string;
    percentage: number;
    color: 'primary' | 'secondary' | 'warning' | 'danger';
}

const colorClasses = {
    primary: 'from-[#FF6B35] to-[#F4511E]',
    secondary: 'from-[#2EC4B6] to-[#00ACC1]',
    warning: 'from-[#FFB74D] to-[#FF9800]',
    danger: 'from-[#EF5350] to-[#F44336]',
};

const CostBreakdownRow: React.FC<CostBreakdownRowProps> = ({
    label,
    value,
    currency,
    percentage,
    color,
}) => (
    <div className="flex items-center gap-3">
        <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-400">{label}</span>
                <span className="text-sm font-semibold text-slate-200">
                    {formatCurrency(value, currency as any)}
                </span>
            </div>
            <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
        </div>
        <span className="text-xs font-semibold text-slate-500 w-10 text-right">
            {formatPercentage(percentage, { decimals: 0 })}
        </span>
    </div>
);

export default ResultsPanel;
