/**
 * IngredientRow Component
 * Single ingredient input row with smart unit conversion
 */

import React, { useState, useEffect } from 'react';
import { Input, Select, Button } from '@/components/ui';
import type { Ingredient, Unit } from '@/types';
import { ALL_UNITS, UNIT_LABELS } from '@/constants';
import { calculateCostPerUsage, areUnitsCompatible } from '@/utils';
import { useCurrency } from '@/stores';
import { formatCurrency } from '@/utils/formatting';

interface IngredientRowProps {
    ingredient: Ingredient;
    onUpdate: (data: Partial<Ingredient>) => void;
    onDelete: () => void;
    isFirst?: boolean;
}

const unitOptions = ALL_UNITS.map((unit) => ({
    value: unit,
    label: UNIT_LABELS[unit],
}));

export const IngredientRow: React.FC<IngredientRowProps> = ({
    ingredient,
    onUpdate,
    onDelete,
    isFirst = false,
}) => {
    const currency = useCurrency();
    const [costPerPortion, setCostPerPortion] = useState<number | null>(null);
    const [unitError, setUnitError] = useState<string>('');

    // Calculate cost per portion whenever ingredient values change
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
    }, [ingredient]);

    return (
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30 hover:border-slate-600/50 transition-colors">
            {/* Header Row: Name & Delete */}
            <div className="flex items-center justify-between mb-4">
                <Input
                    value={ingredient.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                    placeholder="Ingredient name (e.g., Rice)"
                    className="font-medium bg-transparent border-0 p-0 text-white focus:ring-0 text-lg"
                />
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    aria-label="Delete ingredient"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Purchase Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <Input
                    type="number"
                    label="Purchase Price"
                    value={ingredient.purchasePrice || ''}
                    onChange={(e) => onUpdate({ purchasePrice: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    leftAddon={currency}
                    min={0}
                    step="0.01"
                />
                <Input
                    type="number"
                    label="Purchase Quantity"
                    value={ingredient.purchaseQuantity || ''}
                    onChange={(e) => onUpdate({ purchaseQuantity: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    min={0}
                    step="0.01"
                />
                <Select
                    label="Purchase Unit"
                    value={ingredient.purchaseUnit}
                    onChange={(e) => onUpdate({ purchaseUnit: e.target.value as Unit })}
                    options={unitOptions}
                />
            </div>

            {/* Usage Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <Input
                    type="number"
                    label="Usage per Portion"
                    value={ingredient.usageQuantity || ''}
                    onChange={(e) => onUpdate({ usageQuantity: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    min={0}
                    step="0.01"
                    error={unitError}
                />
                <Select
                    label="Usage Unit"
                    value={ingredient.usageUnit}
                    onChange={(e) => onUpdate({ usageUnit: e.target.value as Unit })}
                    options={unitOptions}
                />
            </div>

            {/* Cost per Portion Display */}
            {costPerPortion !== null && costPerPortion > 0 && (
                <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                    <span className="text-sm text-slate-400">Cost per portion</span>
                    <span className="text-lg font-bold text-emerald-400">
                        {formatCurrency(costPerPortion, currency)}
                    </span>
                </div>
            )}

            {/* First Row Help Text */}
            {isFirst && (
                <p className="text-xs text-slate-500 mt-3">
                    💡 <strong>Tip:</strong> Enter the price you paid for the full bag/container, then how much you use per serving. We&apos;ll calculate the cost automatically!
                </p>
            )}
        </div>
    );
};

export default IngredientRow;
