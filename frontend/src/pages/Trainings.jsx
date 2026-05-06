import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios.get('/api/trainings').then(r => setTrainings(r.data));
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Training Courses</h1>
      <div className="grid">
        {trainings.map(t => (
          <div key={t.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{t.title}</h3>
              <span style={{ background: t.is_free ? '#4caf50' : '#ff9800', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                {t.is_free ? 'FREE' : 'PRO'}
              </span>
            </div>
            <p>{t.description}</p>
            <small style={{ color: '#999', marginBottom: '1rem', display: 'block' }}>Category: {t.category}</small>
            <button className="button" onClick={() => window.location.href = '/register'}>Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
