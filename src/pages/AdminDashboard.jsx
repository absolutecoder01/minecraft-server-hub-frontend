import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../api/api';

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      if (user?.role !== 'admin') {
        navigate('/dashboard');
        return;
      }
    }, [user, navigate]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminAPI.getStats();
        setStats(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
     }
    fetchStats();
  }, []);

  if (loading) { return <p>Loading stats...</p> }
  if (error) { return <p>Error loading stats... </p> }

  return (
      <div>
        <h1>🔐 Admin Dashboard</h1>
        <p>Welcome, {user?.username}!</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.total_user_count || 0}</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Total Servers</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.total_server_count || 0}</p>
          </div>
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Total Admins</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats?.total_admin_count || 0}</p>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Users by Role</h3>
          <pre>{JSON.stringify(stats?.users_by_role, null, 2)}</pre>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3>Servers by Game Mode</h3>
          <pre>{JSON.stringify(stats?.server_by_game_mode, null, 2)}</pre>
      </div>
      <button onClick={() => navigate('/dashboard')} style={{ marginTop: '20px' }}>
        Back to Dashboard
      </button>
    </div>
  );
}
