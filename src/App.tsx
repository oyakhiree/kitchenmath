/**
 * KitchenMath - Main Application
 * The Profit Engine for Food Vendors
 */

import React, { useEffect } from 'react';
import { Header } from '@/components/layout';
import { IngredientList, OverheadSection, PricingConfig } from '@/components/recipe';
import { ResultsPanel } from '@/components/dashboard';
import { Input, Card, Button } from '@/components/ui';
import { useRecipeStore, useCurrentRecipe, useRecipes } from '@/stores';

const App: React.FC = () => {
  const recipes = useRecipes();
  const currentRecipe = useCurrentRecipe();
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

  // Landing state when no recipe is selected/created yet
  if (!currentRecipe) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Kitchen<span className="text-emerald-400">Math</span>
          </h1>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Calculate your true food costs and find the perfect price for profit.
          </p>
          <Button
            onClick={() => createRecipe({ name: 'My First Recipe' })}
            size="lg"
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Start a New Calculation
          </Button>
          {recipes.length > 0 && (
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-3">Or continue with a saved recipe:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {recipes.slice(0, 5).map((recipe) => (
                  <button
                    key={recipe.id}
                    onClick={() => setCurrentRecipe(recipe.id)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors"
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Recipe Builder */}
          <div className="lg:col-span-7 space-y-6">
            {/* Recipe Name */}
            <Card variant="glass" padding="md">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    value={currentRecipe.name}
                    onChange={(e) => updateRecipe({ id: currentRecipe.id, name: e.target.value })}
                    placeholder="Recipe name (e.g., Jollof Rice)"
                    className="text-xl font-semibold bg-transparent border-0 p-0 focus:ring-0"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Last updated: {new Date(currentRecipe.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm('Delete this recipe?')) {
                      deleteRecipe(currentRecipe.id);
                    }
                  }}
                  className="text-slate-500 hover:text-red-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </div>
            </Card>

            {/* Pricing Config */}
            <PricingConfig
              recipe={currentRecipe}
              onUpdate={(data) => updateRecipe({ id: currentRecipe.id, ...data })}
            />

            {/* Ingredients */}
            <Card variant="default" padding="md">
              <IngredientList
                ingredients={currentRecipe.ingredients}
                onAdd={(data) => addIngredient(currentRecipe.id, data)}
                onUpdate={(id, data) => updateIngredient(currentRecipe.id, { id, ...data })}
                onDelete={(id) => deleteIngredient(currentRecipe.id, id)}
              />
            </Card>

            {/* Overhead Costs */}
            <Card variant="default" padding="md">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">Hidden Costs</h3>
                <p className="text-sm text-slate-400">
                  The professional layer - don&apos;t forget these!
                </p>
              </div>
              <OverheadSection
                recipe={currentRecipe}
                onUpdate={(data) => updateRecipe({ id: currentRecipe.id, ...data })}
              />
            </Card>
          </div>

          {/* Right Column - Results Dashboard */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <Card variant="elevated" padding="md">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Decision Dashboard
                  </h3>
                  <p className="text-sm text-slate-400">Real-time cost analysis</p>
                </div>
                <ResultsPanel recipe={currentRecipe} />
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-400">KitchenMath</span> — Privacy-first profit calculator for food vendors
              </p>
              <p className="text-xs text-slate-600 mt-1">
                All data stored locally on your device. No signup required.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 transition-colors"
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
