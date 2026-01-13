/**
 * Header Component v2.1 (Refined UX)
 * Standardized application header with clear hierarchy
 */

import React from 'react';
import { Button } from '@/components/ui';
import { useRecipeStore, useRecipes } from '@/stores';

export const Header: React.FC = () => {
    const recipes = useRecipes();
    const { currentRecipeId, setCurrentRecipe, createRecipe } = useRecipeStore();

    const handleNewRecipe = () => {
        createRecipe({ name: '' });
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Brand & Context */}
                    <div className="flex items-center gap-6">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-gray-900 tracking-tight hidden sm:block">
                                KitchenMath
                            </span>
                        </div>

                        {/* Divider */}
                        {recipes.length > 0 && (
                            <div className="h-6 w-px bg-gray-200 hidden md:block" />
                        )}

                        {/* Context Switcher (Recipe Selector) */}
                        {recipes.length > 0 && (
                            <div className="hidden md:flex items-center">
                                <span className="text-sm text-gray-500 mr-2">Recipe:</span>
                                <div className="relative group">
                                    <select
                                        value={currentRecipeId || ''}
                                        onChange={(e) => setCurrentRecipe(e.target.value)}
                                        className="appearance-none bg-transparent pl-0 pr-8 py-1 text-sm font-semibold text-gray-900 border-none focus:ring-0 cursor-pointer hover:text-orange-600 transition-colors"
                                    >
                                        {recipes.map((r) => (
                                            <option key={r.id} value={r.id}>
                                                {r.name || 'Untitled Recipe'}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Custom Dropdown Chevron */}
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handleNewRecipe}
                            size="sm"
                            variant="primary"
                            className="rounded-full px-2.5 py-1.5 h-8 text-xs md:text-sm md:px-5 md:h-9"
                            leftIcon={
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            }
                        >
                            <span className="hidden md:inline">New Recipe</span>
                            <span className="md:hidden">New</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
