# KitchenMath 🍳

> **Profit Engine for Food Vendors** — Move from vibes-based pricing to cost-plus pricing.

KitchenMath is a privacy-first, client-side web tool that helps food entrepreneurs calculate their true Cost of Goods Sold (COGS), factor in hidden overheads (packaging, labor, platform fees), and generate suggested retail prices based on industry-standard margin targets.

## ✨ Features

- **Smart Unit Conversion** — Buy in kg, use in grams. We handle the math.
- **Real-Time Calculations** — See your pricing update as you type.
- **Hidden Cost Tracking** — Packaging, labor, waste buffer, and delivery commissions.
- **Inflation Stress Test** — See how rising costs affect your margins.
- **Privacy-First** — All data stored locally. No signup, no servers, no tracking.
- **Mobile-Responsive** — Works seamlessly on phones where vendors work.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Tech Stack

- **React 19** + **TypeScript** — Modern, type-safe UI
- **Tailwind CSS 4** — Utility-first styling
- **Zustand** — Lightweight state management
- **Vite** — Lightning-fast development
- **LocalStorage** — Persistent, privacy-first data storage

## 📁 Project Structure

```
src/
├── components/           # UI Components
│   ├── ui/              # Reusable base components (Button, Input, Card, etc.)
│   ├── layout/          # Layout components (Header)
│   ├── recipe/          # Recipe builder components
│   └── dashboard/       # Results/metrics components
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores (state management)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── calculations.ts  # Core pricing formulas
│   ├── unitConversion.ts # Smart unit conversion
│   ├── formatting.ts    # Currency/percentage formatting
│   ├── validation.ts    # Input validation
│   └── storage.ts       # LocalStorage utilities
├── constants/           # App constants and configuration
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## 🧮 Key Formulas

### True Portion Cost (TPC)
```
TPC = Σ(IngredientCosts) + Packaging + Labor × (1 + WasteBuffer%)
```

### Suggested Retail Price
```
Price = TPC / (1 - TargetMargin%)
```

### Delivery App Price
```
DeliveryPrice = RetailPrice / (1 - CommissionRate%)
```

## 🎯 SOLID Principles Applied

- **S**ingle Responsibility — Each utility handles one concern
- **O**pen/Closed — Store is extensible without modification
- **L**iskov Substitution — Component interfaces are consistent
- **I**nterface Segregation — Types split by domain (Recipe, Ingredient, Calculation)
- **D**ependency Inversion — Hooks depend on abstractions, not concretions

## 📱 Mobile-First Design

The entire UI is designed mobile-first since food vendors primarily work on phones. Desktop layouts gracefully expand with a split-screen view.

## 🔒 Privacy

- **No backend** — Everything runs in your browser
- **No signup** — Start using immediately
- **LocalStorage** — Data never leaves your device
- **No analytics** — We don't track you

## 🛣️ Roadmap

- [ ] PDF/PNG export of cost breakdown
- [ ] Recipe import via text parsing
- [ ] Side-by-side recipe comparison
- [ ] Shareable links via URL encoding
- [ ] PWA support for offline use

## 📄 License

MIT License — See [LICENSE](./LICENSE)

---

Built with ❤️ for food vendors everywhere.
