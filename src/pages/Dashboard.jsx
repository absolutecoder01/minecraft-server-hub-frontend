import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { serversAPI } from '../api/api';


export function Dashboard(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSevers = async () => {
    try {
      setLoading(true);
      const data = await serversAPI.getAll();
      setServers(data)
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this server?')) {
      return;
    }

    try {
      await serversAPI.delete(id);
      fetchSevers();
    }
    catch (e) {
      setError(e.message);
    }
  }
  useEffect(() => {
    fetchSevers();
    }, []);
  if (loading) {
    return <p>Loading servers...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {user?.username}!</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/add-server')}>Add Server</button>
      {user?.role === 'admin' && (
        <button onClick={() => navigate('/admin')}>
          Admin Dashboard
        </button>
      )}
      <h2>Servers:</h2>
      {servers.length === 0 ? (
        <p>No servers was found! Add some ;)</p>
      ) : (
        <ul>
          {servers.map((server) => (
            <li key={server.id}>
              <img
                    src={server.image_url || '/placeholder.png'}
                    alt={server.name}
                    style={{ width: '200px', height: '100px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
              <h3>{server.name}</h3>
              <p>IP: {server.ip_address}</p>
              <p>Version: {server.version}</p>
              <p>Gamemode: {server.game_mode}</p>
              <button onClick={() => navigate(`/edit-server/${server.id}`)}>Edit</button>
              <button onClick={() => handleDelete(server.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
