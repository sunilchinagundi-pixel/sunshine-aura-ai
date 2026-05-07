import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [stats, setStats] = useState({ trainings: 0, jobs: 0, users: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [callback, setCallback] = useState({ name: '', email: '', mobile: '', course: '', location: '', message: '' });
  const [callbackMessage, setCallbackMessage] = useState('');
  const [callbackError, setCallbackError] = useState('');

  useEffect(() => {
    axios.get('/api/trainings').then(r => {
      setStats(s => ({ ...s, trainings: r.data.length }));
      setSearchResults(r.data);
    });
    axios.get('/api/jobs').then(r => setStats(s => ({ ...s, jobs: r.data.length })));
    axios.get('/api/users').then(r => setStats(s => ({ ...s, users: r.data.length })));
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('/api/trainings', { params: { q: searchQuery } });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallbackChange = (event) => {
    const { name, value } = event.target;
    setCallback(prev => ({ ...prev, [name]: value }));
  };

  const submitCallback = async (event) => {
    event.preventDefault();
    setCallbackMessage('');
    setCallbackError('');

    try {
      const response = await axios.post('/api/callback-request', callback);
      setCallbackMessage(response.data.message);
      setCallback({ name: '', email: '', mobile: '', course: '', location: '', message: '' });
    } catch (error) {
      setCallbackError(error.response?.data?.detail || 'Unable to submit callback request. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to Sunshine Aura AI</h1>
        <p>Learn AI, Python, and grow your career with us. Search courses and request a callback from our team.</p>
        <a href="/register" className="button">Get Started Free</a>
      </div>

      <div className="search-section">
        <form className="search-form" onSubmit={handleSearch}>
          <h2>Search Training Courses</h2>
          <div className="form-row">
            <input
              type="text"
              placeholder="Search courses by keyword, category, or skill"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="button" type="submit">Search</button>
          </div>
        </form>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>{searchResults.length} course(s) found</h3>
            <div className="grid">
              {searchResults.map((training) => (
                <div key={training.id} className="card">
                  <h3>{training.title}</h3>
                  <p>{training.description}</p>
                  <p><strong>Category:</strong> {training.category}</p>
                  <p><strong>Mode:</strong> {training.is_free ? 'Free' : 'Pro'}</p>
                  <a href="/trainings" className="button">View Courses</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="callback-section">
        <div className="callback-card">
          <h2>Request a Callback</h2>
          <p>Enter your details and our team will contact you with course guidance and enrollment assistance.</p>
          <form onSubmit={submitCallback}>
            <input name="name" type="text" placeholder="Full Name" value={callback.name} onChange={handleCallbackChange} required />
            <input name="email" type="email" placeholder="Email Address" value={callback.email} onChange={handleCallbackChange} required />
            <input name="mobile" type="tel" placeholder="Mobile Number" value={callback.mobile} onChange={handleCallbackChange} required />
            <input name="course" type="text" placeholder="Interested Course or Topic" value={callback.course} onChange={handleCallbackChange} required />
            <input name="location" type="text" placeholder="City / Location (optional)" value={callback.location} onChange={handleCallbackChange} />
            <textarea name="message" placeholder="Message or question (optional)" value={callback.message} onChange={handleCallbackChange} rows={4} />
            <button className="button" type="submit">Request Callback</button>
            {callbackMessage && <p className="success-message">{callbackMessage}</p>}
            {callbackError && <p className="error-message">{callbackError}</p>}
          </form>

          <div className="whatsapp-card">
            <h3>Chat with Us on WhatsApp</h3>
            <p>Quick support for course guidance, pricing, and enrollment.</p>
            <a
              className="button whatsapp-button"
              href="https://wa.me/918197387601?text=Hi%2C%20I%20need%20help%20with%20AI%20training%20and%20course%20details."
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
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
