# Crop Break-Even Calculator

**Live demo:** *(add your Vercel URL here after deployment)*

A fully client-side React app for calculating crop break-even prices and yields for North Central North Dakota, built on official NDSU Extension 2026 regional budget projections.

---

## What it does

Pick a crop (spring wheat, corn, or soybean), drag the yield and price sliders, and the app instantly shows:

- **Break-even price** — the minimum $/bu needed to cover all costs at your yield
- **Break-even yield** — the minimum bu/acre needed to cover all costs at your price
- **Net return/acre** — revenue minus total cost
- **Chart** — net return/acre across the full price range, so you can see exactly where the break-even point is

## Data source

All cost and yield figures come directly from:

> **NDSU Extension EC1654 — Projected 2026 Crop Budgets, North Central North Dakota**
> Author: Ron Haugen, Farm Management Specialist
> Published: February 2026
> URL: <https://www.ndsu.edu/agriculture/sites/default/files/2026-02/ec1654.pdf>

The region covers: Benson, Bottineau, McHenry, McLean, Pierce, Renville, Rolette, and Ward counties. Rugby is in Pierce County.

Yields are 7-year Olympic averages (2018–2024, dropping the high and low). Prices are NDSU Extension economists' best estimates for 2026. **No values were estimated or invented.**

## Built with

- [React 18](https://react.dev) + [Vite](https://vitejs.dev) — frontend framework and build tool
- [Recharts](https://recharts.org) — chart library
- Pure CSS (no framework) — mobile-first, works on any screen size
- [Claude Code](https://claude.ai/claude-code) — built with AI assistance

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to GitHub + Vercel

### Step 1: Push to GitHub

1. Create a new repository at https://github.com/new
   - Repository name: `crop-breakeven-app` (or whatever you like)
   - Leave it public (required for free Vercel)
   - Do **not** add a README (you already have one)

2. In your terminal, inside the `crop-breakeven-app` folder:

```bash
git init
git add .
git commit -m "Initial commit — NDSU 2026 crop break-even calculator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crop-breakeven-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy on Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New → Project"**
3. Find and import your `crop-breakeven-app` repository
4. Vercel auto-detects Vite — the default settings work perfectly:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click **Deploy**

Vercel gives you a free `.vercel.app` URL in about 30 seconds. Add it to the top of this README.

Every time you push to `main`, Vercel redeploys automatically.

---

## Project structure

```
src/
├── App.jsx                 # main component, state management
├── App.css                 # all styles (CSS custom properties, mobile-first)
├── data/
│   └── cropData.js         # NDSU cost/yield data — single source of truth
├── utils/
│   └── calculations.js     # pure break-even math (no React)
└── components/
    ├── CropSelector.jsx    # wheat / corn / soybean tabs
    ├── SliderControl.jsx   # reusable yield & price slider
    ├── ResultCards.jsx     # hero metric cards
    ├── BreakEvenChart.jsx  # Recharts line chart
    └── CostBreakdown.jsx   # collapsible NDSU cost detail table
```

---

*These are regional projections, not any specific farm's numbers. NDSU strongly encourages every individual to develop their own budgets.*
