/**
 * KitchenMath - Main Application v2.0 (Light Theme - Minimalist)
 * Clean, Apple-inspired design system
 */

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout';
import { IngredientList, OverheadSection, PricingConfig } from '@/components/recipe';
import { ResultsPanel } from '@/components/dashboard';
import { Button } from '@/components/ui';
import { useRecipeStore, useCurrentRecipe, useRecipes, useCurrency } from '@/stores';
import { CURRENCIES } from '@/constants';

const App: React.FC = () => {
  const recipes = useRecipes();
  const currentRecipe = useCurrentRecipe();
  const defaultCurrency = useCurrency();
  const [mobileResultsOpen, setMobileResultsOpen] = useState(false);
  const {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    setCurrentRecipe,
  } = useRecipeStore();

  // Create a default recipe if none exist
  useEffect(() => {
    if (recipes.length === 0) {
      createRecipe({ name: '' });
    } else if (!currentRecipe && recipes.length > 0) {
      setCurrentRecipe(recipes[0].id);
    }
  }, [recipes.length, currentRecipe, createRecipe, setCurrentRecipe]);

  // Landing state
  if (!currentRecipe) {
    // ... (rest of landing state is fine)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        {/* ... */}
        {/* re-implementing truncated part to ensure match if needed, but actually I can target the component return block instead */}
        {/* To allow replace to work, I should just target the import block and the main return block separately or combine if close */}
        <div className="text-center max-w-sm animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">KitchenMath</h1>
          <p className="text-gray-500 mb-8">Calculate food costs and find the right price.</p>

          <Button
            onClick={() => createRecipe({ name: '' })}
            size="lg"
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  // Derive active currency
  const activeCurrencySymbol = currentRecipe.currency
    ? Object.values(CURRENCIES).find(c => c.code === currentRecipe.currency)?.symbol || defaultCurrency
    : defaultCurrency;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Recipe Builder */}
          <div className="lg:col-span-7 space-y-6">
            {/* Recipe Name */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-fade-in-up">
              <div className="flex items-center gap-4">
                <input
                  value={currentRecipe.name}
                  onChange={(e) => updateRecipe({ id: currentRecipe.id, name: e.target.value })}
                  placeholder="Recipe name (e.g., Jollof Rice)"
                  className="flex-1 text-xl font-semibold text-gray-900 placeholder-gray-400 bg-transparent border-0 focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this recipe?')) {
                      deleteRecipe(currentRecipe.id);
                    }
                  }}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pricing Config */}
            <div className="animate-fade-in-up delay-1">
              <PricingConfig
                recipe={currentRecipe}
                onUpdate={(data) => updateRecipe({ id: currentRecipe.id, ...data })}
              />
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-fade-in-up delay-2">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
                <p className="text-sm text-gray-500 mt-0.5">Add purchase and usage details</p>
              </div>
              <IngredientList
                ingredients={currentRecipe.ingredients}
                currencySymbol={activeCurrencySymbol}
                onAdd={(data) => addIngredient(currentRecipe.id, {
                  name: data?.name || '',
                  purchasePrice: data?.purchasePrice || 0,
                  purchaseQuantity: data?.purchaseQuantity || 1,
                  purchaseUnit: data?.purchaseUnit || 'kg',
                  usageQuantity: data?.usageQuantity || 0,
                  usageUnit: data?.usageUnit || 'g',
                })}
                onUpdate={(id, data) => updateIngredient(currentRecipe.id, { id, ...data })}
                onDelete={(id) => deleteIngredient(currentRecipe.id, id)}
              />
            </div>

            {/* Overhead Costs */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-fade-in-up delay-3">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Hidden Costs</h2>
                <p className="text-sm text-gray-500 mt-0.5">Packaging, labor, waste, and fees</p>
              </div>
              <OverheadSection
                recipe={currentRecipe}
                onUpdate={(data) => updateRecipe({ id: currentRecipe.id, ...data })}
              />
            </div>
          </div>

          {/* Right Column - Results (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fade-in-up">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">Pricing Analysis</h2>
                </div>
                <ResultsPanel recipe={currentRecipe} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden">
        {!mobileResultsOpen && currentRecipe.ingredients.length > 0 && (
          <button
            onClick={() => setMobileResultsOpen(true)}
            className="fixed bottom-6 left-4 right-4 z-40 flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-lg animate-fade-in-up"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">Tap to view</p>
                <p className="text-base font-semibold text-gray-900">Pricing Analysis</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}

        {mobileResultsOpen && (
          <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setMobileResultsOpen(false)} />
        )}

        <div className={`
          fixed bottom-0 left-0 right-0 z-50 
          bg-white rounded-t-3xl shadow-2xl
          transition-transform duration-300 ease-out
          max-h-[85vh] overflow-hidden
          ${mobileResultsOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <button
            onClick={() => setMobileResultsOpen(false)}
            className="absolute top-0 left-0 right-0 h-10 flex items-center justify-center"
          >
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </button>

          <div className="pt-8 pb-8 px-5 overflow-y-auto max-h-[calc(85vh-32px)]">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Pricing Analysis</h2>
            </div>
            <ResultsPanel recipe={currentRecipe} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`border-t border-gray-200 mt-16 bg-white transition-all duration-300 ${currentRecipe.ingredients.length > 0 ? 'pb-32' : 'pb-12'
        } lg:pb-0`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-4">
            <p className="text-sm text-gray-500 font-medium text-center sm:text-left">
              KitchenMath — All data stored locally
            </p>
            <a
              href="https://github.com/oyakhiree/kitchenmath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 transition-colors p-2 -m-2"
              aria-label="View source on GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
