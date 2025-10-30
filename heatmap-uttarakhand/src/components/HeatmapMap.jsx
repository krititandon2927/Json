import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-heatmap';
import h337 from 'heatmap.js';
import data2020 from '../data/data2020.json';
import data2022 from '../data/data2022.json';
import data2024 from '../data/data2024.json';
import data2025 from '../data/data2025.json';

const HeatmapMap = () => {
  const mapRef = useRef(null);
  const heatmapLayerRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState('2020');

  const datasets = {
    2020: data2020,
    2022: data2022,
    2024: data2024,
    2025: data2025,
  };

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([30.0668, 79.0193], 8);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const cfg = {
        radius: 0.05,
        maxOpacity: 0.8,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'value',
      };

      const heatmapLayer = new L.HeatmapOverlay(cfg);
      heatmapLayerRef.current = heatmapLayer;
      heatmapLayer.setData({ data: datasets[selectedYear] });
      map.addLayer(heatmapLayer);
    }

    const layer = heatmapLayerRef.current;
    if (layer) layer.setData({ data: datasets[selectedYear] });
  }, [selectedYear]);

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = datasets[selectedYear].map((point) => ({
        ...point,
        value: Math.min(1, Math.max(0, point.value + (Math.random() - 0.5) * 0.2)),
      }));
      heatmapLayerRef.current?.setData({ data: updated });
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedYear]);

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '10px' }}>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          <option value="2020">2020</option>
          <option value="2022">2022</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div id="map" style={{ height: '80vh', width: '100%' }}></div>
    </div>
  );
};

export default HeatmapMap;