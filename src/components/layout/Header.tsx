/**
 * Header Component
 * App header with navigation and recipe switcher
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
        createRecipe({ name: 'New Recipe' });
    };

    return (
        <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">
                                Kitchen<span className="text-emerald-400">Math</span>
                            </h1>
                            <p className="text-xs text-slate-500 hidden sm:block">Profit Engine</p>
                        </div>
                    </div>

                    {/* Recipe Switcher */}
                    <div className="flex items-center gap-3 flex-1 max-w-xs">
                        {recipes.length > 0 && (
                            <Select
                                value={currentRecipeId || ''}
                                onChange={(e) => setCurrentRecipe(e.target.value)}
                                options={recipeOptions}
                                placeholder="Select recipe..."
                            />
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={handleNewRecipe}
                            size="sm"
                            leftIcon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            }
                        >
                            <span className="hidden sm:inline">New Recipe</span>
                            <span className="sm:hidden">New</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
