/**
 * KitchenMath - Main Application v2.0
 * The Profit Engine for Food Vendors
 * 
 * Redesigned with food delivery industry UX standards
 */

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout';
import { IngredientList, OverheadSection, PricingConfig } from '@/components/recipe';
import { ResultsPanel } from '@/components/dashboard';
import { Card, Button } from '@/components/ui';
import { useRecipeStore, useCurrentRecipe, useRecipes } from '@/stores';

const App: React.FC = () => {
  const recipes = useRecipes();
  const currentRecipe = useCurrentRecipe();
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

  // Landing state - show onboarding
  if (!currentRecipe) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-fade-in-up">
          {/* Hero Icon */}
          <div className="w-28 h-28 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-[#FF6B35] to-[#F4511E] flex items-center justify-center shadow-2xl shadow-[#FF6B35]/30">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-3 font-display">
            Kitchen<span className="text-[#FF6B35]">Math</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8">
            Calculate your true food costs and find the perfect price for profit.
          </p>

          <Button
            onClick={() => createRecipe({ name: '' })}
            size="lg"
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Start Calculating
          </Button>

          {recipes.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-4">Or continue with a saved recipe:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {recipes.slice(0, 4).map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => setCurrentRecipe(recipe.id)}
                    className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    {recipe.name || 'Untitled'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#FF6B35]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#2EC4B6]/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-32 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Recipe Builder */}
          <div className="lg:col-span-7 space-y-6">
            {/* Recipe Name Card */}
            <Card variant="glass" padding="md" className="animate-fade-in-up">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#F4511E]/10 flex items-center justify-center text-[#FF6B35] shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <input
                    value={currentRecipe.name}
                    onChange={(e) => updateRecipe({ id: currentRecipe.id, name: e.target.value })}
                    placeholder="What are you making? (e.g., Jollof Rice)"
                    className="w-full bg-transparent border-0 text-xl font-bold text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Last updated: {new Date(currentRecipe.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this recipe? This cannot be undone.')) {
                      deleteRecipe(currentRecipe.id);
                    }
                  }}
                  className="p-2.5 rounded-xl text-slate-500 hover:text-[#F44336] hover:bg-[#F44336]/10 transition-all duration-200"
                  title="Delete recipe"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </Card>

            {/* Pricing Config */}
            <div className="animate-fade-in-up delay-1">
              <PricingConfig
                recipe={currentRecipe}
                onUpdate={(data) => updateRecipe({ id: currentRecipe.id, ...data })}
              />
            </div>

            {/* Ingredients Section */}
            <Card variant="default" padding="md" className="animate-fade-in-up delay-2">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Ingredients
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Add your ingredients with purchase and usage quantities
                </p>
              </div>
              <IngredientList
                ingredients={currentRecipe.ingredients}
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
            </Card>

            {/* Overhead Costs Section */}
            <Card variant="default" padding="md" className="animate-fade-in-up delay-3">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hidden Costs
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  The professional layer — don&apos;t forget these!
                </p>
              </div>
              <OverheadSection
                recipe={currentRecipe}
                onUpdate={(data) => updateRecipe({ id: currentRecipe.id, ...data })}
              />
            </Card>
          </div>

          {/* Right Column - Results Dashboard (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <Card variant="elevated" padding="md" className="animate-fade-in-up">
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Decision Dashboard
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Real-time pricing analysis</p>
                </div>
                <ResultsPanel recipe={currentRecipe} />
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Sheet Results */}
      <div className="lg:hidden">
        {/* Floating Price Button (collapsed state) */}
        {!mobileResultsOpen && currentRecipe.ingredients.length > 0 && (
          <button
            onClick={() => setMobileResultsOpen(true)}
            className="fixed bottom-6 left-4 right-4 z-40 flex items-center justify-between p-4 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/60 shadow-2xl shadow-black/40 animate-fade-in-up"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#43A047] flex items-center justify-center shadow-lg shadow-[#4CAF50]/25">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400">Suggested Price</p>
                <p className="text-xl font-bold text-white font-display">
                  View Results
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}

        {/* Bottom Sheet Overlay */}
        {mobileResultsOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileResultsOpen(false)}
          />
        )}

        {/* Bottom Sheet */}
        <div className={`
          fixed bottom-0 left-0 right-0 z-50 
          bg-slate-900 rounded-t-3xl 
          shadow-2xl shadow-black/50
          transition-transform duration-300 ease-out
          max-h-[85vh] overflow-hidden
          ${mobileResultsOpen ? 'translate-y-0' : 'translate-y-full'}
        `}>
          {/* Handle */}
          <button
            onClick={() => setMobileResultsOpen(false)}
            className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center"
          >
            <div className="w-10 h-1 bg-slate-600 rounded-full" />
          </button>

          {/* Content */}
          <div className="pt-8 pb-8 px-4 overflow-y-auto max-h-[calc(85vh-32px)]">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Decision Dashboard
              </h3>
              <p className="text-sm text-slate-400 mt-1">Real-time pricing analysis</p>
            </div>
            <ResultsPanel recipe={currentRecipe} />
          </div>
        </div>
      </div>

      {/* Footer (Desktop only) */}
      <footer className="hidden lg:block relative border-t border-slate-800/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-400">
                <span className="font-bold">KitchenMath</span> — Privacy-first profit calculator
              </p>
              <p className="text-xs text-slate-500 mt-1">
                All data stored locally. No signup required.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/oyakhiree/kitchenmath"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-[#FF6B35] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
