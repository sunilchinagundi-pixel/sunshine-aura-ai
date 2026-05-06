import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pricing() {
  const [pricing, setPricing] = useState(null);

  useEffect(() => {
    axios.get('/api/pricing').then(r => setPricing(r.data));
  }, []);

  if (!pricing) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Pricing Plans</h1>
      <div className="grid">
        <div className="card" style={{ border: '2px solid #4caf50' }}>
          <h3>Free Tier</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50', margin: '1rem 0' }}>₹0</p>
          <ul>
            {pricing.free && pricing.free.features && pricing.free.features.map((f, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>✓ {f}</li>
            ))}
          </ul>
          <button className="button" style={{ marginTop: '1rem' }}>Get Started</button>
        </div>
        <div className="card" style={{ border: '2px solid #ff9800', transform: 'scale(1.05)' }}>
          <h3>Pro Tier</h3>
          <div style={{ margin: '1rem 0' }}>
            <p style={{ fontSize: '1.2rem', color: '#999', textDecoration: 'line-through', margin: '0' }}>₹25000</p>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff9800', margin: '0.5rem 0' }}>
              ₹12999
            </p>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '0' }}>Limited Time Offer</p>
          </div>
          <ul>
            {pricing.pro && pricing.pro.features && pricing.pro.features.map((f, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>✓ {f}</li>
            ))}
          </ul>
          <button className="button" style={{ marginTop: '1rem', background: '#ff9800' }}>Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}
