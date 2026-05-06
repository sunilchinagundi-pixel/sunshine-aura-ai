import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Consulting() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('/api/consulting').then(r => setOffers(r.data));
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Consulting Services</h1>
      <div className="grid">
        {offers.map(o => (
          <div key={o.id} className="card">
            <h3>{o.title}</h3>
            <p>{o.details}</p>
            <button className="button">Book Session</button>
          </div>
        ))}
      </div>
    </div>
  );
}
