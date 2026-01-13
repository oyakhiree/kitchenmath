/**
 * Recipe Store
 * Manages recipes with CRUD operations and persistence
 * Open/Closed Principle (OCP) - extensible for new operations without modification
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
    Recipe,
    Ingredient,
    CreateRecipeDTO,
    UpdateRecipeDTO,
    CreateIngredientDTO,
    UpdateIngredientDTO,
} from '@/types';
import { DEFAULT_RECIPE_VALUES, STORAGE_KEYS, UI_CONFIG } from '@/constants';

interface RecipeState {
    // State
    recipes: Recipe[];
    currentRecipeId: string | null;

    // Computed (will be derived)
    currentRecipe: Recipe | null;

    // Recipe CRUD Actions
    createRecipe: (data: CreateRecipeDTO) => Recipe;
    updateRecipe: (data: UpdateRecipeDTO) => void;
    deleteRecipe: (id: string) => void;
    duplicateRecipe: (id: string) => Recipe | null;
    setCurrentRecipe: (id: string | null) => void;

    // Ingredient CRUD Actions
    addIngredient: (recipeId: string, data: CreateIngredientDTO) => Ingredient;
    updateIngredient: (recipeId: string, data: UpdateIngredientDTO) => void;
    deleteIngredient: (recipeId: string, ingredientId: string) => void;
    reorderIngredients: (recipeId: string, fromIndex: number, toIndex: number) => void;

    // Utility Actions
    clearAllRecipes: () => void;
    importRecipe: (recipe: Recipe) => Recipe;
    getRecipeById: (id: string) => Recipe | undefined;
}

/**
 * Create a new recipe with default values
 */
function createNewRecipe(data: CreateRecipeDTO): Recipe {
    const now = new Date().toISOString();
    return {
        id: uuidv4(),
        name: data.name,
        ingredients: [],
        packagingCost: data.packagingCost ?? DEFAULT_RECIPE_VALUES.packagingCost,
        laborMinutes: data.laborMinutes ?? DEFAULT_RECIPE_VALUES.laborMinutes,
        laborHourlyRate: data.laborHourlyRate ?? DEFAULT_RECIPE_VALUES.laborHourlyRate,
        wastePercentage: data.wastePercentage ?? DEFAULT_RECIPE_VALUES.wastePercentage,
        platformCommission: data.platformCommission ?? DEFAULT_RECIPE_VALUES.platformCommission,
        targetMargin: data.targetMargin ?? DEFAULT_RECIPE_VALUES.targetMargin,
        taxRate: data.taxRate ?? DEFAULT_RECIPE_VALUES.taxRate,
        usesDeliveryPlatform: data.usesDeliveryPlatform ?? DEFAULT_RECIPE_VALUES.usesDeliveryPlatform,
        createdAt: now,
        updatedAt: now,
    };
}

/**
 * Create a new ingredient
 */
function createNewIngredient(data: CreateIngredientDTO): Ingredient {
    return {
        id: uuidv4(),
        ...data,
    };
}

