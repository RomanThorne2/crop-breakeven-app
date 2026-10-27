function fmt$(n)   { return n < 0 ? `($${Math.abs(n).toFixed(2)})` : `$${n.toFixed(2)}`; }
function fmtBu(n)  { return `${n.toFixed(1)} bu/ac`; }

export default function ResultCards({ results, adjYield, adjPrice, crop }) {
  const { netReturn, breakEvenPrice, breakEvenYield, revenue, totalCost,
          totalDirect, totalIndirect, isProfitable } = results;

  const bePrice_delta = adjPrice  - breakEvenPrice;   // positive = price above break-even
  const beYield_delta = adjYield  - breakEvenYield;   // positive = yield above break-even

  return (
    <div className="result-cards">
      {/* Net Return — hero card */}
      <div className={`card card-hero ${isProfitable ? 'positive' : 'negative'}`}>
        <div className="card-label">Net Return / Acre</div>
        <div className="card-main">{fmt$(netReturn)}</div>
        <div className="card-sub">
          {isProfitable
            ? `$${Math.abs(bePrice_delta).toFixed(2)}/bu above break-even price`
            : `$${Math.abs(bePrice_delta).toFixed(2)}/bu below break-even price`}
        </div>
      </div>

      {/* Break-Even Price */}
      <div className={`card ${adjPrice >= breakEvenPrice ? 'positive-light' : 'negative-light'}`}>
        <div className="card-label">Break-Even Price</div>
        <div className="card-main">{`$${breakEvenPrice.toFixed(2)}/bu`}</div>
        <div className="card-sub">
          Current price: ${adjPrice.toFixed(2)}/bu
          {' · '}
          {adjPrice >= breakEvenPrice
            ? <span className="tag-ok">✓ covered</span>
            : <span className="tag-bad">✗ not covered</span>}
        </div>
      </div>

      {/* Break-Even Yield */}
      <div className={`card ${adjYield >= breakEvenYield ? 'positive-light' : 'negative-light'}`}>
        <div className="card-label">Break-Even Yield</div>
        <div className="card-main">{fmtBu(breakEvenYield)}</div>
        <div className="card-sub">
          Current yield: {adjYield} bu/ac
          {' · '}
          {adjYield >= breakEvenYield
            ? <span className="tag-ok">✓ covered</span>
            : <span className="tag-bad">✗ not covered</span>}
        </div>
      </div>

      {/* Revenue vs Cost */}
      <div className="card card-split">
        <div className="split-row">
          <span className="split-label">Revenue / Acre</span>
          <span className="split-val revenue">{fmt$(revenue)}</span>
        </div>
        <div className="split-row">
          <span className="split-label">Direct Costs</span>
          <span className="split-val">{fmt$(totalDirect)}</span>
        </div>
        <div className="split-row">
          <span className="split-label">Indirect Costs</span>
          <span className="split-val">{fmt$(totalIndirect)}</span>
        </div>
        <div className="split-row total-row">
          <span className="split-label">Total Cost / Acre</span>
          <span className="split-val">{fmt$(totalCost)}</span>
        </div>
      </div>
    </div>
  );
}
