export function calcTotals(crop) {
  const totalDirect   = Object.values(crop.directCosts).reduce((a, b) => a + b, 0);
  const totalIndirect = Object.values(crop.indirectCosts).reduce((a, b) => a + b, 0);
  return { totalDirect, totalIndirect, totalCost: totalDirect + totalIndirect };
}

export function calcBreakEven(crop, adjYield, adjPrice) {
  const { totalDirect, totalIndirect, totalCost } = calcTotals(crop);
  const revenue             = adjYield * adjPrice;
  const netReturn           = revenue - totalCost;
  const netReturnOverDirect = revenue - totalDirect;
  const breakEvenPrice      = totalCost / adjYield;
  const breakEvenYield      = totalCost / adjPrice;

  return {
    totalDirect,
    totalIndirect,
    totalCost,
    revenue,
    netReturn,
    netReturnOverDirect,
    breakEvenPrice,
    breakEvenYield,
    isProfitable: netReturn >= 0,
  };
}

// Build chart data: net return/acre across a price range at a given yield
export function buildChartData(crop, adjYield) {
  const { totalCost } = calcTotals(crop);
  const base  = crop.basePrice;
  const lo    = Math.max(0.25, parseFloat((base - 2.5).toFixed(2)));
  const hi    = parseFloat((base + 2.5).toFixed(2));
  const steps = 60;
  const step  = (hi - lo) / steps;

  return Array.from({ length: steps + 1 }, (_, i) => {
    const price    = parseFloat((lo + i * step).toFixed(3));
    const adjusted = parseFloat((adjYield * price - totalCost).toFixed(2));
    const baseline = parseFloat((crop.baseYield * price - totalCost).toFixed(2));
    return { price, adjusted, baseline };
  });
}
