export function calcTotals(crop, landRent) {
  const rent         = landRent ?? crop.baseLandRent;
  const totalDirect  = Object.values(crop.directCosts).reduce((a, b) => a + b, 0);
  const totalIndirect = Object.values(crop.indirectCosts).reduce((a, b) => a + b, 0) + rent;
  return { totalDirect, totalIndirect, totalCost: totalDirect + totalIndirect };
}

export function calcBreakEven(crop, adjYield, adjPrice, landRent) {
  const { totalDirect, totalIndirect, totalCost } = calcTotals(crop, landRent);
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

// Build chart data: net return/acre across the full price slider range at a given yield
export function buildChartData(crop, adjYield, landRent, priceMin, priceMax) {
  const { totalCost } = calcTotals(crop, landRent);
  const lo    = priceMin;
  const hi    = priceMax;
  const steps = 60;
  const step  = (hi - lo) / steps;

  return Array.from({ length: steps + 1 }, (_, i) => {
    const price    = parseFloat((lo + i * step).toFixed(3));
    const adjusted = parseFloat((adjYield * price - totalCost).toFixed(2));
    const baseline = parseFloat((crop.baseYield * price - totalCost).toFixed(2));
    return { price, adjusted, baseline };
  });
}
