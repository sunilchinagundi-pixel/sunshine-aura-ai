import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [stats, setStats] = useState({ trainings: 0, jobs: 0, users: 0 });

  useEffect(() => {
    axios.get('/api/trainings').then(r => setStats(s => ({ ...s, trainings: r.data.length })));
    axios.get('/api/jobs').then(r => setStats(s => ({ ...s, jobs: r.data.length })));
    axios.get('/api/users').then(r => setStats(s => ({ ...s, users: r.data.length })));
  }, []);

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to Sunshine Aura AI</h1>
        <p>Learn AI, Python, and grow your career with us. Free and Pro options available.</p>
        <a href="/register" className="button">Get Started Free</a>
      </div>

      <div className="grid">
        <div className="card">
          <h3>📚 {stats.trainings} Training Courses</h3>
          <p>Learn Python, AI, Machine Learning, and more from industry experts.</p>
          <a href="/trainings" className="button">Explore</a>
        </div>
        <div className="card">
          <h3>💼 {stats.jobs} Job Opportunities</h3>
          <p>Find your next role in AI, data science, and tech companies.</p>
          <a href="/jobs" className="button">Browse Jobs</a>
        </div>
        <div className="card">
          <h3>🎯 Consulting Services</h3>
          <p>Get expert guidance for your AI projects and career goals.</p>
          <a href="/consulting" className="button">Learn More</a>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>Platform Stats</h2>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          {stats.users} Users | {stats.trainings} Courses | {stats.jobs} Jobs
        </p>
      </div>
    </div>
  );
}
