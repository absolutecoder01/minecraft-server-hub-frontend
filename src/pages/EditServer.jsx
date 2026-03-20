import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { serversAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';

export function EditServer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [version, setVersion] = useState('');
  const [gamemode, setGamemode] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServer = async () => {
      try {
        const data = await serversAPI.getById(id);
        setName(data.name);
        setIpAddress(data.ip_address);
        setVersion(data.version);
        setGamemode(data.game_mode);
        setImageUrl(data.image_url);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchServer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverData = {
        name,
        ip_address: ipAddress,
        version,
        game_mode: gamemode,
        image_url: imageUrl
      };
      await serversAPI.update(id, serverData);
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit}>
          <h1>Edit Server</h1>

          <label>Server name: </label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Server IP: </label>
          <input
            type='text'
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            required
          />

          <label>Server version: </label>
          <input
            type='text'
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          />

          <label>Server gamemode: </label>
          <input
            type='text'
            value={gamemode}
            onChange={(e) => setGamemode(e.target.value)}
          />

          <label>Server imageUrl: </label>
          <input
            type='text'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://i.imgur.com/abc123.png"
          />

          <button type="submit">Update Server</button>
          {error && <p>{error}</p>}
        </form>
  );
}
