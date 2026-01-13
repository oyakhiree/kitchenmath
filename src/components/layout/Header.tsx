/**
 * Header Component v2.0 (Light Theme - Minimalist)
 * Clean navigation with Apple-inspired design
 */

import React from 'react';
import { Button, Select } from '@/components/ui';
import { useRecipeStore, useRecipes } from '@/stores';

export const Header: React.FC = () => {
    const recipes = useRecipes();
    const { currentRecipeId, setCurrentRecipe, createRecipe } = useRecipeStore();

    const recipeOptions = recipes.map((r) => ({
        value: r.id,
        label: r.name || 'Untitled Recipe',
    }));

    const handleNewRecipe = () => {
        createRecipe({ name: '' });
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-base font-semibold text-gray-900">KitchenMath</h1>
                        </div>
                    </div>

                    {/* Recipe Switcher (Desktop) */}
                    {recipes.length > 1 && (
                        <div className="hidden md:block flex-1 max-w-[200px] mx-6">
                            <select
                                value={currentRecipeId || ''}
                                onChange={(e) => setCurrentRecipe(e.target.value)}
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                            >
                                {recipeOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Actions */}
                    <Button
                        onClick={handleNewRecipe}
                        size="sm"
                        leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        }
                    >
                        New
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
