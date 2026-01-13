/**
 * OverheadSection Component v2.0 (Light Theme)
 * Hidden costs with improved accordion UX
 */

import React from 'react';
import { Accordion, Input, Slider, Toggle } from '@/components/ui';
import type { Recipe } from '@/types';
import { useCurrency } from '@/stores';

interface OverheadSectionProps {
    recipe: Recipe;
    onUpdate: (data: Partial<Recipe>) => void;
}

export const OverheadSection: React.FC<OverheadSectionProps> = ({
    recipe,
    onUpdate,
}) => {
    const currency = useCurrency();

    return (
        <div className="space-y-4">
            {/* Packaging Cost */}
            <Accordion
                title="Packaging"
                subtitle="Containers, utensils, napkins"
                defaultOpen={recipe.packagingCost > 0}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                }
                badge={recipe.packagingCost > 0 ? `${currency}${recipe.packagingCost}` : undefined}
            >
                <div className="space-y-4">
                    <Input
                        type="number"
                        label="Cost per portion"
                        value={recipe.packagingCost || ''}
                        onChange={(e) => onUpdate({ packagingCost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        leftAddon={currency}
                        hint="Include takeaway containers, cutlery, napkins, bags"
                        min={0}
                        step="0.01"
                    />
                </div>
            </Accordion>

            {/* Labor Cost */}
            <Accordion
                title="Labor"
                subtitle="Prep time and cooking"
                defaultOpen={recipe.laborMinutes > 0}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                badge={recipe.laborMinutes > 0 ? `${recipe.laborMinutes} min` : undefined}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="number"
                        label="Prep time"
                        value={recipe.laborMinutes || ''}
                        onChange={(e) => onUpdate({ laborMinutes: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                        rightAddon="min"
                        hint="Minutes to prepare one portion"
                        min={0}
                        step="1"
                    />
                    <Input
                        type="number"
                        label="Hourly rate"
                        value={recipe.laborHourlyRate || ''}
                        onChange={(e) => onUpdate({ laborHourlyRate: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        leftAddon={currency}
                        rightAddon="/hr"
                        hint="Your cost of labor per hour"
                        min={0}
                        step="0.01"
                    />
                </div>
                {recipe.laborMinutes > 0 && recipe.laborHourlyRate > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-xl text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Labor cost per portion:</span>
                            <span className="font-semibold text-[#4CAF50]">
                                {currency}{((recipe.laborMinutes / 60) * recipe.laborHourlyRate).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </Accordion>

            {/* Waste Buffer */}
            <Accordion
                title="Waste Buffer"
                subtitle="Spillage, mistakes, spoilage"
                defaultOpen={recipe.wastePercentage > 0}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                }
                badge={recipe.wastePercentage > 0 ? `${recipe.wastePercentage}%` : undefined}
            >
                <Slider
                    label="Waste percentage"
                    value={recipe.wastePercentage}
                    onChange={(e) => onUpdate({ wastePercentage: parseInt(e.target.value) })}
                    min={0}
                    max={25}
                    step={1}
                    color={recipe.wastePercentage > 15 ? 'warning' : 'primary'}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 5, label: '5%' },
                        { value: 10, label: '10%' },
                        { value: 15, label: '15%' },
                        { value: 25, label: '25%' },
                    ]}
                />
                <p className="mt-4 text-xs text-gray-500">
                    Industry standard is 5-10%. Increase for high-risk items or new recipes.
                </p>
            </Accordion>

            {/* Delivery Platform */}
            <Accordion
                title="Delivery Platform"
                subtitle="Fees from Jumia, Chowdeck, etc."
                defaultOpen={recipe.usesDeliveryPlatform}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                }
                badge={recipe.usesDeliveryPlatform ? `${recipe.platformCommission}%` : undefined}
            >
                <div className="space-y-6">
                    <Toggle
                        checked={recipe.usesDeliveryPlatform}
                        onChange={(checked) => onUpdate({ usesDeliveryPlatform: checked })}
                        label="Enable delivery pricing"
                        description="Calculate inflated price to maintain margin after platform commission"
                    />

                    {recipe.usesDeliveryPlatform && (
                        <div className="pt-4 border-t border-gray-100">
                            <Slider
                                label="Platform commission"
                                value={recipe.platformCommission}
                                onChange={(e) => onUpdate({ platformCommission: parseInt(e.target.value) })}
                                min={5}
                                max={40}
                                step={1}
                                color="warning"
                                marks={[
                                    { value: 5, label: '5%' },
                                    { value: 15, label: '15%' },
                                    { value: 20, label: '20%' },
                                    { value: 30, label: '30%' },
                                    { value: 40, label: '40%' },
                                ]}
                            />
                            <p className="mt-4 text-xs text-gray-500">
                                Most delivery platforms charge 15-25%. Check your contract for exact rates.
                            </p>
                        </div>
                    )}
                </div>
            </Accordion>

            {/* Tax Rate */}
            <Accordion
                title="Tax Rate"
                subtitle="VAT or sales tax"
                defaultOpen={recipe.taxRate > 0}
                icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                    </svg>
                }
                badge={recipe.taxRate > 0 ? `${recipe.taxRate}%` : undefined}
            >
                <Slider
                    label="Tax rate"
                    value={recipe.taxRate}
                    onChange={(e) => onUpdate({ taxRate: parseFloat(e.target.value) })}
                    min={0}
                    max={25}
                    step={0.5}
                    color="primary"
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 5, label: '5%' },
                        { value: 7.5, label: '7.5%' },
                        { value: 15, label: '15%' },
                        { value: 25, label: '25%' },
                    ]}
                />
                <p className="mt-4 text-xs text-gray-500">
                    Nigeria VAT is 7.5%. Set to 0% if you're exempt or prices include tax.
                </p>
            </Accordion>
        </div>
    );
};

export default OverheadSection;
