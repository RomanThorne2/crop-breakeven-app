import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ReferenceLine, Legend,
} from 'recharts';
import { buildChartData } from '../utils/calculations';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="tooltip-price">Price: ${parseFloat(label).toFixed(2)}/bu</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value >= 0 ? `$${p.value.toFixed(2)}` : `($${Math.abs(p.value).toFixed(2)})`}
        </p>
      ))}
    </div>
  );
};

export default function BreakEvenChart({ crop, adjYield, adjPrice, landRent, priceMin, priceMax, results }) {
  const data = buildChartData(crop, adjYield, landRent, priceMin, priceMax);
  const { breakEvenPrice } = results;

  const allVals = data.flatMap(d => [d.adjusted, d.baseline]);
  const yMin    = Math.floor(Math.min(...allVals) / 50) * 50 - 50;
  const yMax    = Math.ceil(Math.max(...allVals)  / 50) * 50 + 50;

  const adjYieldIsBase = Math.abs(adjYield - crop.baseYield) < 0.5;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Net Return / Acre vs. Price</h3>
        <p className="chart-sub">
          Drag the price slider — watch the current-yield line move.
          Where it crosses $0 is the break-even price.
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E5DC" />
          <XAxis
            dataKey="price"
            tickFormatter={v => `$${parseFloat(v).toFixed(2)}`}
            tick={{ fontSize: 11 }}
            label={{ value: 'Price ($/bu)', position: 'insideBottom', offset: -4, fontSize: 12 }}
            height={40}
            domain={[priceMin, priceMax]}
            type="number"
          />
          <YAxis
            tickFormatter={v => v >= 0 ? `$${v}` : `($${Math.abs(v)})`}
            tick={{ fontSize: 11 }}
            domain={[yMin, yMax]}
            width={64}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={28} wrapperStyle={{ fontSize: 12 }} />

          <ReferenceLine y={0} stroke="#374139" strokeWidth={2} />

          <ReferenceLine
            x={parseFloat(breakEvenPrice.toFixed(3))}
            stroke="#D97706"
            strokeDasharray="5 3"
            strokeWidth={1.5}
            label={{ value: `BE $${breakEvenPrice.toFixed(2)}`, position: 'top', fontSize: 10, fill: '#B45309' }}
          />

          <ReferenceLine
            x={parseFloat(adjPrice.toFixed(3))}
            stroke="#6366F1"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{ value: `Now $${adjPrice.toFixed(2)}`, position: 'insideTopLeft', fontSize: 10, fill: '#4F46E5' }}
          />

          <Line
            type="monotone"
            dataKey="adjusted"
            name={adjYieldIsBase ? `At ${adjYield} bu/ac (base)` : `At ${adjYield} bu/ac`}
            stroke="#10B981"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />

          {!adjYieldIsBase && (
            <Line
              type="monotone"
              dataKey="baseline"
              name={`At ${crop.baseYield} bu/ac (NDSU base)`}
              stroke="#9CA3AF"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
