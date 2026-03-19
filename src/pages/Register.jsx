import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/api";

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError('Hasła nie są takie same!');
        return;
      }
      await authAPI.register(username, password, role);
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>username: </label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>confirm password: </label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <label>select role: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">admin</option>
      </select>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
}
