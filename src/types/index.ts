/**
 * KitchenMath Type Definitions
 * Following Interface Segregation Principle (ISP) - separate interfaces for different concerns
 */

// ============================================================================
// UNIT TYPES
// ============================================================================

/** Supported measurement units */
export type Unit = 'kg' | 'g' | 'l' | 'ml' | 'pcs';

/** Weight units for conversion */
export type WeightUnit = 'kg' | 'g';

/** Volume units for conversion */
export type VolumeUnit = 'l' | 'ml';

/** Unit categories for validation */
export type UnitCategory = 'weight' | 'volume' | 'piece';

// ============================================================================
// CURRENCY TYPES
// ============================================================================

/** Supported currency symbols */
export type CurrencySymbol = '₦' | '$' | '£' | '€';

/** Currency configuration */
export interface CurrencyConfig {
    symbol: CurrencySymbol;
    code: string;
    name: string;
    locale: string;
}

// ============================================================================
// INGREDIENT TYPES
// ============================================================================

/** Ingredient entity - represents a single ingredient in a recipe */
export interface Ingredient {
    id: string;
    name: string;
    purchasePrice: number;       // Cost of the purchase unit
    purchaseQuantity: number;    // How much was purchased
    purchaseUnit: Unit;          // Unit of purchase (e.g., kg)
    usageQuantity: number;       // How much is used per portion
    usageUnit: Unit;             // Unit of usage (e.g., g)
}

/** DTO for creating a new ingredient */
export interface CreateIngredientDTO {
    name: string;
    purchasePrice: number;
    purchaseQuantity: number;
    purchaseUnit: Unit;
    usageQuantity: number;
    usageUnit: Unit;
}

/** DTO for updating an ingredient */
export interface UpdateIngredientDTO extends Partial<CreateIngredientDTO> {
    id: string;
}

// ============================================================================
// RECIPE TYPES
// ============================================================================

/** Recipe entity - represents a complete recipe with all costs */
export interface Recipe {
    id: string;
    name: string;
    ingredients: Ingredient[];
    packagingCost: number;           // Fixed packaging cost per portion
    laborMinutes: number;            // Minutes to prepare
    laborHourlyRate: number;         // Hourly rate for labor calculation
    wastePercentage: number;         // Buffer for spillage/waste (e.g., 5 = 5%)
    platformCommission: number;      // Delivery platform fee (e.g., 20 = 20%)
    targetMargin: number;            // Target profit margin (e.g., 65 = 65%)
    taxRate: number;                 // VAT/Tax rate (e.g., 7.5 = 7.5%)
    usesDeliveryPlatform: boolean;   // Whether sold on delivery apps
    createdAt: string;               // ISO date string
    updatedAt: string;               // ISO date string
}

/** DTO for creating a new recipe */
export interface CreateRecipeDTO {
    name: string;
    packagingCost?: number;
    laborMinutes?: number;
    laborHourlyRate?: number;
    wastePercentage?: number;
    platformCommission?: number;
    targetMargin?: number;
    taxRate?: number;
    usesDeliveryPlatform?: boolean;
}

/** DTO for updating a recipe */
export interface UpdateRecipeDTO extends Partial<Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'ingredients'>> {
    id: string;
}

// ============================================================================
// CALCULATION TYPES
// ============================================================================

/** Calculated costs for a single ingredient */
export interface IngredientCost {
    ingredientId: string;
    ingredientName: string;
    costPerPortion: number;
}

/** Margin health status */
export type MarginStatus = 'healthy' | 'warning' | 'danger';

/** Complete calculation result */
export interface CalculationResult {
    // Cost breakdown
    totalIngredientCost: number;
    packagingCost: number;
    laborCost: number;
    wasteBuffer: number;

    // Key metrics
    truePortionCost: number;      // TPC = ingredients + packaging + labor + waste
    breakEvenPrice: number;        // TPC / (1 - taxRate)
    suggestedRetailPrice: number;  // TPC / (1 - targetMargin)
    deliveryPrice: number;         // RetailPrice / (1 - commission)

    // Profit metrics
    netProfit: number;             // Price - TPC
    deliveryNetProfit: number;     // DeliveryPrice - commission - TPC
    foodCostPercentage: number;    // (ingredients / price) * 100
    actualMargin: number;          // Actual profit margin percentage

    // Health status
    marginStatus: MarginStatus;

    // Per-ingredient breakdown
    ingredientCosts: IngredientCost[];
}

/** Inflation stress test result */
export interface StressTestResult {
    inflationPercentage: number;
    newTruePortionCost: number;
    newMargin: number;
    marginChange: number;
    marginStatus: MarginStatus;
    isViable: boolean;
}

// ============================================================================
// APP STATE TYPES
// ============================================================================

/** Application settings */
export interface AppSettings {
    currency: CurrencySymbol;
    defaultTargetMargin: number;
    defaultTaxRate: number;
    defaultWastePercentage: number;
    defaultPlatformCommission: number;
}

/** Recipe list item for display */
export interface RecipeListItem {
    id: string;
    name: string;
    updatedAt: string;
    ingredientCount: number;
    estimatedProfit?: number;
}

// ============================================================================
// VALIDATION TYPES
// ============================================================================

/** Validation error */
export interface ValidationError {
    field: string;
    message: string;
}

/** Validation result */
export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

// ============================================================================
// EXPORT/IMPORT TYPES
// ============================================================================

/** Export format options */
export type ExportFormat = 'pdf' | 'png' | 'json';

/** Shareable recipe data (for URL encoding) */
export interface ShareableRecipe {
    version: number;
    recipe: Recipe;
    settings: Pick<AppSettings, 'currency'>;
}
