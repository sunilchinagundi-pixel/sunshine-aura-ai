import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs').then(r => setJobs(r.data));
  }, []);

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>Job Opportunities</h1>
      <div className="grid">
        {jobs.map(j => (
          <div key={j.id} className="card">
            <h3>{j.title}</h3>
            <p><strong>{j.company}</strong></p>
            <p>{j.description}</p>
            <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '1rem' }}>
              <p>📍 {j.location}</p>
              <p>⏰ {j.job_type}</p>
            </div>
            <button className="button">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
