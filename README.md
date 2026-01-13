<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-emerald?style=for-the-badge" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License" />
  <img src="https://img.shields.io/badge/react-19.2-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/typescript-5.9-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
</p>

<h1 align="center">🍳 KitchenMath</h1>

<p align="center">
  <strong>The Profit Engine for Food Vendors</strong><br/>
  <em>Move from vibes-based pricing to data-driven profitability.</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Documentation</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Usage Guide](#-usage-guide)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Core Calculations](#-core-calculations)
- [Type System](#-type-system)
- [State Management](#-state-management)
- [Configuration](#-configuration)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [FAQ](#-faq)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**KitchenMath** is a privacy-first, client-side web application designed to help food entrepreneurs calculate their true Cost of Goods Sold (COGS), factor in hidden overheads, and generate optimal retail prices based on industry-standard margin targets.

### Why KitchenMath?

Most food vendors calculate profit by simply doubling ingredient costs. This approach fails to account for:

| Hidden Cost | Impact |
|-------------|--------|
| **Yield Loss** | Peeling potatoes reduces usable weight by ~20% |
| **Unit Disparity** | Buying in kg but cooking in grams leads to estimation errors |
| **Overhead Costs** | Gas, oil, packaging, and delivery commissions eat into margins |
| **Market Inflation** | Rapid price changes (especially in markets like Nigeria) erode profitability |

KitchenMath solves these problems with **smart unit conversion**, **real-time calculations**, and **inflation stress testing**.

---

## 🔴 Problem Statement

> **"Mama Basira the Smart Caterer"** sells a plate of rice for ₦3,000 thinking she makes ₦1,500 profit. But after factoring in the plastic container, the cooking oil, and the shop rent, she's actually only making ₦200.

KitchenMath transforms guesswork into precision, helping vendors like Mama Basira understand their true costs and set profitable prices.

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| 🧮 **Smart Unit Conversion** | Buy in kg, use in grams — we handle the math automatically |
| ⚡ **Real-Time Calculations** | See pricing update instantly as you type |
| 📦 **Hidden Cost Tracking** | Packaging, labor, waste buffer, and platform commissions |
| 📊 **Decision Dashboard** | Visual metrics with color-coded margin health |
| 📈 **Inflation Stress Test** | Simulate how rising costs affect your margins |
| 💾 **Auto-Save** | All data persisted to localStorage automatically |
| 📱 **Mobile-First** | Designed for phones where vendors work |
| 🔒 **Privacy-First** | No signup, no servers, no tracking |

### Smart Features

- **Automatic Cost Calculation**: Enter "50kg bag @ ₦85,000, using 200g per portion" → App calculates ₦340/portion
- **Margin Presets**: Quick buttons for Retail (40%), Restaurant (65%), and Premium (75%) margins
- **Platform Fee Inflation**: Automatically inflate delivery prices to maintain target profit after commission
- **Multi-Currency Support**: ₦ (NGN), $ (USD), £ (GBP), € (EUR)
- **Recipe Management**: Save multiple recipes and switch between them

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | 18.0+ | `node --version` |
| npm | 9.0+ | `npm --version` |
| Git | 2.0+ | `git --version` |

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kitchenmath.git

# Navigate to project directory
cd kitchenmath

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | TypeScript check + production build |
| Preview | `npm run preview` | Preview production build locally |
| Lint | `npm run lint` | Run ESLint on all files |

---

## 📖 Usage Guide

### Step 1: Create a Recipe

Click "Start a New Calculation" or enter a recipe name in the input field. Each recipe represents a single dish or menu item.

### Step 2: Add Ingredients

For each ingredient, provide:

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | Ingredient identifier | "Rice" |
| **Purchase Price** | Total cost paid | ₦85,000 |
| **Purchase Quantity** | Amount bought | 50 |
| **Purchase Unit** | Unit of purchase | kg |
| **Usage Quantity** | Amount per portion | 200 |
| **Usage Unit** | Unit of usage | g |

The app automatically calculates the cost per portion using smart unit conversion.

### Step 3: Configure Overhead Costs

Expand the accordion sections to add:

- **Packaging**: Containers, cutlery, napkins (₦/portion)
- **Labor**: Prep time × hourly rate
- **Waste Buffer**: 5-10% for spillage/mistakes
- **Platform Commission**: Delivery app fees (if applicable)
- **Tax Rate**: VAT or sales tax percentage

### Step 4: Set Target Margin

Use the slider or quick presets:

| Preset | Margin | Use Case |
|--------|--------|----------|
| Retail | 40% | Bulk sales, wholesale |
| Restaurant | 65% | Dine-in, takeout |
| Premium | 75% | High-end, specialty |

### Step 5: Review Decision Dashboard

The dashboard shows:

- **Suggested Retail Price**: Your optimal selling price
- **Delivery App Price**: Inflated price to cover commission
- **COGS**: True cost to produce one portion
- **Net Profit**: Actual money in pocket per sale
- **Food Cost %**: Industry-standard metric (target: <35%)
- **Break-Even**: Minimum price to cover costs

### Step 6: Stress Test Margins

Use the inflation slider to see how rising ingredient costs would affect your margins at the current price. If margins go negative, consider raising prices.

---

## 🏗 Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | React 19 | UI components and rendering |
| **Language** | TypeScript 5.9 | Type safety and developer experience |
| **Styling** | Tailwind CSS 4 | Utility-first CSS framework |
| **State** | Zustand + Persist | Lightweight state with localStorage sync |
| **Build** | Vite 7 | Fast development and optimized builds |
| **Linting** | ESLint 9 | Code quality and consistency |

### Design Principles

This project strictly follows **SOLID principles**:

#### S — Single Responsibility Principle
Each module handles exactly one concern:

```
utils/
├── calculations.ts   → Only pricing formulas
├── unitConversion.ts → Only unit math
├── formatting.ts     → Only display formatting
├── validation.ts     → Only input validation
└── storage.ts        → Only localStorage operations
```

#### O — Open/Closed Principle
The recipe store is extensible without modification:

```typescript
// Add new actions without changing existing ones
const useRecipeStore = create((set, get) => ({
  // ... existing actions remain unchanged
  newFeature: () => { /* extend functionality */ }
}));
```

#### L — Liskov Substitution Principle
All UI components follow consistent interfaces:

```typescript
// Any component with these props can be substituted
interface BaseInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
}
```

#### I — Interface Segregation Principle
Types are split by domain, not combined into monoliths:

```typescript
// Separate interfaces for different concerns
interface Ingredient { /* ingredient fields */ }
interface Recipe { /* recipe fields */ }
interface CalculationResult { /* calculation fields */ }
```

#### D — Dependency Inversion Principle
Hooks depend on abstractions (types), not concretions:

```typescript
// Hook depends on Recipe type, not specific implementation
function useCalculations(recipe: Recipe | null): CalculationResult | null
```

---

## 📁 Project Structure

```
kitchenmath/
├── 📂 public/                    # Static assets
│   └── vite.svg                  # Favicon
│
├── 📂 src/
│   ├── 📂 components/            # React components
│   │   ├── 📂 ui/               # Base UI components (atoms)
│   │   │   ├── Button.tsx       # Button with variants
│   │   │   ├── Input.tsx        # Text/number input
│   │   │   ├── Select.tsx       # Dropdown select
│   │   │   ├── Card.tsx         # Card container
│   │   │   ├── Slider.tsx       # Range slider
│   │   │   ├── Toggle.tsx       # Toggle switch
│   │   │   ├── MetricCard.tsx   # Dashboard metric display
│   │   │   ├── Accordion.tsx    # Collapsible panel
│   │   │   └── index.ts         # Barrel export
│   │   │
│   │   ├── 📂 layout/           # Layout components
│   │   │   ├── Header.tsx       # App header with navigation
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 recipe/           # Recipe builder components
│   │   │   ├── IngredientRow.tsx    # Single ingredient input
│   │   │   ├── IngredientList.tsx   # Dynamic ingredient list
│   │   │   ├── OverheadSection.tsx  # Hidden costs accordion
│   │   │   ├── PricingConfig.tsx    # Margin/currency config
│   │   │   └── index.ts
│   │   │
│   │   ├── 📂 dashboard/        # Results components
│   │   │   ├── ResultsPanel.tsx # Decision dashboard
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts             # Main component export
│   │
│   ├── 📂 hooks/                # Custom React hooks
│   │   ├── useCalculations.ts   # Recipe calculation hook
│   │   ├── useDebounce.ts       # Debounce values
│   │   ├── useLocalStorage.ts   # localStorage sync
│   │   └── index.ts
│   │
│   ├── 📂 stores/               # Zustand state stores
│   │   ├── settingsStore.ts     # App settings (currency, defaults)
│   │   ├── recipeStore.ts       # Recipe CRUD operations
│   │   └── index.ts
│   │
│   ├── 📂 types/                # TypeScript definitions
│   │   └── index.ts             # All type exports
│   │
│   ├── 📂 utils/                # Utility functions
│   │   ├── calculations.ts      # Core pricing formulas
│   │   ├── unitConversion.ts    # Smart unit conversion
│   │   ├── formatting.ts        # Currency/percentage formatting
│   │   ├── validation.ts        # Input validation
│   │   ├── storage.ts           # localStorage utilities
│   │   └── index.ts
│   │
│   ├── 📂 constants/            # App constants
│   │   └── index.ts             # All configuration values
│   │
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # React entry point
│   └── index.css                # Global styles + Tailwind
│
├── 📄 index.html                # HTML template with SEO
├── 📄 package.json              # Dependencies and scripts
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 tsconfig.app.json         # App-specific TS config
├── 📄 tsconfig.node.json        # Node-specific TS config
├── 📄 vite.config.ts            # Vite configuration
├── 📄 eslint.config.js          # ESLint configuration
├── 📄 LICENSE                   # MIT License
└── 📄 README.md                 # This file
```

---

## 🧮 Core Calculations

### True Portion Cost (TPC)

The foundation of all pricing calculations:

```
TPC = Σ(Ingredient Costs) + Packaging + Labor + Waste Buffer
```

Where:
- **Ingredient Costs** = Σ((Purchase Price / Purchase Qty) × Usage Qty)
- **Waste Buffer** = (Ingredients + Packaging + Labor) × Waste %

### Break-Even Price

The minimum price to cover costs without profit:

```
Break-Even = TPC / (1 - Tax Rate)
```

### Suggested Retail Price

The price that achieves your target margin:

```
Retail Price = TPC / (1 - Target Margin %)
```

**Example**: If TPC = ₦1,000 and Target Margin = 65%:
```
Retail Price = 1000 / (1 - 0.65) = 1000 / 0.35 = ₦2,857
```

### Delivery Platform Price

Inflated price to maintain profit after commission:

```
Delivery Price = Retail Price / (1 - Commission %)
```

**Example**: If Retail = ₦2,857 and Commission = 20%:
```
Delivery Price = 2857 / (1 - 0.20) = 2857 / 0.80 = ₦3,571
```

This ensures you receive ₦2,857 after the platform takes their 20%.

### Food Cost Percentage

Industry-standard metric for cost efficiency:

```
Food Cost % = (Ingredient Cost / Retail Price) × 100
```

**Target**: < 30% (excellent) | 30-35% (good) | > 35% (warning)

---

## 📐 Type System

### Core Types

```typescript
// Measurement units
type Unit = 'kg' | 'g' | 'l' | 'ml' | 'pcs';

// Supported currencies
type CurrencySymbol = '₦' | '$' | '£' | '€';

// Margin health status
type MarginStatus = 'healthy' | 'warning' | 'danger';
```

### Ingredient Interface

```typescript
interface Ingredient {
  id: string;
  name: string;
  purchasePrice: number;       // Cost of purchase unit
  purchaseQuantity: number;    // Quantity purchased
  purchaseUnit: Unit;          // Unit (kg, l, pcs)
  usageQuantity: number;       // Quantity per portion
  usageUnit: Unit;             // Unit of usage
}
```

### Recipe Interface

```typescript
interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  packagingCost: number;           // Fixed cost per portion
  laborMinutes: number;            // Prep time
  laborHourlyRate: number;         // Wage rate
  wastePercentage: number;         // Buffer (default: 5%)
  platformCommission: number;      // App fee (default: 20%)
  targetMargin: number;            // Goal margin (default: 65%)
  taxRate: number;                 // VAT (default: 7.5%)
  usesDeliveryPlatform: boolean;   // Delivery pricing enabled
  createdAt: string;               // ISO timestamp
  updatedAt: string;               // ISO timestamp
}
```

### Calculation Result Interface

```typescript
interface CalculationResult {
  // Cost breakdown
  totalIngredientCost: number;
  packagingCost: number;
  laborCost: number;
  wasteBuffer: number;
  
  // Key metrics
  truePortionCost: number;
  breakEvenPrice: number;
  suggestedRetailPrice: number;
  deliveryPrice: number;
  
  // Profit metrics
  netProfit: number;
  deliveryNetProfit: number;
  foodCostPercentage: number;
  actualMargin: number;
  
  // Health status
  marginStatus: MarginStatus;
  
  // Breakdown
  ingredientCosts: IngredientCost[];
}
```

---

## 🗄 State Management

### Settings Store

Manages application-wide settings with persistence:

```typescript
interface SettingsState {
  currency: CurrencySymbol;
  defaultTargetMargin: number;
  defaultTaxRate: number;
  defaultWastePercentage: number;
  defaultPlatformCommission: number;
  
  // Actions
  setCurrency: (currency: CurrencySymbol) => void;
  setDefaultTargetMargin: (margin: number) => void;
  resetToDefaults: () => void;
}
```

### Recipe Store

Manages recipes with full CRUD operations:

```typescript
interface RecipeState {
  recipes: Recipe[];
  currentRecipeId: string | null;
  
  // Recipe CRUD
  createRecipe: (data: CreateRecipeDTO) => Recipe;
  updateRecipe: (data: UpdateRecipeDTO) => void;
  deleteRecipe: (id: string) => void;
  duplicateRecipe: (id: string) => Recipe | null;
  
  // Ingredient CRUD
  addIngredient: (recipeId: string, data: CreateIngredientDTO) => Ingredient;
  updateIngredient: (recipeId: string, data: UpdateIngredientDTO) => void;
  deleteIngredient: (recipeId: string, ingredientId: string) => void;
}
```

### Persistence

All state is automatically persisted to localStorage:

| Key | Content |
|-----|---------|
| `kitchenmath_settings` | Currency, default margins, tax rates |
| `kitchenmath_recipes` | All saved recipes with ingredients |

---

## ⚙ Configuration

### Constants (`src/constants/index.ts`)

#### Default Values

```typescript
export const DEFAULT_SETTINGS = {
  currency: '₦',
  defaultTargetMargin: 65,        // 65% margin
  defaultTaxRate: 7.5,            // 7.5% VAT (Nigeria)
  defaultWastePercentage: 5,      // 5% waste buffer
  defaultPlatformCommission: 20,  // 20% delivery fee
};
```

#### Margin Thresholds

```typescript
export const MARGIN_THRESHOLDS = {
  healthy: 60,   // >= 60% = green
  warning: 30,   // >= 30% = orange
  // < 30% = red (danger)
};
```

#### Unit Conversion Factors

```typescript
export const CONVERSION_TO_BASE = {
  kg: 1000,    // 1 kg = 1000 g
  g: 1,        // base unit
  l: 1000,     // 1 L = 1000 mL
  ml: 1,       // base unit
  pcs: 1,      // pieces (no conversion)
};
```

---

## 🛠 Development

### Environment Setup

```bash
# Clone repository
git clone https://github.com/yourusername/kitchenmath.git
cd kitchenmath

# Install dependencies
npm install

# Start development server
npm run dev
```

### Code Style

This project uses:
- **ESLint** with TypeScript and React plugins
- **Prettier** for code formatting (via ESLint)
- **TypeScript** strict mode enabled

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Adding New Features

1. **Types First**: Define types in `src/types/index.ts`
2. **Utilities**: Add pure functions to `src/utils/`
3. **Stores**: Update Zustand stores if state is needed
4. **Hooks**: Create custom hooks for complex logic
5. **Components**: Build UI components in the appropriate folder

### Component Guidelines

```typescript
// Use function components with TypeScript
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Derived values
  const computed = useMemo(() => /* ... */, [deps]);
  
  // Event handlers
  const handleClick = () => { /* ... */ };
  
  // Render
  return <div>...</div>;
};
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Test Structure

```
src/
├── __tests__/
│   ├── utils/
│   │   ├── calculations.test.ts
│   │   └── unitConversion.test.ts
│   ├── hooks/
│   │   └── useCalculations.test.ts
│   └── components/
│       └── ResultsPanel.test.tsx
```

### Testing Philosophy

- **Unit tests** for utility functions
- **Integration tests** for hooks and stores
- **Component tests** for user interactions
- **E2E tests** for critical user flows

---

## 🚢 Deployment

### Building for Production

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

Build output is placed in `dist/` folder.

### Deployment Options

| Platform | Command / Steps |
|----------|-----------------|
| **Vercel** | Connect repo, auto-deploys on push |
| **Netlify** | Connect repo, build command: `npm run build` |
| **GitHub Pages** | Use `gh-pages` package |
| **Docker** | See Dockerfile example below |
| **Static Host** | Upload `dist/` folder contents |

### Docker Deployment

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t kitchenmath .
docker run -p 8080:80 kitchenmath
```

---

## 📚 API Reference

### Utility Functions

#### `calculateCostPerUsage()`

Calculate ingredient cost per portion with unit conversion.

```typescript
function calculateCostPerUsage(
  purchasePrice: number,
  purchaseQuantity: number,
  purchaseUnit: Unit,
  usageQuantity: number,
  usageUnit: Unit
): number | null;

// Example
calculateCostPerUsage(85000, 50, 'kg', 200, 'g');
// Returns: 340 (₦340 per portion)
```

#### `calculateRecipeMetrics()`

Compute all pricing metrics for a recipe.

```typescript
function calculateRecipeMetrics(recipe: Recipe): CalculationResult;
```

#### `performStressTest()`

Simulate inflation impact on margins.

```typescript
function performStressTest(
  recipe: Recipe,
  inflationPercentage: number
): StressTestResult;
```

### Custom Hooks

#### `useCalculations()`

```typescript
function useCalculations(recipe: Recipe | null): CalculationResult | null;

// Usage
const calculations = useCalculations(currentRecipe);
```

#### `useDebounce()`

```typescript
function useDebounce<T>(value: T, delay?: number): T;

// Usage
const debouncedSearch = useDebounce(searchTerm, 300);
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/kitchenmath.git`
3. **Create** a branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new stress test visualization
fix: correct unit conversion for milliliters
docs: update API reference
style: format with prettier
refactor: simplify calculation logic
test: add tests for validation utils
chore: update dependencies
```

### Pull Request Guidelines

- [ ] Link related issues
- [ ] Add/update tests if applicable
- [ ] Update documentation if needed
- [ ] Ensure all checks pass
- [ ] Request review from maintainers

### Code of Conduct

Please be respectful and inclusive. We follow the [Contributor Covenant](https://www.contributor-covenant.org/).

---

## 🗺 Roadmap

### Version 1.1 (Q1 2026)
- [ ] 📄 PDF/PNG export of cost breakdown
- [ ] 🔗 Shareable links via URL encoding
- [ ] 📊 Side-by-side recipe comparison

### Version 1.2 (Q2 2026)
- [ ] 📝 Recipe import via text parsing
- [ ] 📲 PWA support for offline use
- [ ] 🌙 Dark/light theme toggle

### Version 2.0 (Q3 2026)
- [ ] 📈 Historical cost tracking
- [ ] 📊 Profit analytics dashboard
- [ ] 🏪 Multi-location support

### Future Ideas
- [ ] 🤖 AI-powered ingredient recognition
- [ ] 📦 Supplier integration
- [ ] 📱 Native mobile apps

---

## ❓ FAQ

<details>
<summary><strong>Q: Is my data safe?</strong></summary>

**A:** Yes! All data is stored locally in your browser's localStorage. We don't have servers, databases, or any way to access your information. Your recipes never leave your device.
</details>

<details>
<summary><strong>Q: Can I use this on my phone?</strong></summary>

**A:** Absolutely! KitchenMath is designed mobile-first. The interface adapts to any screen size and works great on phones.
</details>

<details>
<summary><strong>Q: What happens if I clear my browser data?</strong></summary>

**A:** Your saved recipes will be lost. We recommend exporting your data periodically (feature coming in v1.1).
</details>

<details>
<summary><strong>Q: Can I convert between incompatible units?</strong></summary>

**A:** No, you cannot convert between weight (kg/g) and volume (L/mL). These are different measurement types. The app will show an error if you try.
</details>

<details>
<summary><strong>Q: Why does the delivery price seem high?</strong></summary>

**A:** The delivery price is intentionally inflated so that after the platform takes their commission (e.g., 20%), you still receive your target retail price. This ensures consistent profit margins.
</details>

<details>
<summary><strong>Q: Is KitchenMath free?</strong></summary>

**A:** Yes, KitchenMath is completely free and open source under the MIT license.
</details>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 KitchenMath

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🙏 Acknowledgments

### Built With

- [React](https://react.dev/) — The library for web and native user interfaces
- [TypeScript](https://www.typescriptlang.org/) — JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com/) — A utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) — Bear necessities for state management
- [Vite](https://vitejs.dev/) — Next Generation Frontend Tooling

### Inspiration

- The countless food vendors who struggle with pricing
- "Mama Basira" and vendors like her across Nigeria
- The need for accessible, privacy-first financial tools

### Contributors

<a href="https://github.com/yourusername/kitchenmath/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/kitchenmath" />
</a>

---

<p align="center">
  <strong>Built with ❤️ for food vendors everywhere</strong><br/>
  <sub>From vibes-based pricing to data-driven profitability</sub>
</p>

<p align="center">
  <a href="#-kitchenmath">⬆ Back to Top</a>
</p>
