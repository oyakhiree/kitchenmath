/**
 * OverheadSection Component
 * Hidden costs accordion (packaging, labor, commission)
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
        <div className="space-y-3">
            {/* Packaging & Materials */}
            <Accordion
                title="Packaging & Materials"
                subtitle="Containers, cutlery, napkins, etc."
                defaultOpen={recipe.packagingCost > 0}
                icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                }
            >
                <div className="mt-4">
                    <Input
                        type="number"
                        label="Packaging Cost per Portion"
                        value={recipe.packagingCost || ''}
                        onChange={(e) => onUpdate({ packagingCost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        leftAddon={currency}
                        hint="Include containers, bags, utensils, napkins, etc."
                        min={0}
                        step="0.01"
                    />
                </div>
            </Accordion>

            {/* Labor Cost */}
            <Accordion
                title="Direct Labor"
                subtitle="Time spent preparing this item"
                defaultOpen={recipe.laborMinutes > 0}
                icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            >
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="number"
                        label="Prep Time (minutes)"
                        value={recipe.laborMinutes || ''}
                        onChange={(e) => onUpdate({ laborMinutes: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                        hint="Minutes to prepare one portion"
                        min={0}
                    />
                    <Input
                        type="number"
                        label="Hourly Labor Rate"
                        value={recipe.laborHourlyRate || ''}
                        onChange={(e) => onUpdate({ laborHourlyRate: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        leftAddon={currency}
                        hint="Your hourly wage or rate"
                        min={0}
                        step="0.01"
                    />
                </div>
            </Accordion>

            {/* Waste Buffer */}
            <Accordion
                title="Waste & Buffer"
                subtitle="Account for spillage, mistakes, and waste"
                defaultOpen={true}
                icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                }
            >
                <div className="mt-4">
                    <Slider
                        label="Waste Buffer"
                        value={recipe.wastePercentage}
                        onChange={(e) => onUpdate({ wastePercentage: parseInt(e.target.value) })}
                        min={0}
                        max={25}
                        step={1}
                        marks={[
                            { value: 0, label: '0%' },
                            { value: 5, label: '5%' },
                            { value: 10, label: '10%' },
                            { value: 15, label: '15%' },
                            { value: 25, label: '25%' },
                        ]}
                    />
                    <p className="text-xs text-slate-500 mt-3">
                        💡 Industry standard is 5-10% for food waste and mistakes
                    </p>
                </div>
            </Accordion>

            {/* Platform Commission */}
            <Accordion
                title="Delivery Platform"
                subtitle="Commission for delivery apps (Glovo, Bolt Food, etc.)"
                defaultOpen={recipe.usesDeliveryPlatform}
                icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                }
            >
                <div className="mt-4 space-y-4">
                    <Toggle
                        checked={recipe.usesDeliveryPlatform}
                        onChange={(checked) => onUpdate({ usesDeliveryPlatform: checked })}
                        label="Selling on delivery apps?"
                        description="Enable to calculate delivery-specific pricing"
                    />

                    {recipe.usesDeliveryPlatform && (
                        <Slider
                            label="Platform Commission"
                            value={recipe.platformCommission}
                            onChange={(e) => onUpdate({ platformCommission: parseInt(e.target.value) })}
                            min={5}
                            max={35}
                            step={1}
                            marks={[
                                { value: 5, label: '5%' },
                                { value: 15, label: '15%' },
                                { value: 20, label: '20%' },
                                { value: 25, label: '25%' },
                                { value: 35, label: '35%' },
                            ]}
                        />
                    )}

                    {recipe.usesDeliveryPlatform && (
                        <p className="text-xs text-slate-500">
                            ⚠️ Delivery prices will be automatically inflated so your net profit matches retail pricing
                        </p>
                    )}
                </div>
            </Accordion>

            {/* Tax Rate */}
            <Accordion
                title="Tax / VAT"
                subtitle="Sales tax or VAT applicable to your region"
                defaultOpen={recipe.taxRate > 0}
                icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                    </svg>
                }
            >
                <div className="mt-4">
                    <Input
                        type="number"
                        label="Tax Rate %"
                        value={recipe.taxRate || ''}
                        onChange={(e) => onUpdate({ taxRate: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                        rightAddon="%"
                        hint="VAT or sales tax percentage (e.g., 7.5 for Nigeria)"
                        min={0}
                        max={50}
                        step="0.5"
                    />
                </div>
            </Accordion>
        </div>
    );
};

export default OverheadSection;
