/**
 * PricingConfig Component
 * Target margin slider and currency selection
 */

import React from 'react';
import { Card, Slider, Select } from '@/components/ui';
import type { Recipe, CurrencySymbol } from '@/types';
import { CURRENCY_OPTIONS, CURRENCIES } from '@/constants';
import { useSettingsStore } from '@/stores';

interface PricingConfigProps {
    recipe: Recipe;
    onUpdate: (data: Partial<Recipe>) => void;
}

const currencyOptions = CURRENCY_OPTIONS.map((symbol) => ({
    value: symbol,
    label: `${symbol} - ${CURRENCIES[symbol].name}`,
}));

const marginMarks = [
    { value: 30, label: '30%' },
    { value: 50, label: '50%' },
    { value: 65, label: '65%' },
    { value: 80, label: '80%' },
];

export const PricingConfig: React.FC<PricingConfigProps> = ({
    recipe,
    onUpdate,
}) => {
    const { currency, setCurrency } = useSettingsStore();

    const getMarginLabel = (margin: number): string => {
        if (margin >= 70) return 'Retail / Takeout';
        if (margin >= 50) return 'Restaurant';
        if (margin >= 40) return 'Fast Food';
        return 'Wholesale / Bulk';
    };

    const getMarginColor = (margin: number): string => {
        if (margin >= 60) return 'text-emerald-400';
        if (margin >= 40) return 'text-amber-400';
        return 'text-red-400';
    };

    return (
        <Card variant="glass" padding="md">
            <div className="space-y-6">
                {/* Currency Selection */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <Select
                            label="Currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as CurrencySymbol)}
                            options={currencyOptions}
                        />
                    </div>
                </div>

                {/* Target Margin Slider */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-slate-300">
                            Target Gross Margin
                        </label>
                        <div className="text-right">
                            <span className={`text-lg font-bold ${getMarginColor(recipe.targetMargin)}`}>
                                {recipe.targetMargin}%
                            </span>
                            <p className="text-xs text-slate-500">{getMarginLabel(recipe.targetMargin)}</p>
                        </div>
                    </div>
                    <Slider
                        value={recipe.targetMargin}
                        onChange={(e) => onUpdate({ targetMargin: parseInt(e.target.value) })}
                        min={20}
                        max={85}
                        step={1}
                        showValue={false}
                        marks={marginMarks}
                    />
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <button
                            type="button"
                            onClick={() => onUpdate({ targetMargin: 40 })}
                            className={`p-2 rounded-lg text-xs transition-colors ${recipe.targetMargin === 40
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Retail (40%)
                        </button>
                        <button
                            type="button"
                            onClick={() => onUpdate({ targetMargin: 65 })}
                            className={`p-2 rounded-lg text-xs transition-colors ${recipe.targetMargin === 65
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Restaurant (65%)
                        </button>
                        <button
                            type="button"
                            onClick={() => onUpdate({ targetMargin: 75 })}
                            className={`p-2 rounded-lg text-xs transition-colors ${recipe.targetMargin === 75
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                    : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                                }`}
                        >
                            Premium (75%)
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default PricingConfig;
