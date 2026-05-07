import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [callbacks, setCallbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [msg, setMsg] = useState('');
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'callbacks'

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
      setMsg(`✅ Loaded ${response.data.length} registered users`);
      setActiveTab('users');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Failed to fetch users'));
    }
    setLoading(false);
  };

  const handleViewCallbacks = async () => {
    setLoading(true);
    setMsg('');
    try {
      const response = await axios.get('/api/admin/callback-requests', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCallbacks(response.data);
      setMsg(`✅ Loaded ${response.data.length} callback requests`);
      setActiveTab('callbacks');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Failed to fetch callback requests'));
    }
    setLoading(false);
  };

  const handleDownloadUsersExcel = async () => {
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
      
      setMsg('✅ Users Excel file downloaded successfully');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.detail || 'Failed to download Excel'));
    }
    setLoading(false);
  };

  const handleDownloadCallbacksExcel = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/export-callback-requests', {
        headers: { 'Authorization': `Bearer ${token}` },
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sunshine_aura_callback_requests_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentChild.removeChild(link);
      
      setMsg('✅ Callback requests Excel file downloaded successfully');
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
              style={{ marginBottom: '1rem', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '8px', width: '100%' }}
            />
            <button type="submit" className="button" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Loading...' : 'View Data'}
            </button>
          </form>
        )}

        {(users.length > 0 || callbacks.length > 0) && (
          <>
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveTab('users')}
                className={activeTab === 'users' ? 'button' : 'button button-secondary'}
                disabled={loading}
              >
                👥 Registered Users ({users.length})
              </button>
              <button
                onClick={handleViewCallbacks}
                className={activeTab === 'callbacks' ? 'button' : 'button button-secondary'}
                disabled={loading}
              >
                📞 Callback Requests ({callbacks.length})
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="button button-secondary"
              >
                Change Token
              </button>
            </div>

            {activeTab === 'users' && users.length > 0 && (
              <>
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <button
                    onClick={handleDownloadUsersExcel}
                    className="button"
                    disabled={loading}
                  >
                    📥 Download Users Excel
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

            {activeTab === 'callbacks' && callbacks.length > 0 && (
              <>
                <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <button
                    onClick={handleDownloadCallbacksExcel}
                    className="button"
                    disabled={loading}
                  >
                    📥 Download Callback Requests Excel
                  </button>
                </div>
                <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.9)', borderRadius: '12px', padding: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #10b981' }}>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>ID</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Mobile</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Course</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Location</th>
                        <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 'bold' }}>Requested</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callbacks.map((callback, idx) => (
                        <tr key={callback.id} style={{ borderBottom: '1px solid #eee', backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
                          <td style={{ padding: '0.75rem' }}>{callback.id}</td>
                          <td style={{ padding: '0.75rem' }}>{callback.name}</td>
                          <td style={{ padding: '0.75rem' }}>{callback.email}</td>
                          <td style={{ padding: '0.75rem' }}>{callback.mobile}</td>
                          <td style={{ padding: '0.75rem' }}>{callback.course}</td>
                          <td style={{ padding: '0.75rem' }}>{callback.location || '-'}</td>
                          <td style={{ padding: '0.75rem' }}>{new Date(callback.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ marginTop: '1rem', textAlign: 'center', color: '#666' }}>Total: {callbacks.length} callback requests</p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
