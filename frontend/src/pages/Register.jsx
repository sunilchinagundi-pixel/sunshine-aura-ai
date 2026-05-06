import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'free' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', form);
      setMsg('✅ Registration successful! You can now login.');
      setForm({ name: '', email: '', password: '', role: 'free' });
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Registration failed'));
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '1.5rem' }}>Create Account</h2>
        {msg && <p style={{ marginBottom: '1rem', padding: '0.75rem', background: msg.includes('✅') ? '#d4edda' : '#f8d7da', borderRadius: '4px' }}>{msg}</p>}
        <input placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd' }}>
          <option value="free">Free User</option>
          <option value="pro">Pro User</option>
        </select>
        <button type="submit" className="button" style={{ width: '100%' }}>Register</button>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Already registered? <a href="/login" style={{ color: '#667eea', textDecoration: 'none' }}>Login here</a></p>
      </form>
    </div>
  );
}
