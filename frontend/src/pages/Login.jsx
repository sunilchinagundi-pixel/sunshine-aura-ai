import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', form);
      setUser(res.data.user);
      setMsg('✅ Login successful! Welcome ' + res.data.user.name);
      setForm({ email: '', password: '' });
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Login failed'));
    }
  };

  if (user) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="card">
          <h2>Welcome, {user.name}!</h2>
          <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
            Status: <strong>{user.role === 'pro' ? '⭐ Pro User' : 'Free User'}</strong>
          </p>
          <p style={{ color: '#666', marginTop: '1rem' }}>Email: {user.email}</p>
          <button className="button" onClick={() => setUser(null)}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem' }}>Login</h2>
        {msg && <p style={{ marginBottom: '1rem', padding: '0.75rem', background: msg.includes('✅') ? '#d4edda' : '#f8d7da', borderRadius: '4px' }}>{msg}</p>}
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="button" style={{ width: '100%' }}>Login</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Not registered yet? <a href="/register" style={{ color: '#667eea', textDecoration: 'none' }}>Register here</a></p>
      </form>
    </div>
  );
}
