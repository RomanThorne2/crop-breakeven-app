import { CROPS } from '../data/cropData';

const CROP_ICONS = { wheat: '🌾', corn: '🌽', soybean: '🫘' };

export default function CropSelector({ current, onChange }) {
  return (
    <div className="crop-selector" role="tablist" aria-label="Select crop">
      {Object.values(CROPS).map(crop => (
        <button
          key={crop.id}
          role="tab"
          aria-selected={current === crop.id}
          className={`crop-tab ${current === crop.id ? 'active' : ''}`}
          onClick={() => onChange(crop.id)}
        >
          <span className="crop-icon">{CROP_ICONS[crop.id]}</span>
          <span className="crop-name">{crop.shortName}</span>
        </button>
      ))}
    </div>
  );
}
