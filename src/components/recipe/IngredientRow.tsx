/**
 * IngredientRow Component v2.0 (Light Theme)
 * Redesigned ingredient card with visual flow and inline calculations
 */

import React, { useState, useEffect } from 'react';
import { Input, Select } from '@/components/ui';
import type { Ingredient, Unit } from '@/types';
import { ALL_UNITS, UNIT_LABELS } from '@/constants';
import { calculateCostPerUsage, areUnitsCompatible } from '@/utils';
import { useCurrency } from '@/stores';
import { formatCurrency } from '@/utils/formatting';

interface IngredientRowProps {
    ingredient: Ingredient;
    onUpdate: (data: Partial<Ingredient>) => void;
    onDelete: () => void;
    totalCost?: number;
    index: number;
}

const unitOptions = ALL_UNITS.map((unit) => ({
    value: unit,
    label: UNIT_LABELS[unit],
}));

export const IngredientRow: React.FC<IngredientRowProps> = ({
    ingredient,
    onUpdate,
    onDelete,
    totalCost = 0,
    index,
}) => {
    const currency = useCurrency();
    const [costPerPortion, setCostPerPortion] = useState<number | null>(null);
    const [unitError, setUnitError] = useState<string>('');

    // Calculate cost per portion
    useEffect(() => {
        const compatible = areUnitsCompatible(ingredient.purchaseUnit, ingredient.usageUnit);

        if (!compatible) {
            setUnitError(`Cannot convert ${ingredient.purchaseUnit} to ${ingredient.usageUnit}`);
            setCostPerPortion(null);
            return;
        }

        setUnitError('');

        const cost = calculateCostPerUsage(
            ingredient.purchasePrice,
            ingredient.purchaseQuantity,
            ingredient.purchaseUnit,
            ingredient.usageQuantity,
            ingredient.usageUnit
        );

        setCostPerPortion(cost);
    }, [
        ingredient.purchasePrice,
        ingredient.purchaseQuantity,
        ingredient.purchaseUnit,
        ingredient.usageQuantity,
        ingredient.usageUnit,
    ]);

    const costPercentage = totalCost > 0 && costPerPortion ? (costPerPortion / totalCost) * 100 : 0;

    return (
        <div
            className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-200 hover:border-gray-300 hover:shadow-lg animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-3 flex-1">
                    {/* Ingredient Icon */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35]/15 to-[#F4511E]/10 flex items-center justify-center text-[#FF6B35] shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>

                    {/* Name Input */}
                    <input
                        value={ingredient.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        placeholder="Ingredient name"
                        className="flex-1 bg-transparent border-0 text-lg font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0"
                    />
                </div>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-2.5 rounded-xl text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#F44336] hover:bg-[#F44336]/10 transition-all duration-200"
                    aria-label="Delete ingredient"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Purchase → Usage Flow */}
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                    {/* Purchase Section */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <div className="w-5 h-5 rounded-full bg-[#2EC4B6]/15 flex items-center justify-center text-[#2EC4B6]">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Purchase
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="number"
                                value={ingredient.purchasePrice || ''}
                                onChange={(e) => onUpdate({ purchasePrice: parseFloat(e.target.value) || 0 })}
                                placeholder="Price"
                                leftAddon={currency}
                                min={0}
                                step="0.01"
                            />
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    value={ingredient.purchaseQuantity || ''}
                                    onChange={(e) => onUpdate({ purchaseQuantity: parseFloat(e.target.value) || 0 })}
                                    placeholder="Qty"
                                    min={0}
                                    step="0.01"
                                    className="w-20"
                                />
                                <Select
                                    value={ingredient.purchaseUnit}
                                    onChange={(e) => onUpdate({ purchaseUnit: e.target.value as Unit })}
                                    options={unitOptions}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Arrow Divider */}
                    <div className="flex items-center justify-center py-2 md:py-0">
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-gray-100 items-center justify-center text-[#FF6B35]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <div className="md:hidden w-full flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#FF6B35]">
                                <svg className="w-4 h-4 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>
                    </div>

                    {/* Usage Section */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <div className="w-5 h-5 rounded-full bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35]">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            Per Portion
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                type="number"
                                value={ingredient.usageQuantity || ''}
                                onChange={(e) => onUpdate({ usageQuantity: parseFloat(e.target.value) || 0 })}
                                placeholder="Amount"
                                min={0}
                                step="0.01"
                                error={unitError}
                            />
                            <Select
                                value={ingredient.usageUnit}
                                onChange={(e) => onUpdate({ usageUnit: e.target.value as Unit })}
                                options={unitOptions}
                            />
                        </div>
                    </div>
                </div>

                {/* Cost Result */}
                {costPerPortion !== null && costPerPortion > 0 && (
                    <div className="mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500">Cost per portion</span>
                            <span className="text-xl font-bold text-[#4CAF50] font-display">
                                {formatCurrency(costPerPortion, currency)}
                            </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.min(costPercentage, 100)}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {costPercentage.toFixed(0)}% of total ingredient cost
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IngredientRow;
