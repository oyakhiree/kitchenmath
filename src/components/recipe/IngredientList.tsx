/**
 * IngredientList Component
 * Dynamic list of ingredient inputs
 */

import React from 'react';
import { Button } from '@/components/ui';
import { IngredientRow } from './IngredientRow';
import type { Ingredient, CreateIngredientDTO } from '@/types';

interface IngredientListProps {
    ingredients: Ingredient[];
    onAdd: (data: CreateIngredientDTO) => void;
    onUpdate: (id: string, data: Partial<Ingredient>) => void;
    onDelete: (id: string) => void;
}

const defaultIngredient: CreateIngredientDTO = {
    name: '',
    purchasePrice: 0,
    purchaseQuantity: 1,
    purchaseUnit: 'kg',
    usageQuantity: 100,
    usageUnit: 'g',
};

export const IngredientList: React.FC<IngredientListProps> = ({
    ingredients,
    onAdd,
    onUpdate,
    onDelete,
}) => {
    const handleAddIngredient = () => {
        onAdd(defaultIngredient);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">Ingredients</h3>
                    <p className="text-sm text-slate-400">
                        Add each ingredient with purchase and usage details
                    </p>
                </div>
                <span className="text-sm text-slate-500">
                    {ingredients.length} item{ingredients.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Ingredient Cards */}
            {ingredients.length > 0 ? (
                <div className="space-y-3">
                    {ingredients.map((ingredient, index) => (
                        <IngredientRow
                            key={ingredient.id}
                            ingredient={ingredient}
                            onUpdate={(data) => onUpdate(ingredient.id, data)}
                            onDelete={() => onDelete(ingredient.id)}
                            isFirst={index === 0}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-medium text-slate-300 mb-1">No ingredients yet</h4>
                    <p className="text-sm text-slate-500 mb-4">
                        Add your first ingredient to start calculating costs
                    </p>
                </div>
            )}

            {/* Add Button */}
            <Button
                onClick={handleAddIngredient}
                variant="outline"
                fullWidth
                leftIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                }
            >
                Add Ingredient
            </Button>
        </div>
    );
};

export default IngredientList;
