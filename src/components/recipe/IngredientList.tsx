/**
 * IngredientList Component v2.0
 * Dynamic list with improved empty state and add functionality
 */

import React from 'react';
import { Button } from '@/components/ui';
import { IngredientRow } from './IngredientRow';
import type { Ingredient } from '@/types';

interface IngredientListProps {
    ingredients: Ingredient[];
    onAdd: (data?: Partial<Ingredient>) => void;
    onUpdate: (id: string, data: Partial<Ingredient>) => void;
    onDelete: (id: string) => void;
}

// Common ingredient templates for quick-add
const QUICK_ADD_TEMPLATES = [
    { name: 'Rice', purchaseUnit: 'kg', usageUnit: 'g' },
    { name: 'Cooking Oil', purchaseUnit: 'l', usageUnit: 'ml' },
    { name: 'Chicken', purchaseUnit: 'kg', usageUnit: 'g' },
    { name: 'Onions', purchaseUnit: 'kg', usageUnit: 'g' },
];

export const IngredientList: React.FC<IngredientListProps> = ({
    ingredients,
    onAdd,
    onUpdate,
    onDelete,
}) => {
    // Calculate total cost for percentage display
    const totalCost = ingredients.reduce((sum, ingredient) => {
        // Simple calculation for now
        if (ingredient.purchaseQuantity > 0 && ingredient.usageQuantity > 0) {
            const costPer = (ingredient.purchasePrice / ingredient.purchaseQuantity) * ingredient.usageQuantity;
            return sum + (isNaN(costPer) ? 0 : costPer);
        }
        return sum;
    }, 0);

    if (ingredients.length === 0) {
        return (
            <div className="text-center py-12 animate-fade-in-up">
                {/* Empty State Illustration */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#FF6B35]/20 to-[#F4511E]/10 flex items-center justify-center">
                    <svg className="w-12 h-12 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">No ingredients yet</h3>
                <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                    Add your ingredients to calculate accurate costs. Start with the basics or use our quick templates.
                </p>

                {/* Quick Add Templates */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {QUICK_ADD_TEMPLATES.map((template) => (
                        <button
                            key={template.name}
                            onClick={() => onAdd({
                                name: template.name,
                                purchaseUnit: template.purchaseUnit as any,
                                usageUnit: template.usageUnit as any,
                            })}
                            className="px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-sm font-medium hover:border-[#FF6B35]/50 hover:text-[#FF6B35] transition-all duration-200"
                        >
                            + {template.name}
                        </button>
                    ))}
                </div>

                {/* Main Add Button */}
                <Button
                    onClick={() => onAdd()}
                    size="lg"
                    leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    }
                >
                    Add Custom Ingredient
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Ingredient Cards */}
            {ingredients.map((ingredient, index) => (
                <IngredientRow
                    key={ingredient.id}
                    ingredient={ingredient}
                    onUpdate={(data) => onUpdate(ingredient.id, data)}
                    onDelete={() => onDelete(ingredient.id)}
                    totalCost={totalCost}
                    index={index}
                />
            ))}

            {/* Add More Button */}
            <div className="pt-4">
                <Button
                    onClick={() => onAdd()}
                    variant="outline"
                    fullWidth
                    leftIcon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    }
                >
                    Add Another Ingredient
                </Button>
            </div>

            {/* Total Summary */}
            {ingredients.length > 0 && totalCost > 0 && (
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl mt-4">
                    <span className="text-sm font-semibold text-slate-400">
                        {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''}
                    </span>
                    <span className="text-sm text-slate-300">
                        Total ingredient cost calculated per portion
                    </span>
                </div>
            )}
        </div>
    );
};

export default IngredientList;
