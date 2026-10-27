// NDSU Extension EC1654 — Projected 2026 Crop Budgets, North Central ND
// Published February 2026 | Rugby is in Pierce County, which is in this region.
// https://www.ndsu.edu/agriculture/sites/default/files/2026-02/ec1654.pdf

export const CROPS = {
  wheat: {
    id: 'wheat',
    name: 'Spring Wheat',
    shortName: 'Wheat',
    unit: 'bu',
    baseYield: 53,
    basePrice: 5.70,
    directCosts: {
      'Seed':               22.10,
      'Herbicides':         29.30,
      'Fungicides':         10.50,
      'Insecticides':        0.00,
      'Fertilizer':         99.28,
      'Crop Insurance':      6.30,
      'Fuel & Lubrication': 15.96,
      'Repairs':            25.21,
      'Drying':              0.00,
      'Miscellaneous':       2.00,
      'Operating Interest':  7.37,
    },
    indirectCosts: {
      'Misc. Overhead':          10.75,
      'Machinery Depreciation':  29.69,
      'Machinery Investment':    15.38,
      'Land Charge (Cash Rent)': 57.00,
    },
  },

  corn: {
    id: 'corn',
    name: 'Corn',
    shortName: 'Corn',
    unit: 'bu',
    baseYield: 111,
    basePrice: 3.75,
    directCosts: {
      'Seed (GM)':          87.00,
      'Herbicides':         31.60,
      'Fungicides':          0.00,
      'Insecticides':        0.00,
      'Fertilizer':        108.52,
      'Crop Insurance':      9.20,
      'Fuel & Lubrication': 22.97,
      'Repairs':            31.49,
      'Drying':             22.20,
      'Miscellaneous':       2.00,
      'Operating Interest': 11.02,
    },
    indirectCosts: {
      'Misc. Overhead':          13.95,
      'Machinery Depreciation':  47.72,
      'Machinery Investment':    23.28,
      'Land Charge (Cash Rent)': 57.00,
    },
  },

  soybean: {
    id: 'soybean',
    name: 'Soybean',
    shortName: 'Soybean',
    unit: 'bu',
    baseYield: 31,
    basePrice: 9.60,
    directCosts: {
      'Seed (GM)':          65.80,
      'Herbicides':         27.20,
      'Fungicides':          0.00,
      'Insecticides':        0.00,
      'Fertilizer':         11.33,
      'Crop Insurance':      4.70,
      'Fuel & Lubrication': 12.21,
      'Repairs':            20.99,
      'Drying':              0.00,
      'Miscellaneous':       5.50,
      'Operating Interest':  5.17,
    },
    indirectCosts: {
      'Misc. Overhead':          9.64,
      'Machinery Depreciation':  26.30,
      'Machinery Investment':    12.78,
      'Land Charge (Cash Rent)': 57.00,
    },
  },
};
