import { useState, useMemo, useCallback } from 'react';
import { CROPS } from './data/cropData';
import { calcBreakEven } from './utils/calculations';
import CropSelector    from './components/CropSelector';
import SliderControl   from './components/SliderControl';
import ResultCards     from './components/ResultCards';
import BreakEvenChart  from './components/BreakEvenChart';
import CostBreakdown   from './components/CostBreakdown';
import './App.css';

export default function App() {
  const [cropKey,   setCropKey]   = useState('wheat');
  const [adjYield,  setAdjYield]  = useState(CROPS.wheat.baseYield);
  const [adjPrice,  setAdjPrice]  = useState(CROPS.wheat.basePrice);
  const [landRent,  setLandRent]  = useState(CROPS.wheat.baseLandRent);

  const crop = CROPS[cropKey];

  const handleCropChange = useCallback((key) => {
    setCropKey(key);
    setAdjYield(CROPS[key].baseYield);
    setAdjPrice(CROPS[key].basePrice);
    setLandRent(CROPS[key].baseLandRent);
  }, []);

  const results = useMemo(
    () => calcBreakEven(crop, adjYield, adjPrice, landRent),
    [crop, adjYield, adjPrice, landRent],
  );

  const yieldMin = Math.floor(crop.baseYield * 0.4);
  const yieldMax = Math.ceil(crop.baseYield  * 1.6);
  const priceMin = parseFloat(Math.max(0.25, crop.basePrice - 3).toFixed(2));
  const priceMax = parseFloat((crop.basePrice + 3).toFixed(2));

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-titles">
            <h1>Crop Break-Even Calculator</h1>
            <p className="header-sub">
              North Central ND · NDSU 2026 Regional Projections
            </p>
          </div>
          <div className="header-byline">
            <div className="byline-rule" />
            <span className="byline-name">Bryant Bohl</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <CropSelector current={cropKey} onChange={handleCropChange} />

        <section className="controls-grid">
          <div className="sliders-panel">
            <SliderControl
              label="Yield"
              unit="bu/acre"
              value={adjYield}
              base={crop.baseYield}
              min={yieldMin}
              max={yieldMax}
              step={1}
              onChange={setAdjYield}
            />
            <SliderControl
              label="Price"
              unit="$/bu"
              value={adjPrice}
              base={crop.basePrice}
              min={priceMin}
              max={priceMax}
              step={0.05}
              onChange={setAdjPrice}
            />
            <SliderControl
              label="Land Rent"
              unit="$/acre"
              value={landRent}
              base={crop.baseLandRent}
              min={0}
              max={150}
              step={1}
              onChange={setLandRent}
            />
          </div>

          <ResultCards
            results={results}
            adjYield={adjYield}
            adjPrice={adjPrice}
            crop={crop}
          />
        </section>

        <BreakEvenChart
          crop={crop}
          adjYield={adjYield}
          adjPrice={adjPrice}
          landRent={landRent}
          priceMin={priceMin}
          priceMax={priceMax}
          results={results}
        />

        <CostBreakdown
          crop={crop}
          adjYield={adjYield}
          adjPrice={adjPrice}
          landRent={landRent}
        />
      </main>

      <footer className="app-footer">
        <p>
          Data:{' '}
          <a
            href="https://www.ndsu.edu/agriculture/sites/default/files/2026-02/ec1654.pdf"
            target="_blank"
            rel="noreferrer"
          >
            NDSU Extension EC1654, February 2026
          </a>
          {' · '}
          <a
            href="https://github.com/RomanThorne2/crop-breakeven-app"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          {' · '}Built by Bryant Bohl
          {' · '}These are regional projections — not any specific farm&apos;s numbers.
        </p>
      </footer>
    </div>
  );
}
