import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest, serversAPI } from "../api/api";

export function AddServer() {
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [version, setVersion] = useState('');
  const [gamemode, setGamemode] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const serverData = { name, ip_address: ipAddress, version, game_mode: gamemode, image_url: imageUrl };
      await serversAPI.create(serverData);
      navigate('/dashboard')
    }
    catch (e) {
      setError(e.message);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
          <h1>Add New Server</h1>

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

          <button type="submit">Add Server</button>
          {error && <p>{error}</p>}
        </form>
  );

}
