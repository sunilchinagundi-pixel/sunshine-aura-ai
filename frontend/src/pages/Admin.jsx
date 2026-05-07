import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [msg, setMsg] = useState('');

  const handleViewUsers = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const response = await axios.get('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUsers(response.data);
      setShowForm(false);
      setMsg(`✅ Loaded ${response.data.length} users`);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Failed to fetch users'));
    }
    setLoading(false);
  };

  const handleDownloadExcel = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/export-users', {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sunshine_aura_users_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
      
      setMsg('✅ Excel file downloaded successfully');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Failed to download Excel'));
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Admin Panel</h1>

        {showForm && (
          <form onSubmit={handleViewUsers} style={{ background: 'rgba(255,255,255,0.9)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Enter Admin Token</h2>
            {msg && <p style={{ marginBottom: '1rem', padding: '0.75rem', background: msg.includes('✅') ? '#d4edda' : '#f8d7da', borderRadius: '4px' }}>{msg}</p>}
            <input 
              type="password" 
              placeholder="Admin Token" 
              value={token} 
              onChange={e => setToken(e.target.value)} 
              required 
            />
            <button type="submit" className="button" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Loading...' : 'View Users'}
            </button>
          </form>
        )}

        {users.length > 0 && (
          <>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <button 
                onClick={handleDownloadExcel} 
                className="button"
                style={{ marginRight: '1rem' }}
                disabled={loading}
              >
                📥 Download Excel Report
              </button>
              <button 
                onClick={() => setShowForm(true)}
                className="button button-secondary"
              >
                Change Token
              </button>
            </div>

            <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.9)', borderRadius: '12px', padding: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #667eea' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>ID</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Mobile</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Role</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #eee', backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
                      <td style={{ padding: '0.75rem' }}>{user.id}</td>
                      <td style={{ padding: '0.75rem' }}>{user.name}</td>
                      <td style={{ padding: '0.75rem' }}>{user.email}</td>
                      <td style={{ padding: '0.75rem' }}>{user.mobile}</td>
                      <td style={{ padding: '0.75rem' }}><span style={{ background: user.role === 'pro' ? '#ff9800' : '#4caf50', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>{user.role}</span></td>
                      <td style={{ padding: '0.75rem' }}>{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>Total: {users.length} registered users</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
