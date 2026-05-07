import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/trainings')
      .then(r => {
        setTrainings(r.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        // Temporary fallback data
        setTrainings([
          {
            id: 1,
            title: "Python Fundamentals",
            description: "Master Python basics for business applications.",
            category: "Python",
            is_free: true,
            duration: "4 weeks",
            tools: ["Python 3.11", "Jupyter"],
            internship: false,
            certification: true
          },
          {
            id: 2,
            title: "AI + Python Web Applications",
            description: "Build AI-powered web apps.",
            category: "AI",
            is_free: true,
            duration: "6 weeks",
            tools: ["Python", "FastAPI"],
            internship: true,
            certification: true
          }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p>Loading training programs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>🚀 AI & Python Training Programs</h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Master AI, Machine Learning, and Full-Stack Development with Industry-Ready Skills</p>
      </div>
      
      <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginBottom: '1rem', color: '#2563eb' }}>📚 What You'll Learn</h2>
        <p>Our comprehensive curriculum covers:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div><strong>✓ Python Programming</strong> - Core language for AI/ML</div>
          <div><strong>✓ Machine Learning</strong> - Algorithms, Models, Real Projects</div>
          <div><strong>✓ Generative AI</strong> - LLMs, ChatGPT, Fine-tuning</div>
          <div><strong>✓ Web Development</strong> - React, FastAPI, Flask</div>
          <div><strong>✓ Cloud & DevOps</strong> - AWS, Docker, Kubernetes</div>
          <div><strong>✓ Industry Tools</strong> - TensorFlow, PyTorch, Hugging Face</div>
        </div>
      </div>

      <div className="grid">
        {trainings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>
            <p>No training programs available at the moment.</p>
          </div>
        ) : (
          trainings.map(t => (
            <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>{t.title}</h3>
                <span style={{ background: t.is_free ? '#4caf50' : '#ff9800', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                  {t.is_free ? 'FREE' : 'PRO'}
                </span>
              </div>
              
              <p style={{ marginBottom: '1rem', color: '#555' }}>{t.description}</p>
              
              <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                {t.duration && <p style={{ fontSize: '0.9rem', margin: '0.25rem 0', color: '#2563eb' }}><strong>⏱️ Duration:</strong> {t.duration}</p>}
                <p style={{ fontSize: '0.9rem', margin: '0.25rem 0', color: '#666' }}><strong>📂 Category:</strong> {t.category}</p>
              </div>

              {t.tools && t.tools.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>🛠️ Tools & Technologies:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {t.tools.map((tool, idx) => (
                      <span key={idx} style={{ background: '#e0e7ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {t.internship && (
                  <span style={{ background: '#d1fae5', color: '#047857', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                    🎯 Internship Included
                  </span>
                )}
                {t.certification && (
                  <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                    🏆 Industry Certification
                  </span>
                )}
              </div>

              <button className="button" onClick={() => window.location.href = '/register'} style={{ marginTop: 'auto' }}>Enroll Now</button>
            </div>
          ))
        )}
      </div>

      <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '12px', marginTop: '2rem', border: '1px solid rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>🎓 Career Outcomes</h2>
        <p>Our alumni work at:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div>🚀 Google</div>
          <div>📘 Meta</div>
          <div>🍎 Apple</div>
          <div>☁️ AWS</div>
          <div>💼 Startups</div>
          <div>🤖 AI Companies</div>
        </div>
      </div>
    </div>
  );
}
