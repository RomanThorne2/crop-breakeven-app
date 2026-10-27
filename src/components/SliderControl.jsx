export default function SliderControl({ label, unit, value, base, min, max, step, onChange }) {
  const pct        = ((value - min) / (max - min)) * 100;
  const pctChange  = ((value - base) / base) * 100;
  const isAbove    = value > base;
  const isBelow    = value < base;
  const isBase     = Math.abs(pctChange) < 0.01;
  const changeTag  = isBase
    ? 'base'
    : `${isAbove ? '+' : ''}${pctChange.toFixed(0)}% vs base`;

  const fmt = unit === '$/bu'
    ? `$${value.toFixed(2)}`
    : `${value.toFixed(0)}`;

  return (
    <div className="slider-control">
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-value-group">
          <span className="slider-value">{fmt} {unit}</span>
          <span className={`slider-delta ${isAbove ? 'up' : isBelow ? 'down' : 'flat'}`}>
            {changeTag}
          </span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="slider"
        style={{ '--pct': `${pct}%` }}
        aria-label={`${label} slider`}
      />
      <div className="slider-bounds">
        <span>{unit === '$/bu' ? `$${min.toFixed(2)}` : min}</span>
        <span className="base-marker">▲ NDSU base: {unit === '$/bu' ? `$${base.toFixed(2)}` : base} {unit}</span>
        <span>{unit === '$/bu' ? `$${max.toFixed(2)}` : max}</span>
      </div>
    </div>
  );
}