export const useRecipeStore = create<RecipeState>()(
    persist(
        (set, get) => ({
            // Initial state
            recipes: [],
            currentRecipeId: null,

            // Computed property (getter pattern)
            get currentRecipe() {
                const { recipes, currentRecipeId } = get();
                return recipes.find(r => r.id === currentRecipeId) ?? null;
            },

            // Recipe CRUD
            createRecipe: (data) => {
                const recipe = createNewRecipe(data);
                set((state) => {
                    // Check max recipes limit
                    if (state.recipes.length >= UI_CONFIG.maxRecipes) {
                        console.warn('Maximum recipes limit reached');
                        return state;
                    }
                    return {
                        recipes: [...state.recipes, recipe],
                        currentRecipeId: recipe.id,
                    };
                });
                return recipe;
            },

            updateRecipe: (data) => {
                set((state) => ({
                    recipes: state.recipes.map((recipe) =>
                        recipe.id === data.id
                            ? { ...recipe, ...data, updatedAt: new Date().toISOString() }
                            : recipe
                    ),
                }));
            },

            deleteRecipe: (id) => {
                set((state) => ({
                    recipes: state.recipes.filter((recipe) => recipe.id !== id),
                    currentRecipeId: state.currentRecipeId === id ? null : state.currentRecipeId,
                }));
            },

            duplicateRecipe: (id) => {
                const { recipes } = get();
                const original = recipes.find(r => r.id === id);
                if (!original) return null;

                const now = new Date().toISOString();
                const duplicate: Recipe = {
                    ...original,
                    id: uuidv4(),
                    name: `${original.name} (Copy)`,
                    ingredients: original.ingredients.map(ing => ({
                        ...ing,
                        id: uuidv4(),
                    })),
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    recipes: [...state.recipes, duplicate],
                    currentRecipeId: duplicate.id,
                }));

                return duplicate;
            },

            setCurrentRecipe: (id) => {
                set({ currentRecipeId: id });
            },

            // Ingredient CRUD
            addIngredient: (recipeId, data) => {
                const ingredient = createNewIngredient(data);
                set((state) => ({
                    recipes: state.recipes.map((recipe) => {
                        if (recipe.id !== recipeId) return recipe;
                        // Check max ingredients limit
                        if (recipe.ingredients.length >= UI_CONFIG.maxIngredients) {
                            console.warn('Maximum ingredients limit reached');
                            return recipe;
                        }
                        return {
                            ...recipe,
                            ingredients: [...recipe.ingredients, ingredient],
                            updatedAt: new Date().toISOString(),
                        };
                    }),
                }));
                return ingredient;
            },

            updateIngredient: (recipeId, data) => {
                set((state) => ({
                    recipes: state.recipes.map((recipe) => {
                        if (recipe.id !== recipeId) return recipe;
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients.map((ing) =>
                                ing.id === data.id ? { ...ing, ...data } : ing
                            ),
                            updatedAt: new Date().toISOString(),
                        };
                    }),
                }));
            },

            deleteIngredient: (recipeId, ingredientId) => {
                set((state) => ({
                    recipes: state.recipes.map((recipe) => {
                        if (recipe.id !== recipeId) return recipe;
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients.filter((ing) => ing.id !== ingredientId),
                            updatedAt: new Date().toISOString(),
                        };
                    }),
                }));
            },

            reorderIngredients: (recipeId, fromIndex, toIndex) => {
                set((state) => ({
                    recipes: state.recipes.map((recipe) => {
                        if (recipe.id !== recipeId) return recipe;
                        const ingredients = [...recipe.ingredients];
                        const [removed] = ingredients.splice(fromIndex, 1);
                        ingredients.splice(toIndex, 0, removed);
                        return {
                            ...recipe,
                            ingredients,
                            updatedAt: new Date().toISOString(),
                        };
                    }),
                }));
            },

            // Utility Actions
            clearAllRecipes: () => {
                set({ recipes: [], currentRecipeId: null });
            },

            importRecipe: (recipe) => {
                const now = new Date().toISOString();
                const imported: Recipe = {
                    ...recipe,
                    id: uuidv4(),
                    ingredients: recipe.ingredients.map(ing => ({
                        ...ing,
                        id: uuidv4(),
                    })),
                    createdAt: now,
                    updatedAt: now,
                };

                set((state) => ({
                    recipes: [...state.recipes, imported],
                    currentRecipeId: imported.id,
                }));

                return imported;
            },

            getRecipeById: (id) => {
                return get().recipes.find(r => r.id === id);
            },
        }),
        {
            name: STORAGE_KEYS.recipes,
            partialize: (state) => ({
                recipes: state.recipes,
                currentRecipeId: state.currentRecipeId,
            }),
        }
    )
);

// Selector hooks
export const useCurrentRecipe = () => {
    const recipes = useRecipeStore((state) => state.recipes);
    const currentRecipeId = useRecipeStore((state) => state.currentRecipeId);
    return recipes.find(r => r.id === currentRecipeId) ?? null;
};

export const useRecipes = () => useRecipeStore((state) => state.recipes);
export const useRecipeCount = () => useRecipeStore((state) => state.recipes.length);
