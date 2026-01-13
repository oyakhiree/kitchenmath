/**
 * PricingConfig Component v2.0 (Light Theme)
 * Currency and margin configuration with preset buttons
 */

import React from 'react';
import { Select, Slider, Card } from '@/components/ui';
import type { Recipe, CurrencyCode } from '@/types';
import { CURRENCY_OPTIONS, CURRENCIES } from '@/constants';

interface PricingConfigProps {
    recipe: Recipe;
    onUpdate: (data: Partial<Recipe>) => void;
}

const MARGIN_PRESETS = [
    { label: 'Retail', value: 40, description: 'Bulk, wholesale' },
    { label: 'Restaurant', value: 65, description: 'Dine-in, takeout' },
    { label: 'Premium', value: 75, description: 'High-end, specialty' },
];

const currencyOptions = CURRENCY_OPTIONS.map((symbol) => {
    const config = CURRENCIES[symbol];
    return {
        value: config.code,
        label: `${config.symbol} ${config.code} - ${config.name}`,
    };
});

export const PricingConfig: React.FC<PricingConfigProps> = ({
    recipe,
    onUpdate,
}) => {
    const isCustomMargin = !MARGIN_PRESETS.some(p => p.value === recipe.targetMargin);

    return (
        <Card variant="glass" padding="md">
            <div className="space-y-6">
                {/* Currency Selection */}
                <Select
                    label="Currency"
                    value={recipe.currency || 'NGN'}
                    onChange={(e) => onUpdate({ currency: e.target.value as CurrencyCode })}
                    options={currencyOptions}
                />

                {/* Target Margin */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-sm font-semibold text-gray-700">
                            Target Profit Margin
                        </label>
                        <span className={`text-2xl font-bold font-display ${recipe.targetMargin >= 60
                            ? 'text-[#4CAF50]'
                            : recipe.targetMargin >= 30
                                ? 'text-[#FF9800]'
                                : 'text-[#F44336]'
                            }`}>
                            {recipe.targetMargin}%
                        </span>
                    </div>

                    {/* Preset Buttons */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {MARGIN_PRESETS.map((preset) => {
                            const isActive = recipe.targetMargin === preset.value;
                            return (
                                <button
                                    key={preset.value}
                                    type="button"
                                    onClick={() => onUpdate({ targetMargin: preset.value })}
                                    className={`
                    p-4 rounded-xl border-2 text-center transition-all duration-200
                    ${isActive
                                            ? 'border-[#FF6B35] bg-[#FF6B35]/5 shadow-lg shadow-[#FF6B35]/10'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    <div className={`text-lg font-bold ${isActive ? 'text-[#FF6B35]' : 'text-gray-900'}`}>
                                        {preset.value}%
                                    </div>
                                    <div className={`text-xs font-semibold mt-1 ${isActive ? 'text-[#FF6B35]/80' : 'text-gray-500'}`}>
                                        {preset.label}
                                    </div>
                                    <div className="text-[10px] text-gray-400 mt-0.5">
                                        {preset.description}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Custom Slider */}
                    <Slider
                        label={isCustomMargin ? "Custom margin" : "Fine-tune margin"}
                        value={recipe.targetMargin}
                        onChange={(e) => onUpdate({ targetMargin: parseInt(e.target.value) })}
                        min={10}
                        max={90}
                        step={1}
                        showValue={false}
                        color={
                            recipe.targetMargin >= 60
                                ? 'success'
                                : recipe.targetMargin >= 30
                                    ? 'warning'
                                    : 'danger'
                        }
                        marks={[
                            { value: 10, label: '10%' },
                            { value: 30, label: '30%' },
                            { value: 50, label: '50%' },
                            { value: 70, label: '70%' },
                            { value: 90, label: '90%' },
                        ]}
                    />
                </div>

                {/* Margin Guide */}
                <div className="p-4 bg-[#2EC4B6]/5 border border-[#2EC4B6]/20 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#2EC4B6]/15 text-[#2EC4B6] shrink-0">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs text-gray-600">
                                <span className="font-semibold text-gray-700">Industry tip:</span> Restaurants typically aim for 60-70% gross margin.
                                Food cost should be 28-35% of the selling price.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default PricingConfig;
