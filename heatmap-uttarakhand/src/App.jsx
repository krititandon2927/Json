import React from 'react';
import HeatmapMap from './components/HeatmapMap';

function App() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '10px' }}>
        Uttarakhand Heatmap (2020–2025)
      </h2>
      <HeatmapMap />
    </div>
  );
}

export default App;