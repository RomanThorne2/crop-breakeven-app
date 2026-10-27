import { useState } from 'react';
import { calcTotals } from '../utils/calculations';

export default function CostBreakdown({ crop, adjYield, adjPrice }) {
  const [open, setOpen] = useState(false);
  const { totalDirect, totalIndirect, totalCost } = calcTotals(crop);
  const revenue   = adjYield * adjPrice;
  const netReturn = revenue - totalCost;

  const fmt = n => `$${n.toFixed(2)}`;

  return (
    <div className="cost-breakdown">
      <button
        className="breakdown-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>Cost Detail (NDSU EC1654)</span>
        <span className="chevron">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="breakdown-body">
          <table className="breakdown-table">
            <tbody>
              <tr className="section-row">
                <td colSpan={2}>Direct Costs</td>
              </tr>
              {Object.entries(crop.directCosts).map(([k, v]) => (
                <tr key={k}>
                  <td className="cost-name">{k}</td>
                  <td className="cost-val">{fmt(v)}</td>
                </tr>
              ))}
              <tr className="subtotal-row">
                <td>Total Direct Costs</td>
                <td>{fmt(totalDirect)}</td>
              </tr>

              <tr className="section-row">
                <td colSpan={2}>Indirect (Fixed) Costs</td>
              </tr>
              {Object.entries(crop.indirectCosts).map(([k, v]) => (
                <tr key={k}>
                  <td className="cost-name">{k}</td>
                  <td className="cost-val">{fmt(v)}</td>
                </tr>
              ))}
              <tr className="subtotal-row">
                <td>Total Indirect Costs</td>
                <td>{fmt(totalIndirect)}</td>
              </tr>

              <tr className="total-row">
                <td>Total Cost / Acre</td>
                <td>{fmt(totalCost)}</td>
              </tr>
              <tr className="revenue-row">
                <td>Revenue / Acre ({adjYield} bu × ${adjPrice.toFixed(2)})</td>
                <td>{fmt(revenue)}</td>
              </tr>
              <tr className={`net-row ${netReturn >= 0 ? 'positive' : 'negative'}`}>
                <td><strong>Net Return / Acre</strong></td>
                <td>
                  <strong>{netReturn < 0 ? `($${Math.abs(netReturn).toFixed(2)})` : fmt(netReturn)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="breakdown-note">
            Costs are fixed per-acre regional estimates. Yields are 7-yr Olympic averages (2018–2024).
            Prices are NDSU Extension economists&apos; best estimates for 2026.
          </p>
        </div>
      )}
    </div>
  );
}
