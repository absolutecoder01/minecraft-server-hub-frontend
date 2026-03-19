import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { serversAPI } from '../api/api';


export function Dashboard(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  useEffect(() => {
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
    fetchSevers();
    }, []);
  if (loading) {
    return <p>Ładowanie serwerów...</p>;
  }

  if (error) {
    return <p>Błąd: {error}</p>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {user?.username}!</p>
      <button onClick={handleLogout}>Logout</button>

      <h2>Servers:</h2>
      {servers.length === 0 ? (
        <p>No servers was found! Add some ;)</p>
      ) : (
        <ul>
          {servers.map((server) => (
            <li key={server.id}>
              <h3>{server.name}</h3>
              <p>IP: {server.ip_address}</p>
              <p>Version: {server.version}</p>
              <p>Gamemode: {server.game_mode}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
